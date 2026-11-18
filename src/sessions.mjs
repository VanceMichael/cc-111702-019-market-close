export function prepare(state, input) {
  const session = input.session ?? 'M1';
  if (!session.trim()) throw new Error('场次不能为空');
  return { session };
}
