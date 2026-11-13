const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const getKeywordContextFunc = `
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

code = code.replace('// Keyword Analysis Engine', getKeywordContextFunc + '\\n// Keyword Analysis Engine');

// For /api/keywords/analyze:
code = code.replace(
  'const data = await generateJSON(prompt, domain);\n      res.json(data);',
  'const realData = await getKeywordContext(keyword);\n      const data = await generateJSON(prompt + (realData ? " \\nREAL DATA CONTEXT: " + realData : ""));\n      res.json(data);'
);

// For /api/content/generate:
code = code.replace(
  'const data = await generateJSON(prompt, domain);\n      res.json(data);',
  'const realData = await getKeywordContext(topic);\n      const data = await generateJSON(prompt + (realData ? " \\nREAL DATA CONTEXT: " + realData : ""));\n      res.json(data);'
);

fs.writeFileSync('server.ts', code);
