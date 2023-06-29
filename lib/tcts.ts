import { TCFunc, TCF } from './types'

const isError = (v: any): v is Error => v instanceof Error

/**
 * try .. catch:
 * functional try catch wrapper
 *
 * [err, res] = tc(() => ..)
 */

export const tc = <F extends TCFunc>(f: F): [Error, undefined] | [false, ReturnType<F>] => {
  try {
    const result = f()
    return [false, result]
  } catch (err) {
    return [isError(err) ? err : new Error('tc: Thrown error not from ErrorConstructor'), undefined]
  }
}

/**
 * async try .. catch:
 * async functional try catch wrapper
 *
 * [err, res] = await tc(async () => ..)
 */

export const atc = async <F extends TCFunc>(
  f: F
): Promise<[Error, undefined] | [false, ReturnType<F>]> => {
  try {
    const result = await f()
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

// @ts-expect-error
export const tcf: TCF = (fallback, f) => {
  if (!f) return f2 => tcf(fallback, f2)
  const isAsync = f.constructor.name === 'AsyncFunction'

  if (isAsync)
    return async (...args) => {
      try {
        return await f(...args)
      } catch {
        return fallback
      }
    }

  return (...args) => {
    try {
      return f(...args)
    } catch {
      return fallback
    }
  }
}

export const tcNull = tcf(null)
export const tcNullish = tcf(undefined)
export const tcVoid = tcf<void>(undefined)
export const tcNumber = tcf(0)
export const tcRetry = <F extends TCFunc>(fn: F) => tcf(fn, fn)

// alias
export const safe = tcf
