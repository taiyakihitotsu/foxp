import * as foxp from '../../src/foxp'
import { third } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const third_test_ok0:
  {sexpr: '3'
   value: number} = 
   third()(foxp.putVec(foxp.ro([1,2,3] as const)))

const third_test_ok1:
  {sexpr: '3'
   value: number} = 
   third<'(fn [n] (and (vector? n) (every? pos-int? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

const third_test_no1:
  {sexpr: '3'
   value: number} = 
   third<'(fn [n] (and (vector? n) (every? nat? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

// [note]
// In Cion context, `third` returns `nil` if it's empty.
const third_test_no2:
  {sexpr: 'nil'
   value: number} = 
   third
     ()
     // @ts-expect-error:
     (foxp.putVec(foxp.ro([] as const)))

const third_test_no3:
  {sexpr: "nil"
   value: number} = 
   third
     ()
     // @ts-expect-error:
     (foxp.putPrim('-1/5'))

describe("third", () => {
it('', () => { expect(third_test_ok0.value).toBe(3) })
it('', () => { expect(third_test_ok1.value).toBe(3) })
})
