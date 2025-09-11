import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { reduce, add, isnum } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'

// [todo] move.
const padd = foxp.putFn1<pre.bi.add, '+'>()(add())
const pisnum = foxp.putFn1<pre.bi.isnum, 'number?'>()(isnum())

const reduce_test_ok_0:
  {[c.SexprKey]: '4'
  ,[c.ValueKey]: unknown} =
  reduce
    ()
    (padd, foxp.putPrim(1), foxp.putVec(foxp.ro([0, 1, 2] as const)))

try {
const reduce_test_no_0 =
  reduce
    ()
    // @ts-expect-error:
    (padd
     , foxp.putPrim('string')
     , foxp.putVec(foxp.ro([0, 1, 2] as const)))
} catch {}

try {
const reduce_test_no_1 =
  reduce
    ()
    // @ts-expect-error:
    (padd
     , foxp.putPrim(1)
     , foxp.putVec(foxp.ro([0, 1, 2, true] as const)))
} catch {}

try {
const reduce_test_no_2 =
  reduce
    ()
    // [todo] fix this.
    // // @ts-expect-error:
    (pisnum
     , foxp.putPrim(1)
     , foxp.putVec(foxp.ro([0, 1, 2] as const)))
} catch {}

describe('reduce', () => {
    it('(reduce + 1 [0 1 2])', () => { expect(reduce_test_ok_0.value).toBe(4) })
})
