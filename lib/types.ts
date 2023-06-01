export type TCFunc = (...args: any[]) => any

export type TCF = {
  <FB>(fallback: FB): <F extends TCFunc>(fn: F) => ReturnType<F> | FB
  <FB, F extends TCFunc>(fallback: FB, fn: F): ReturnType<F> | FB
}
