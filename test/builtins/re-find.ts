import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { refind } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const refind_test_ok_0: {
  [c.SexprKey]: "'str'"
  , [c.ValueKey]: unknown } = 
  refind
    ()
    ( foxp.putPrim('str')
    , foxp.putPrim('str'))

const refind_test_ok_1: {
  [c.SexprKey]: "'str'"
  , [c.ValueKey]: unknown } = 
  refind
    ()
    ( foxp.putPrim('str')
    , foxp.putPrim('strring'))

const refind_test_ok_2: {
  [c.SexprKey]: "'01'"
  , [c.ValueKey]: unknown } = 
  refind
    ()
    ( foxp.putPrim('\\d+')
    , foxp.putPrim('str01xyz'))

const refind_test_ok_3: {
  [c.SexprKey]: "''"
  , [c.ValueKey]: unknown } = 
  refind
    ()
    ( foxp.putPrim('[abc]+')
    , foxp.putPrim('str01xyz'))

describe('refind', () => {
    it(`(re-find 'str' 'str')`
       , () => { expect(refind_test_ok_0.value).toBe('str') })
    it(`(re-find 'str' 'strring')`
       , () => { expect(refind_test_ok_1.value).toBe('str') })
    it(`(re-find '\\d+' 'str01xyz')`
       , () => { expect(refind_test_ok_2.value).toBe('01') })
    it(`(re-find '[abc]+' 'str01xyz')`
       , () => { expect(refind_test_ok_3.value).toBe('') })
})
