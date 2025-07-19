import type Cion from '@taiyakihitotsu/cion'
import * as mathjs from 'mathjs'

// this is tiny set of implementing fraction.
//
// You can pass a fraction as bucket bridge on the type level.

export type isRational<
  S> =
  S extends string
    ? Cion.Lisp<`(re-find '^-?[0-9]+(/\\+?[0-9]+)?$' '${S}')`> extends `''`
      ? false
    : true
  : false

export const math = mathjs.create(mathjs.all!)

// export const someFraction: (s: unknown) => number = (s) => typeof s === 'string' && math.isFraction(s) ? math.evaluate(s) : s

export const someFraction: (s: unknown) => number = (s) => {
  if (typeof s === 'string') {
    try { const r = math.evaluate(s);
          return (typeof r === 'function') ? s : r }
    catch (error) { return s }}
  else { return s }
}

export * as fraction from './fraction'
