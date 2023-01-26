const packetCodeMap: Record<number, string> = {
  61: 'LTP',
  62: 'QUOTE',
  63: 'FULL',
  64: 'INDEX LTP',
  65: 'INDEX QUOTE',
  66: 'INDEX FULL',
};

export const processIndexLtpPacket = (data: Buffer) => {
  return {
    packetCode: packetCodeMap[data[0]],
    ltp: data.readFloatLE(1),
    lastUpdatedTime: data.readInt32LE(5),
    securityId: data.readInt32LE(9),
    tradable: data.readInt8(13) ? true : false,
    mode: packetCodeMap[data[14]],
    changeAbsolute: data.readFloatLE(15),
    changePercent: data.readFloatLE(19),
  };
};

export const processLtpPacket = (data: Buffer) => {
  return {
    packetCode: packetCodeMap[data[0]],
    ltp: data.readFloatLE(1),
    lastTradedTime: data.readInt32LE(5),
    securityId: data.readInt32LE(9),
    tradable: data.readInt8(13) ? true : false,
    mode: packetCodeMap[data[14]],
    changeAbsolute: data.readFloatLE(15),
    changePercent: data.readFloatLE(19),
  };
};

export const processQuotePacket = (data: Buffer) => {
  return {
    packetCode: packetCodeMap[data[0]],
    ltp: data.readFloatLE(1),
    lastTradedTime: data.readInt32LE(5),
    securityId: data.readInt32LE(9),
    tradable: data.readInt8(13) ? true : false,
    mode: packetCodeMap[data[14]],
    lastTradedQuantity: data.readInt32LE(15),
    averageTradedPrice: data.readFloatLE(19),
    volumeTraded: data.readInt32LE(23),
    totalBuyQuantity: data.readInt32LE(27),
    totalSellQuantity: data.readInt32LE(31),
    open: data.readFloatLE(35),
    close: data.readFloatLE(39),
    high: data.readFloatLE(43),
    low: data.readFloatLE(47),
    changePercent: data.readFloatLE(51),
    changeAbsolute: data.readFloatLE(55),
    '52WeekHigh': data.readFloatLE(59),
    '52WeekLow': data.readFloatLE(63),
  };
};

export const processIndexQuotePacket = (data: Buffer) => {
  return {
    packetCode: packetCodeMap[data[0]],
    ltp: data.readFloatLE(1),
    securityId: data.readInt32LE(5),
    tradable: data.readInt8(9) ? true : false,
    mode: packetCodeMap[data[10]],
    open: data.readFloatLE(11),
    close: data.readFloatLE(15),
    high: data.readFloatLE(19),
    low: data.readFloatLE(23),
    changeAbsolute: data.readFloatLE(27),
    changePercent: data.readFloatLE(31),
    '52WeekHigh': data.readFloatLE(35),
    '52WeekLow': data.readFloatLE(39),
  };
};

export const processFullPacket = (data: Buffer) => {
  const marketDepth: Record<
    'buy' | 'sell',
    { quantity: number; orders: number; price: number }
  >[] = [];

  for (let i = 0; i < 5; i++) {
    /**
     * Packet start position
     */
    let p = i * 20 + 1;
    marketDepth.push({
      buy: {
        quantity: data.readInt32LE(p),
        orders: data.readInt16LE(p + 8),
        price: data.readFloatLE(p + 12),
      },
      sell: {
        quantity: data.readInt32LE(p + 4),
        orders: data.readInt16LE(p + 10),
        price: data.readFloatLE(p + 16),
      },
    });
  }

  return {
    packetCode: packetCodeMap[data[0]],
    // mbpRowPacket: 1 - 100
    marketDepth: marketDepth,
    ltp: data.readFloatLE(101),
    lastTradedTime: data.readInt32LE(105),
    securityId: data.readInt32LE(109),
    tradable: data.readInt8(113) ? true : false,
    mode: packetCodeMap[data[114]],
    lastTradedQuantity: data.readInt32LE(115),
    averageTradedPrice: data.readFloatLE(119),
    volumeTraded: data.readInt32LE(123),
    totalBuyQuantity: data.readInt32LE(127),
    totalSellQuantity: data.readInt32LE(131),
    open: data.readFloatLE(135),
    close: data.readFloatLE(139),
    high: data.readFloatLE(143),
    low: data.readFloatLE(147),
    changePercent: data.readFloatLE(151),
    changeAbsolute: data.readFloatLE(155),
    '52WeekHigh': data.readFloatLE(159),
    '52WeekLow': data.readFloatLE(163),
    oi: data.readInt32LE(167),
    oiChange: data.readInt32LE(171),
  };
};

export const processIndexFullPacket = (data: Buffer) => {
  return {
    packetCode: packetCodeMap[data[0]],
    ltp: data.readFloatLE(1),
    securityId: data.readInt32LE(5),
    tradable: data.readInt8(9) ? true : false,
    mode: packetCodeMap[data[10]],
    open: data.readFloatLE(11),
    close: data.readFloatLE(15),
    high: data.readFloatLE(19),
    low: data.readFloatLE(23),
    changePercent: data.readFloatLE(27),
    changeAbsolute: data.readFloatLE(31),
    lastUpdatedTime: data.readInt32LE(35),
  };
};
