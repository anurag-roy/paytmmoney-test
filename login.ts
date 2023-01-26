import { writeFileSync } from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import env from './env.json';
import { generateAccessToken } from './generateAccessToken.js';

const LOGIN_URL = `https://login.paytmmoney.com/merchant-login?apiKey=${env.API_KEY}&state=${env.STATE_KEY}`;

const rl = readline.createInterface({ input, output });

const question = [
  'Please open this URL in your browser to login:',
  LOGIN_URL,
  '',
  'After successful login, please copy and paste the URL here:',
  '',
].join('\n');
const pastedUrl = await rl.question(question);

let requestToken: string | null;

try {
  const url = new URL(pastedUrl);
  requestToken = url.searchParams.get('requestToken');
  if (!requestToken) {
    console.error(
      'Request token missing in URL! Make sure you have pasted the correct URL. Exiting...'
    );
    process.exit(1);
  }
} catch (error) {
  console.error('Invalid URL! Exiting...');
  process.exit(1);
}

try {
  const accessTokenResponse = await generateAccessToken(
    env.API_KEY,
    env.API_SECRET,
    requestToken
  );
  writeFileSync(
    'token.json',
    JSON.stringify(accessTokenResponse, null, 4),
    'utf-8'
  );

  console.log('Successfully logged in!');
} catch (error) {
  console.error('Failed to generate access token :', error);
  console.log('Login failed');
} finally {
  rl.close();
}
