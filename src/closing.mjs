export function present(state) {
  const quotes = Object.values(state.quotes).sort((left, right) => left.sourceTime - right.sourceTime);
  return { sessions: structuredClone(state.sessions), quotes, count: quotes.length };
}

export function assess(state, request, data) {
  const ids = new Set();
  for (const quote of data.quotes) {
    if (!quote.quoteId || ids.has(quote.quoteId) || !Number.isFinite(quote.sourceTime) || !Number.isFinite(quote.gatewayTime) || quote.gatewayTime < quote.sourceTime) throw new Error('报价身份或时点无效');
    if (!Number.isSafeInteger(quote.amount) || quote.amount < 0) throw new Error('报价金额无效'); ids.add(quote.quoteId);
  }
  return { session: request.session, quoteCount: ids.size, live: true };
}
