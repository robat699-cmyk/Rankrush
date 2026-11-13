const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

const realContextFunc = `
const domainCache = new Map<string, string>();
async function getRealContext(domain: string) {
    if (!domain) return "";
    if (domainCache.has(domain)) return domainCache.get(domain);
    try {
        const searchUrl = \`https://lite.duckduckgo.com/lite/?q=\${encodeURIComponent("site:" + domain)}\`;
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
        const textContext = results.slice(0, 5).join("\\n");
        domainCache.set(domain, textContext);
        return textContext;
    } catch(e) {
        return "";
    }
}
`;

content = content.replace('async function generateJSON(prompt: string) {', realContextFunc + '\nasync function generateJSON(prompt: string, domain?: string) {\n  let finalPrompt = prompt;\n  if (domain) {\n    const real = await getRealContext(domain);\n    if (real) finalPrompt += " \\nREAL DATA CONTEXT to inform your output: " + real;\n  }');
content = content.replace('Output ONLY raw Generated JSON. ${prompt}', 'Output ONLY raw Generated JSON. ${finalPrompt}');

content = content.replace('async function generateJSONArray(prompt: string) {', 'async function generateJSONArray(prompt: string, domain?: string) {\n  let finalPrompt = prompt;\n  if (domain) {\n    const real = await getRealContext(domain);\n    if (real) finalPrompt += " \\nREAL DATA CONTEXT to inform your output: " + real;\n  }');
content = content.replace('Output ONLY raw JSON object. ${wrappedPrompt}', 'Output ONLY raw JSON object. ${wrappedPrompt.replace(prompt, finalPrompt)}');

content = content.replace(/generateJSON\(prompt\)/g, 'generateJSON(prompt, domain)');
content = content.replace(/generateJSONArray\(prompt\)/g, 'generateJSONArray(prompt, domain)');

fs.writeFileSync('server.ts', content);
