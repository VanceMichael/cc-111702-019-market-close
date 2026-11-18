export function present(state) {
  const quotes = Object.values(state.quotes).sort((left, right) => left.sourceTime - right.sourceTime);
  return { sessions: structuredClone(state.sessions), quotes, count: quotes.length };
}
