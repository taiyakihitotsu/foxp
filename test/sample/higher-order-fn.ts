import * as foxp from '../../src/foxp'
import * as c   from '../../src/const'
import * as pre  from '../../src/pre'
import { describe, it, expect } from 'vitest'

// test : lisp-wrap-fn : higher-order-function
//
// [note]
//   lambda should be wraped with `{fn: ...}`
//   because `tap1` wraps value with `{value: ...}` in auto
//   but fn should be called with `x.value.fn`.
//
const ffffg
  : { [c.SexprKey]: '(fn [n] (fn [m] (+ 1 n m)))'
    , [c.ValueKey]: { [c.PreKey]: ['(fn [n] (= 2 n))', '(fn [m] (= 3 m))']
                    , [c.FnKey]: Function } } 
 = foxp.putFn1<['(fn [n] (= 2 n))', '(fn [m] (= 3 m))'], '(fn [n] (fn [m] (+ 1 n m)))'>()((n: number) => ({fn :((m: number): number => (1 + n + m))}))

const jjjcg
  : { [c.SexprKey]: '(fn [m] (+ 1 2 m))'
    , [c.ValueKey]: { [c.PreKey]: '(fn [m] (= 3 m))'
                    , [c.FnKey]: Function } }
  = foxp.tap1(
      ffffg
      , foxp.putPrim(2))

describe("higher order fn", () => {
  it("", () => {expect(jjjcg.value.fn(2)).toBe(5)})
  it("", () => {expect(bbbcg.value * 4).toBe(24)})
})

const bbbcg
  : { [c.SexprKey]: '6'
    , [c.ValueKey]: number}
  = foxp.tap1(
      jjjcg
      , foxp.putPrim(3))

const bbbcg_error
  : { [c.SexprKey]: '8'
    , [c.ValueKey]: number}
  = foxp.tap1(
      jjjcg
// @ts-expect-error:
      , foxp.putPrim(5))
