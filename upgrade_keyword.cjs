const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const keywordContextFunc = `
async function getKeywordContext(query: string) {
    if (!query) return "";
    try {
        const searchUrl = \`https://lite.duckduckgo.com/lite/?q=\${encodeURIComponent(query)}\`;
        const response = await fetch(searchUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const html = await response.text();
        const $ = cheerio.load(html);
        const results: string[] = [];
        $('.result-snippet').each((i, el) => {
            const title = $(el).prev().find('a').text().trim();
            const snippet = $(el).text().trim();
            results.push(title + ": " + snippet);
        });
        return results.slice(0, 5).join("\\n");
    } catch(e) {
        return "";
    }
}
`;

content = content.replace('// Keyword Analysis Engine', keywordContextFunc + '\n  // Keyword Analysis Engine');
content = content.replace('const data = await generateJSON(prompt, domain);', 'const data = await generateJSON(prompt, domain);');

// The route is POST /api/keywords/analyze
// I will replace `const data = await generateJSON(prompt, domain);` inside keywords analyze with:
// const realKwData = await getKeywordContext(keyword);
// const data = await generateJSON(prompt + " \\nREAL SERP CONTEXT: " + realKwData);

content = content.replace(/app\.post\("\/api\/keywords\/analyze", async \(req, res\) => \{[\s\S]*?res\.json\(data\);/g, (match) => {
  return match.replace('const data = await generateJSON(prompt, domain);', 'const realKwData = await getKeywordContext(keyword);\n      const data = await generateJSON(prompt + " \\nREAL SERP CONTEXT (use this to inform difficulty/intent): " + realKwData);');
});

content = content.replace(/const data = await generateJSON\(prompt, domain\);/g, (match, offset, str) => {
  // Let's only do it for keywords. Actually `generateJSON(prompt)` was replaced with `generateJSON(prompt, domain)`. Inside `keywords/analyze` we don't have `domain` variable.
  // Let's see the keywords method!
  return match;
});

fs.writeFileSync('server.ts', content);
