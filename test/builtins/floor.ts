import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { floor } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'



const floor_test_ok0:
  {sexpr: '0'
   value: number} = 
   floor()(foxp.putPrim('1/3'))

const floor_test_ok1:
  {sexpr: '3'
   value: number} = 
   floor()(foxp.putPrim('3'))

const floor_test_ok3:
  {sexpr: '1'
   value: number} = 
   floor()(foxp.putPrim('3/2'))

const floor_test_ok4:
  {sexpr: '-1'
   value: number} = 
   floor()(foxp.putPrim('-1/5'))

// @ts-expect-error:
const floor_test_failure_malarg1:
  {sexpr: '0'
   value: number} = 
// @ts-expect-error:
   floor()(foxp.putPrim(1/5))

const floor_test_ok_precheck0:
  {sexpr: '-5'
   value: number} = 
   floor<'neg-int?'>()(foxp.putPrim(-5))

const floor_test_failure_precheck0:
  {sexpr: '5'
   value: number} = 
   floor
     <'neg-int?'>
     ()
// @ts-expect-error:
     (foxp.putPrim(5))



describe("floor", () => {
it('', () => { expect(floor_test_ok0.value).toBe(0) })
it('', () => { expect(floor_test_ok1.value).toBe(3) })
it('', () => { expect(floor_test_ok3.value).toBe(1) })
it('', () => { expect(floor_test_ok4.value).toBe(-1) })
it('', () => { expect(floor_test_ok_precheck0.value).toBe(-5) })
})
