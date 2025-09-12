import * as foxp from '../../src/foxp'
import { second } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const second_test_ok0:
  {sexpr: '2'
   value: number} = 
   second()(foxp.putVec(foxp.ro([1,2,3] as const)))

const second_test_ok1:
  {sexpr: '2'
   value: number} = 
   second<'(fn [n] (and (vector? n) (every? pos-int? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

const second_test_ok2:
  {sexpr: '2'
   value: number} = 
   second<'(fn [n] (and (vector? n) (every? nat? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

// [note]
// In Cion context, `second` returns `nil` if it's empty.
const second_test_no2:
  {sexpr: 'nil'
   value: number} = 
   second
     ()
     // @ts-expect-error:
     (foxp.putVec(foxp.ro([] as const)))

const second_test_no3:
  {sexpr: {ast: {error: "LispSecondError0"}}
   value: number} = 
   second
     ()
     // @ts-expect-error:
     (foxp.putPrim('-1/5'))

describe("second", () => {
it('', () => { expect(second_test_ok0.value).toBe(2) })
it('', () => { expect(second_test_ok1.value).toBe(2) })
it('', () => { expect(second_test_ok2.value).toBe(2) })
})
