import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { interleave } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const interleave_test_0: {
  [c.SexprKey]: '[0 0 1 1 2 2 3 3]'
, [c.ValueKey]: unknown} =
   interleave
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const))
     )

const interleave_test_1: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   interleave
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putVec(foxp.ro([] as const)))


const interleave_test_2: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   interleave
     ()
     ( foxp.putVec(foxp.ro([] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const interleave_test_3: {
  [c.SexprKey]: '[]'
, [c.ValueKey]: unknown} =
   interleave
     ()
     ( foxp.putVec(foxp.ro([] as const))
     , foxp.putVec(foxp.ro([] as const)))

const interleave_test_4: {
  [c.SexprKey]: `[0 'x']`
, [c.ValueKey]: unknown} =
   interleave
     ()
     ( foxp.putVec(foxp.ro([0, 1] as const))
     , foxp.putVec(foxp.ro(["'x'"] as const)))

try {
const interleave_test_no_0: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   interleave
     ()
     // @ts-expect-error
     ( foxp.putPrim(0)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))
} catch {}

try {
const interleave_test_no_1: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   interleave
     ()
     // @ts-expect-error
     ( foxp.putRecord({a: 1} as const)
     , foxp.putPrim(2))
} catch {}

describe('interleave', () => {
  it('(interleave [0 1 2 3] [0 1 2 3])', () => { expect(interleave_test_0.value).toStrictEqual([0,0,1,1,2,2,3,3]) })
  it('(interleave [0 1 2 3] [])', () => { expect(interleave_test_1.value).toStrictEqual([]) })
  it('(interleave [] [0 1 2 3])', () => { expect(interleave_test_2.value).toStrictEqual([]) })
  it('(interleave [] [])', () => { expect(interleave_test_3.value).toStrictEqual([]) })
  // [todo]
  it('(interleave [0 1] ["x"])', () => { expect(interleave_test_4.value).toStrictEqual([0, "'x'"]) })
})
