export function prepare(state, input) {
  const session = input.session ?? 'M1';
  if (!session.trim()) throw new Error('场次不能为空');
  return { session };
}

export function resolve(state, request, data) {
  if (data.session !== request.session || !Number.isInteger(data.sequence) || data.sequence < 0) throw new Error('行情场次进度无效');
  if (!Array.isArray(data.quotes)) throw new Error('报价集合缺失');
  return data;
}
