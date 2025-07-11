import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { trunc } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'



const trunc_test_ok0:
  {sexpr: '0'
   value: number} = 
   trunc()(foxp.putPrim('1/3'))

const trunc_test_ok1:
  {sexpr: '3'
   value: number} = 
   trunc()(foxp.putPrim('3'))

const trunc_test_ok3:
  {sexpr: '1'
   value: number} = 
   trunc()(foxp.putPrim('3/2'))

const trunc_test_ok4:
  {sexpr: '0'
   value: number} = 
   trunc()(foxp.putPrim('-1/5'))

// @ts-expect-error:
const trunc_test_failure_malarg1:
  {sexpr: '0'
   value: number} = 
// @ts-expect-error:
   trunc()(foxp.putPrim(1/5))

const trunc_test_ok_precheck0:
  {sexpr: '-5'
   value: number} = 
   trunc<'neg-int?'>()(foxp.putPrim(-5))

const trunc_test_failure_precheck0:
  {sexpr: '5'
   value: number} = 
   trunc
     <'neg-int?'>
     ()
// @ts-expect-error:
     (foxp.putPrim(5))



describe("trunc", () => {
it('trunc 1/3', () => { expect(trunc_test_ok0.value).toBe(0) })
it('trunc 3', () => { expect(trunc_test_ok1.value).toBe(3) })
it('trunc 3/2', () => { expect(trunc_test_ok3.value).toBe(1) })
it('trunc -1/5', () => { expect(Math.abs(trunc_test_ok4.value)).toEqual(0) }) // todo
it('trunc -5', () => { expect(trunc_test_ok_precheck0.value).toBe(-5) })
})
