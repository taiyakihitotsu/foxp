import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { replace } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const replace_test_ok_0: {
  [c.SexprKey]: "'staaing'"
  , [c.ValueKey]: unknown } = 
  replace
    ()
    ( foxp.putPrim('strring')
    , foxp.putPrim('rr')
    , foxp.putPrim('aa'))

describe('replace', () => {
    it(`(replace 'strring' 0 1)`
       , () => { expect(replace_test_ok_0.value).toBe('staaing') })
})
