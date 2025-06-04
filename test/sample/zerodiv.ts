import * as foxp from '../../src/foxp'
import * as pre  from '../../src/pre'
import * as builtins from '../../src/builtins'
import { describe, it, expect } from 'vitest'

// [note]
// You can use builtins' div.

const testzerodiv0
// Lisp trick as inner.
//  = foxp.putFn1<'(fn [n] (not (zero? n)))', '(fn [n] (/ 4 n))'>()((n: number) => 4 / n)
  = foxp.putFn1<pre.NotZero, builtins.DivF<4>>()((n: number) => 4 / n)

const testzerodiv1
  = foxp.tap1( testzerodiv0
	, foxp.putPrim(2))

const testzerodiv2a = foxp.putPrim(0)

try {
const testzerodiv2
  = foxp.tap1(
      testzerodiv0
// @ts-expect-error:
      , foxp.putPrim(0))
} catch {}

describe("zerodiv", () => {
  it('', ()=>{ expect(testzerodiv1.value).toBe(2) })
})
