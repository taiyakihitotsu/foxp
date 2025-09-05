import * as foxp from '../../src/foxp'
import { last } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const last_test_ok0:
  {sexpr: '3'
   value: number} = 
   // [note] ?
   last()(foxp.putVec(foxp.ro([1,2,3] as const)))

const last_test_ok1:
  {sexpr: '3'
   value: number} = 
   last<'(fn [n] (and (vector? n) (every? pos-int? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

const last_test_no1:
  {sexpr: '3'
   value: number} = 
   // [todo] why?
   // @ts-expect-error:
   last<'(fn [n] (and (vector? n) (every? nat-int? n)))'>()(foxp.putVec(foxp.ro([1,2,3] as const)))

// [note]
// In Cion context, `last` returns `nil` if it's empty.
const last_test_no2:
  {sexpr: 'nil'
   value: number} = 
   last
     ()
     // @ts-expect-error:
     (foxp.putVec(foxp.ro([] as const)))

try {
const last_test_no3:
  {sexpr: {ast: {error: "LastError1"}}
   value: number} = 
   last
     ()
     // @ts-expect-error:
     (foxp.putPrim('-1/5'))
} catch {}

describe("last", () => {
it('', () => { expect(last_test_ok0.value).toBe(3) })
it('', () => { expect(last_test_ok1.value).toBe(3) })
})
