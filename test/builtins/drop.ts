import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { drop } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const drop_test_0: {
  [c.SexprKey]: '[2 3]'
, [c.ValueKey]: unknown} =
   drop
     ()
     ( foxp.putPrim(2)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const drop_test_1: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   drop
     ()
     ( foxp.putPrim(6)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const drop_test_2: {
  [c.SexprKey]: '[0 1 2 3]'
, [c.ValueKey]: unknown} =
   drop
     ()
     ( foxp.putPrim(0)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

try {
const drop_test_no_0: {
  [c.SexprKey]: '[0 1 2 3]'
, [c.ValueKey]: unknown} =
   drop
     ()
     // @ts-expect-error
     ( foxp.putPrim(-1)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))
} catch {}

try {
const drop_test_no_1: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   drop
     ()
     // @ts-expect-error
     ( foxp.putPrim(0)
     , foxp.putRecord({a: 1} as const))
} catch {}

describe('drop', () => {
  it('(drop 2 [0 1 2 3])', () => { expect(drop_test_0.value).toStrictEqual([2, 3]) })
  it('(drop 6 [0 1 2 3])', () => { expect(drop_test_1.value).toStrictEqual([]) })
  it('(drop 0 [0 1 2 3])', () => { expect(drop_test_2.value).toStrictEqual([0,1,2,3]) })
})
