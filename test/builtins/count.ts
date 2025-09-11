import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { count } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const count_test_0: {
  [c.SexprKey]: '4'
, [c.ValueKey]: unknown} =
   count
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const)))

const count_test_1: {
  [c.SexprKey]: '0'
// [todo]
// This is related to `44ea12d9b72c6953fb4faeef432a5d4f1b840bd2`.
// See DEV.md
//
// , [c.ValueKey]: number
  , [c.ValueKey]: unknown

} =
   count
     ()
     ( foxp.putVec(foxp.ro([] as const)))

try {
const count_test_2: {
  [c.SexprKey]: {ast: {error: unknown}}
  , [c.ValueKey]: unknown
// , [c.ValueKey]: number
} =
   count
     ()
     // @ts-expect-error:
     ( foxp.putRecord({a: 1} as const))
} catch {}

describe('count', () => {
  it('(count [0 1 2 3])', () => { expect(count_test_0.value).toBe(4) })
  it('(count [])', () => { expect(count_test_1.value).toBe(0) })
})
