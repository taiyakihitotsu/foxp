import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { join } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const join_test_ok_0:
  { [c.SexprKey]: "'a,b,c'"
  , [c.ValueKey]: unknown } = 
  join
    ()
    ( foxp.putPrim(',')
    , foxp.putVec(foxp.ro(['a', 'b', 'c'] as const)))

const join_test_ok_1:
  { [c.SexprKey]: "'a,true,0'"
  , [c.ValueKey]: unknown } = 
  join
    ()
    ( foxp.putPrim(',')
    , foxp.putVec(foxp.ro(['a', true, 0] as const)))

const join_test_ok_2:
  { [c.SexprKey]: "'a'"
  , [c.ValueKey]: unknown } = 
  join
    ()
    ( foxp.putPrim(',')
    , foxp.putVec(foxp.ro(['a'] as const)))

try {
const join_test_ok_3:
  { [c.SexprKey]: "''"
  , [c.ValueKey]: unknown } = 
  join
    ()
    // [note]
    // join on Cion accepts empty vector but foxp doesn't.
    // see `pre.ts`
    // @ts-expect-error
    ( foxp.putPrim(',')
    , foxp.putVec(foxp.ro([] as const)))
} catch {}

describe('join', () => {
    it(`(join 'a' 'b' 'c')`
       , () => { expect(join_test_ok_0.value).toBe('a,b,c') })
    it(`(join 'a' true 0)`
       , () => { expect(join_test_ok_1.value).toBe('a,true,0') })
    it(`(join 'a')`
       , () => { expect(join_test_ok_2.value).toBe('a') })
})
