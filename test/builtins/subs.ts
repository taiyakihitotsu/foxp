import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { subs } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const subs_test_ok_0: {
  [c.SexprKey]: "'s'"
  , [c.ValueKey]: unknown } = 
  subs
    ()
    ( foxp.putPrim('strring')
    , foxp.putPrim(0)
    , foxp.putPrim(1))

const subs_test_ok_1: {
  [c.SexprKey]: "'strring'"
  , [c.ValueKey]: unknown } = 
  subs
    ()
    ( foxp.putPrim('strring')
    , foxp.putPrim(0)
    , foxp.putPrim(999))

const subs_test_ok_2: {
  [c.SexprKey]: "'rri'"
  , [c.ValueKey]: unknown } = 
  subs
    ()
    ( foxp.putPrim('strring')
    , foxp.putPrim(2)
    , foxp.putPrim(5))

const subs_test_ok_3: {
  [c.SexprKey]: "''"
  , [c.ValueKey]: unknown } = 
  subs
    ()
    ( foxp.putPrim('strring')
    , foxp.putPrim(999)
    , foxp.putPrim(1000))

try {
// [note] Cion accepts this case (2nd > 3rd) but Fopx rejects in current.
const subs_test_no_0: {
  [c.SexprKey]: "''"
  , [c.ValueKey]: unknown } = 
  subs
    ()
    // @ts-expect-error
    ( foxp.putPrim('strring')
    , foxp.putPrim(4)
    , foxp.putPrim(3))
} catch {}

try {
// [note] Cion accepts this case (negative numbers) but Fopx rejects in current.
const subs_test_no_1: {
  [c.SexprKey]: "'strr'"
  , [c.ValueKey]: unknown } = 
  subs
    ()
    // @ts-expect-error
    ( foxp.putPrim('strring')
    , foxp.putPrim(-1)
    , foxp.putPrim(3))
} catch {}

describe('subs', () => {
    it(`(subs 'strring' 0 1)`
       , () => { expect(subs_test_ok_0.value).toBe('s') })
    it(`(subs 'strring' 0 999)`
       , () => { expect(subs_test_ok_1.value).toBe('strring') })
    it(`(subs 'strring' 2 5)`
       , () => { expect(subs_test_ok_2.value).toBe('rri') })
    it(`(subs 'strring' 999 1000)`
       , () => { expect(subs_test_ok_3.value).toBe('') })
})
