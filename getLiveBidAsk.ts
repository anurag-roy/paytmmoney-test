import { WebSocket } from 'ws';
import token from './token.json';

// import data from './data/FEDERALBNK.js';
import data from './data/IBULHSGFIN.js';
// import data from './data/MANAPPURAM.js';
// import data from './data/NIFTY.js';
// import data from './data/RELIANCE.js';
// import data from './data/TATASTEEL.js';

const idToNameMap = new Map<number, string>();
data.forEach((d) => idToNameMap.set(Number(d.securityId), d.name));

const preferences = data.map((d) => ({
  actionType: 'ADD',
  modeType: 'FULL',
  scripType: 'OPTION',
  exchangeType: 'NSE',
  scripId: d.securityId,
}));

const ws = new WebSocket(
  `wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=${token.public_access_token}`
);

ws.on('open', () => {
  console.log('Connected successfully to PaytmMoney Live Market!');
  ws.send(JSON.stringify(preferences));
});

ws.on('message', (data: Buffer) => {
  const name = '[' + idToNameMap.get(data.readInt32LE(109)) + ']';
  console.log(
    name,
    'Bid',
    Number(data.readFloatLE(13).toFixed(2)),
    'Ask',
    Number(data.readFloatLE(17).toFixed(2))
  );
});
