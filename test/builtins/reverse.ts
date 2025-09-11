import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { reverse } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const reverse_test_0: {
  [c.SexprKey]: '[3 2 1 0]'
, [c.ValueKey]: unknown} =
   reverse
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const)))

const reverse_test_1: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   reverse
     ()
     ( foxp.putVec(foxp.ro([] as const)))

try {
const reverse_test_no_0: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   reverse
     ()
     // @ts-expect-error
     ( foxp.putRecord({a: 1} as const))
} catch {}

describe('reverse', () => {
  it('(reverse [0 1 2 3])', () => { expect(reverse_test_0.value).toStrictEqual([3,2,1,0]) })
  it('(reverse [])', () => { expect(reverse_test_1.value).toStrictEqual([]) })
})
