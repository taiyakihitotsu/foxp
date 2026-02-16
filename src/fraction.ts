import type Cion from '@taiyakihitotsu/cion'
import * as mathjs from 'mathjs'

export type isRational<
  S> =
  S extends string
    ? Cion.Lisp<`(re-find '^-?[0-9]+(/\\+?[0-9]+)?$' '${S}')`> extends `''`
      ? false
    : true
  : false

export const math = mathjs.create(mathjs.all!)

const internalFraction = (s: unknown) => {
  if (typeof s === 'string') {
    try { const r = math.evaluate(s);
          return (typeof r === 'function') ? s : (r === undefined ? s : r) }
    catch (error) { return s }}
  else { return s }
}

export const unsafeSomeFraction: (s: unknown) => number | string = (s) => (internalFraction(s))

export const someFraction: <T extends unknown>(s: T extends (isRational<T> extends true ? T : never) ? T : never) => number | string = (s) => (internalFraction(s))

export * as fraction from './fraction'
