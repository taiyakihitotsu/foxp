import * as foxp from '../../src/index'
import { describe, it, expect } from 'vitest'

const div = foxp.bi.div()
const t0 = div(foxp.putPrim(3)
              , foxp.putPrim(2)).value // => 3/2
try {
  div(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}

// todo false
type aaa = foxp.pre.MergePreStr<foxp.pre.bi.div, `(fn [x y] (neg-int? y))`>
const div2 = foxp.bi.div<aaa>()
  div2(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(2)).value

try {
  div2(
// @ts-expect-error:
     foxp.putPrim(3)
     , foxp.putPrim(0)).value
} catch {}

const t2 =
  div2(
    foxp.putPrim(3)
  , foxp.putPrim(-2)).value // => -3/2

const inc = foxp.putFn1<'neg-int?', 'inc'>()((n: number):number => 1 + n)
const one = foxp.putPrim(1) // {sexpr: 'inc', value: {pre: 'neg-int?', fn: Function}}
const negone = foxp.putPrim(-1) // {sexpr: '-1', value: -1}
// @ts-expect-error:

foxp.tap1(inc, one)

const pzero = foxp.tap1(inc, negone) // {sexpr: 0, value: 0}
pzero.value // => 0

describe('normal div', () => {
  it('3/2', () => { expect(t0).toBe(3/2)})
  it('pzero.value', () => { expect(pzero.value).toBe(0)})
  it('-3/2', () => { expect(t2).toBe(-3/2)})
})
