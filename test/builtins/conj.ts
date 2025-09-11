import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { conj } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const conj_test_0: {
  [c.SexprKey]: '[0 1 2 3 2]'
, [c.ValueKey]: unknown} =
   conj
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putPrim(2)
     )

const conj_test_1: {
  [c.SexprKey]: '[0 1 2 3 [0 1 2 3]]'
, [c.ValueKey]: unknown} =
   conj
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const conj_test_2: {
  [c.SexprKey]: '[[0 1 2 3]]'
, [c.ValueKey]: unknown} =
   conj
     ()
     ( foxp.putVec(foxp.ro([] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))


try {
const conj_test_no_0: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   conj
     ()
     // @ts-expect-error
     ( foxp.putPrim(0)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))
} catch {}

try {
const conj_test_no_1: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   conj
     ()
     // @ts-expect-error
     ( foxp.putRecord({a: 1} as const)
     , foxp.putPrim(2))
} catch {}

describe('conj', () => {
  it('(conj [0 1 2 3] 2)', () => { expect(conj_test_0.value).toStrictEqual([0,1,2,3,2]) })
  it('(conj [0 1 2 3] [0 1 2 3])', () => { expect(conj_test_1.value).toStrictEqual([0,1,2,3,[0,1,2,3]]) })
  it('(conj [] [0 1 2 3])', () => { expect(conj_test_2.value).toStrictEqual([[0,1,2,3]]) })
})
