export function accept(state, request, data) {
  if (data.session !== request.session || !Number.isInteger(data.sequence)) throw new Error('行情场次或序号无效');
  if (data.sequence < (state.sessions[data.session] ?? 0)) return data.session;
  for (const quote of data.quotes) { if (!quote.quoteId || !Number.isFinite(quote.amount)) throw new Error('报价记录无效'); state.quotes[`${data.session}:${quote.quoteId}`] = { ...quote, session: data.session }; }
  state.sessions[data.session] = data.sequence;
  return data.session;
}
