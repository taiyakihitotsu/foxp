import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { remove, isnum } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'

// [todo] move.
const pisnum = foxp.putFn1<pre.bi.isnum, 'number?'>()(isnum())

const remove_test_ok_0:
  {[c.SexprKey]: '[true]'
  ,[c.ValueKey]: unknown[]} =
  remove
    ()
    (pisnum, foxp.putVec(foxp.ro([0, 1, 2, true] as const)))

const remove_test_ok_1:
  {[c.SexprKey]: '[true true]'
  ,[c.ValueKey]: unknown[]} =
  remove
    ()
    (pisnum, foxp.putVec(foxp.ro([true, true] as const)))

// [todo] fix for cion.
// const remove_test_ok_2:
//   {[c.SexprKey]: '[]'
//   ,[c.ValueKey]: unknown[]} =
//   remove
//     ()
//     (pisnum, foxp.putVec(foxp.ro([] as const)))

try {
const remove_test_no_2:
  // [note] This is not the same error case of `remove_test_no_1` .
  {[c.SexprKey]: {ast: {sexpr: unknown[]}}
  ,[c.ValueKey]: unknown[]} =
  remove
    ()
    // @ts-expect-error:
    (pisnum, foxp.putVec(foxp.ro([true, pisnum] as const)))
} catch {}

describe('remove', () => {
    it('(remove number? [0 1 2 true])', () => { expect(remove_test_ok_0.value).toStrictEqual([true]) })
    it('(remove number? [true true])', () => { expect(remove_test_ok_1.value).toStrictEqual([true, true]) })
//   it('(remove number? [0 1 2 true])', () => { expect(remove_test_ok_0.value).toStrictEqual([0,1,2]) })
    
})
