import { TCFunc, TCF } from './types'

const isError = (v: any): v is Error => v instanceof Error

/**
 * try .. catch:
 * functional try catch wrapper
 *
 * [err, res] = tc(() => ..)
 */

export const tc = <F extends TCFunc>(fn: F): [Error, undefined] | [false, ReturnType<F>] => {
  try {
    const result = fn()
    return [false, result]
  } catch (err) {
    return [isError(err) ? err : new Error('tc: Thrown error not from ErrorConstructor'), undefined]
  }
}

/**
 * tcf:
 * safe functional function fallback wrapper
 *
 * n = tcf(0, (n) => ..)(7)
 */

export const tcf: TCF = <F extends TCFunc, FB>(fallback: FB, fn?: F) => {
  if (!fn) return (fn: F) => tcf(fallback, fn)

  return (...args: Parameters<F>): ReturnType<F> | FB => {
    try {
      return fn(...args)
    } catch {
      return fallback
    }
  }
}

export const tcNull = tcf(null)
export const tcNullish = tcf(undefined)
export const tcNumber = tcf(0)
export const tcRetry = <F extends TCFunc>(fn: F) => tcf(fn, fn)

// alias
export const safe = tcf
