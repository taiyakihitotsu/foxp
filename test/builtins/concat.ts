import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { concat } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const concat_test_0: {
  [c.SexprKey]: '[0 1 2 3 0 1 2 3]'
, [c.ValueKey]: unknown} =
   concat
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const))
     )

const concat_test_1: {
  [c.SexprKey]: '[0 1 2 3]'
, [c.ValueKey]: unknown} =
   concat
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putVec(foxp.ro([] as const)))


const concat_test_2: {
  [c.SexprKey]: '[0 1 2 3]'
, [c.ValueKey]: unknown} =
   concat
     ()
     ( foxp.putVec(foxp.ro([] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))


const concat_test_3: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   concat
     ()
     ( foxp.putVec(foxp.ro([] as const))
     , foxp.putVec(foxp.ro([] as const)))

try {
const concat_test_no_0: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   concat
     ()
     // @ts-expect-error
     ( foxp.putPrim(0)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))
} catch {}

try {
const concat_test_no_1: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   concat
     ()
     // @ts-expect-error
     ( foxp.putRecord({a: 1} as const)
     , foxp.putPrim(2))
} catch {}

describe('concat', () => {
  it('(concat [0 1 2 3] [0 1 2 3])', () => { expect(concat_test_0.value).toStrictEqual([0,1,2,3,0,1,2,3]) })
  it('(concat [0 1 2 3] [])', () => { expect(concat_test_1.value).toStrictEqual([0,1,2,3]) })
  it('(concat [] [0 1 2 3])', () => { expect(concat_test_2.value).toStrictEqual([0,1,2,3]) })
  it('(concat [] [])', () => { expect(concat_test_3.value).toStrictEqual([]) })
})
