import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import * as pre from '../../src/pre'
import { apply, add } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import { expectType } from 'tsd'

// [todo] move.
const padd = foxp.putFn1<pre.bi.add, '+'>()(add())

const apply_test_ok_0:
  {[c.SexprKey]: '3'
  ,[c.ValueKey]: unknown} =
  apply
    ()
    (padd, foxp.putVec(foxp.ro([1, 2] as const)))
expectType<{[c.SexprKey]: '3'
  ,[c.ValueKey]: unknown}>(
  apply
    ()
    (padd, foxp.putVec(foxp.ro([1, 2] as const))))

try {
const apply_test_no_0:
  {[c.SexprKey]: {ast: {error: unknown}}
  ,[c.ValueKey]: unknown} =
  apply
    ()
    // @ts-expect-error
    ( padd
    , foxp.putVec(foxp.ro([0, true] as const)))
} catch {}

describe('apply', () => {
    it('(apply + [1 2])', () => { expect(apply_test_ok_0.value).toBe(3) })
})
