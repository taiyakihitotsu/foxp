import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { filter, isnum } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'

// [todo] move.
const pisnum = foxp.putFn1<pre.bi.isnum, 'number?'>()(isnum())

const filter_test_ok_0:
  {[c.SexprKey]: '[0 1 2]'
  ,[c.ValueKey]: unknown[]} =
  filter
    ()
    (pisnum, foxp.putVec(foxp.ro([0, 1, 2, true] as const)))

const filter_test_ok_1:
  {[c.SexprKey]: '[]'
  ,[c.ValueKey]: unknown[]} =
  filter
    ()
    (pisnum, foxp.putVec(foxp.ro([true, true] as const)))

// [todo] fix for cion.
// const filter_test_ok_2:
//   {[c.SexprKey]: '[]'
//   ,[c.ValueKey]: unknown[]} =
//   filter
//     ()
//     (pisnum, foxp.putVec(foxp.ro([] as const)))

try {
const filter_test_no_2:
  // [note] This is not the same error case of `filter_test_no_1` .
  {[c.SexprKey]: {ast: {sexpr: unknown[]}}
  ,[c.ValueKey]: unknown[]} =
  filter
    ()
    // @ts-expect-error:
    (pisnum, foxp.putVec(foxp.ro([true, pisnum] as const)))
} catch {}

describe('filter', () => {
    it('(filter number? [0 1 2 true])', () => { expect(filter_test_ok_0.value).toStrictEqual([0,1,2]) })
    it('(filter number? [true true])', () => { expect(filter_test_ok_1.value).toStrictEqual([]) })
   it('(filter number? [])', () => { expect(filter_test_ok_2.value).toStrictEqual([]) })
    
})
