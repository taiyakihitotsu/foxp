import * as foxp from '../../src/foxp'
import { first } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const first_test_ok0:
  {sexpr: '1'
   value: number} = 
   first()(foxp.putVec(foxp.ro([1,2,3] as const)))

const first_test_ok1:
  {sexpr: '1'
   value: number} = 
   first<'(fn [n] (and (vector? n) (every? pos-int? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

const first_test_no1:
  {sexpr: '1'
   value: number} = 
   // [todo] why?
   // @ts-expect-error:
   first<'(fn [n] (and (vector? n) (every? nat-int? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

// [note]
// In Cion context, `first` returns `nil` if it's empty.
const first_test_no2:
  {sexpr: 'nil'
   value: number} = 
   first
     ()
     // @ts-expect-error:
     (foxp.putVec(foxp.ro([] as const)))

const first_test_no3:
  {sexpr: {ast: {error: 'FirstError1'}}
   value: number} = 
   first
     ()
     // @ts-expect-error:
     (foxp.putPrim('-1/5'))

describe("first", () => {
it('', () => { expect(first_test_ok0.value).toBe(1) })
it('', () => { expect(first_test_ok1.value).toBe(1) })
})
