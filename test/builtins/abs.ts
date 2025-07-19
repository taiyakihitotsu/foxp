import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { abs } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'

import { describe, it, expect } from 'vitest'

const abs_test_ok0:
  {sexpr: '1/3'
   value: number} = 
   abs()(foxp.putPrim('1/3'))

const abs_test_ok1:
  {sexpr: '3'
   value: number} = 
   abs()(foxp.putPrim(3))

const abs_test_ok3:
  {sexpr: '3/2'
   value: number} = 
   abs()(foxp.putPrim('-3/2'))

const abs_test_ok4:
  {sexpr: '1'
   value: number} = 
   abs()(foxp.putPrim(-1))

const abs_test_ok5:
  {sexpr: '0'
   value: number} = 
   abs()(foxp.putPrim(0))

// @ts-expect-error:
const abs_test_failure_malarg1:
  {sexpr: '0'
   value: number} = 
// @ts-expect-error:
   abs()(foxp.putPrim(1/5))

const abs_test_ok_precheck0:
  {sexpr: '5'
   value: number} = 
   abs<'neg-int?'>()(foxp.putPrim(-5))

const abs_test_failure_precheck0:
  {sexpr: '5'
   value: number} = 
   abs
     <'neg-int?'>
     ()
// @ts-expect-error:
     (foxp.putPrim(5))



describe("abs", () => {
it('', () => { expect(abs_test_ok0.value).toBe(1/3) })
it('', () => { expect(abs_test_ok1.value).toBe(3) })
it('', () => { expect(abs_test_ok3.value).toBe(3/2) })
it('', () => { expect(abs_test_ok4.value).toBe(1) })
it('', () => { expect(abs_test_ok5.value).toBe(0) })
it('', () => { expect(abs_test_ok_precheck0.value).toBe(5) })
})
