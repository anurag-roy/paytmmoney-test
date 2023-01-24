import { writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import env from './env.json';
import { generateAccessToken } from './generateAccessToken.js';

const loginUrl = `https://login.paytmmoney.com/merchant-login?apiKey=${env.API_KEY}`;

const server = createServer(async (req, res) => {
  const url = new URL(`http://localhost:${env.PORT}${req.url}`);
  const requestToken = url.searchParams.get('request_token');

  if (requestToken) {
    try {
      const accessToken = await generateAccessToken(
        env.API_KEY,
        env.API_SECRET,
        requestToken
      );
      writeFileSync('accessToken.txt', accessToken, 'utf-8');

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Successfully logged in!</h1>');
    } catch (error) {
      console.error('Failed to generate access token :', error);

      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Login failed</h1>');
    } finally {
      server.close();
    }
  }
});

server.listen(env.PORT);

console.log('Please open this URL in your browser to login:' + '\n' + loginUrl);
