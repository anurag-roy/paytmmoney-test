import { WebSocket } from 'ws';
import {
  processFullPacket,
  processIndexFullPacket,
  processIndexLtpPacket,
  processIndexQuotePacket,
  processLtpPacket,
  processQuotePacket,
} from './processTickData.js';
import token from './token.json';

type Preference = {
  actionType: 'ADD' | 'REMOVE';
  modeType: 'LTP' | 'QUOTE' | 'FULL';
  scripType: 'INDEX' | 'EQUITY' | 'ETF' | 'FUTURE' | 'OPTION';
  exchangeType: 'BSE' | 'NSE';
  scripId: string;
};

const preferences: Preference[] = [
  {
    actionType: 'ADD',
    modeType: 'LTP',
    scripType: 'INDEX',
    exchangeType: 'NSE',
    scripId: '13',
  },
];

const ws = new WebSocket(
  `wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=${token.public_access_token}`
);

ws.on('open', () => {
  console.log('Connected successfully to PaytmMoney Live Market!');
  ws.send(JSON.stringify(preferences));
});

ws.on('message', (data: Buffer) => {
  const type = data.readInt8(0);
  switch (type) {
    case 64:
      console.log(processIndexLtpPacket(data));
      break;
    case 65:
      console.log(processIndexQuotePacket(data));
      break;
    case 66:
      console.log(processIndexFullPacket(data));
      break;
    case 61:
      console.log(processLtpPacket(data));
      break;
    case 62:
      console.log(processQuotePacket(data));
      break;
    case 63:
      console.log(processFullPacket(data));
      break;
    default:
      console.log('Packet not recognized');
      break;
  }
});
