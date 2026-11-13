const http = require('http');

http.get('http://localhost:3000/api/domain/toppages?domain=vercel.com', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log("Response:", data));
});
