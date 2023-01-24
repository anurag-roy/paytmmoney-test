import { writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import env from './env.json';

const loginUrl = `https://login.paytmmoney.com/merchant-login?apiKey=${env.API_KEY}`;

const generateAccessToken = async (
  apiKey: string,
  apiSecret: string,
  requestToken: string
) => {
  const url = 'https://developer.paytmmoney.com/accounts/v2/gettoken';
  const body = {
    api_key: apiKey,
    api_secret_key: apiSecret,
    request_token: requestToken,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    const jsonResponse = await res.json();
    return jsonResponse.access_token;
  } else {
    throw new Error('Res not ok', {
      cause: await res.text(),
    });
  }
};

const server = createServer(async (req, res) => {
  let baseUrl = `http://localhost:${env.PORT}`;
  if (req.url) {
    baseUrl += req.url;
  }

  const url = new URL(baseUrl);
  const requestToken = url.searchParams.get('request_token');
  console.log('requestToken : ', requestToken);

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
  }
});

server.listen(env.PORT);

console.log('Please open this URL in your browser to login:' + '\n' + loginUrl);
