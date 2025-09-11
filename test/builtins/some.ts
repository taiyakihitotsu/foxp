import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { some, isnum } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'

// [todo] move.
const pisnum = foxp.putFn1<pre.bi.isnum, 'number?'>()(isnum())

const some_test_ok_0:
  {[c.SexprKey]: 'true'
  ,[c.ValueKey]: unknown} =
  some
    ()
    (pisnum, foxp.putVec(foxp.ro([0, 1, 2, true] as const)))

const some_test_ok_1:
  {[c.SexprKey]: 'false'
  ,[c.ValueKey]: unknown} =
  some
    ()
    (pisnum, foxp.putVec(foxp.ro([true, true] as const)))

// [todo] fix for cion.
// const some_test_ok_2:
//   {[c.SexprKey]: '[]'
//   ,[c.ValueKey]: unknown[]} =
//   some
//     ()
//     (pisnum, foxp.putVec(foxp.ro([] as const)))

try {
const some_test_no_2:
  // [note] This is not the same error case of `some_test_no_1` .
  {[c.SexprKey]: {ast: {sexpr: unknown[]}}
  ,[c.ValueKey]: unknown} =
  some
    ()
    // @ts-expect-error:
    (pisnum, foxp.putVec(foxp.ro([true, pisnum] as const)))
} catch {}

describe('some', () => {
    it('(some number? [0 1 2 true])', () => { expect(some_test_ok_0.value).toBe(true) })
    it('(some number? [true true])', () => { expect(some_test_ok_1.value).toBe(false) })
})
