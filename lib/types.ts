export type TCFunc = (...args: any[]) => any

type AsyncReturnType<F> = F extends (...args: any[]) => Promise<infer R> ? R : never

export type TCF = {
  <FB>(fallback: FB): <F extends TCFunc>(
    fn: F
  ) => (
    ...args: Parameters<F>
  ) => AsyncReturnType<F> extends never ? ReturnType<F> | FB : ReturnType<F> | Promise<FB>

  <FB, F extends TCFunc>(fallback: FB, fn: F): (
    ...args: Parameters<F>
  ) => AsyncReturnType<F> extends never ? ReturnType<F> | FB : ReturnType<F> | Promise<FB>
}
