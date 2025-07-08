import type Cion from '@taiyakihitotsu/cion'
import * as mathjs from 'mathjs'

// this is tiny set of implementing fraction.
//
// You can pass a fraction as bucket bridge on the type level.

export type isRational<
  S> = 
  S extends string
    ? Cion.Lisp<`(re-find '^-?[0-9]+(/[0-9]+)?$' '${S}')`> extends `''`
      ? false
    : true
  : false

const math = mathjs.create(mathjs.all!)
export const someFraction: (s: unknown) => number = (s) => typeof s === 'string' && math.isFraction(s) ? math.evaluate(s) : s

const isRational_test0: isRational<'3/2'> = true
const isRational_test1: isRational<'2'> = true
const isRational_test2: isRational<'-2'> = true
const isRational_test3: isRational<'-2/10'> = true
const isRational_test4: isRational<'0'> = true
const isRational_test5: isRational<'-2/+1'> = false
const isRational_test6: isRational<'string'> = false
const isRational_test7: isRational<'8/'> = false
const isRational_test8: isRational<'/8'> = false
const isRational_test9: isRational<'8//'> = false
const isRational_test10: isRational<'-/8'> = false

export * as fraction from './fraction'
