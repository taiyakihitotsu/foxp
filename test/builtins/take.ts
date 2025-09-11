import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { take } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const take_test_0: {
  [c.SexprKey]: '[0 1]'
, [c.ValueKey]: unknown} =
   take
     ()
     ( foxp.putPrim(2)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const take_test_1: {
  [c.SexprKey]: '[0 1 2 3]'
, [c.ValueKey]: unknown} =
   take
     ()
     ( foxp.putPrim(6)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const take_test_2: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   take
     ()
     ( foxp.putPrim(0)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

try {
const take_test_no_0: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   take
     ()
     // @ts-expect-error
     ( foxp.putPrim(-1)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))
} catch {}

try {
const take_test_no_1: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   take
     ()
     // @ts-expect-error
     ( foxp.putPrim(0)
     , foxp.putRecord({a: 1} as const))
} catch {}

describe('take', () => {
  it('(take 2 [0 1 2 3])', () => { expect(take_test_0.value).toStrictEqual([0, 1]) })
  it('(take 6 [0 1 2 3])', () => { expect(take_test_1.value).toStrictEqual([0, 1, 2, 3]) })
  it('(take 0 [0 1 2 3])', () => { expect(take_test_2.value).toStrictEqual([]) })
})
