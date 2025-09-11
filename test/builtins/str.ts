import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { str1, str2, str3 } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const str1test_ok_0: {
  [c.SexprKey]: "'1'"
  , [c.ValueKey]: string } = 
  str1
    ()
    (foxp.putPrim(1))

const str1test_ok_1: {
  [c.SexprKey]: "'true'"
  , [c.ValueKey]: string } = 
  str1
    ()
    (foxp.putPrim(true))

const str1test_ok_2: {
  [c.SexprKey]: "'xyz'"
  , [c.ValueKey]: string } = 
  str1
    ()
    (foxp.putPrim('xyz'))

try {
// @ts-expect-error
const str1test_no_0: {
  [c.SexprKey]: "'a'"
  , [c.ValueKey]: string } = 
  str1
    ()
    // [note] only prim is acceptable in current.
    // @ts-expect-error
    (foxp.putVec(foxp.ro([0,1,2] as const)))
} catch {}

const str2test_ok_0: {
  [c.SexprKey]: "'11'"
  , [c.ValueKey]: string } = 
  str2
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const str2test_ok_1: {
  [c.SexprKey]: "'truefalse'"
  , [c.ValueKey]: string } = 
  str2
    ()
    ( foxp.putPrim(true)
    , foxp.putPrim(false))

const str2test_ok_2: {
  [c.SexprKey]: "'+xyz'"
  , [c.ValueKey]: string } = 
  str2
    ()
    ( foxp.putPrim('+')
    , foxp.putPrim('xyz'))

const str3test_ok_0: {
  [c.SexprKey]: "'1true+_+'"
  , [c.ValueKey]: string } = 
  str3
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(true)
    , foxp.putPrim('+_+'))

const str3test_ok_1: {
  [c.SexprKey]: "'true999stringsomething'"
  , [c.ValueKey]: string } = 
  str3
    ()
    ( foxp.putPrim(true)
    , foxp.putPrim(999)
    , foxp.putPrim("stringsomething"))

const str3test_ok_2: {
  [c.SexprKey]: "'+xyzfalse'"
  , [c.ValueKey]: string } = 
  str3
    ()
    ( foxp.putPrim('+')
    , foxp.putPrim('xyz')
    , foxp.putPrim(false))

describe('str', () => {
    it(`(str 1)`
       , () => { expect(str1test_ok_0.value).toBe('1') })
    it(`(str true)`
       , () => { expect(str1test_ok_1.value).toBe('true') })
    it(`(str 'xyz')`
       , () => { expect(str1test_ok_2.value).toBe('xyz') })
    it(`(str 1 1)`
       , () => { expect(str2test_ok_0.value).toBe('11') })
    it(`(str true false)`
       , () => { expect(str2test_ok_1.value).toBe('truefalse') })
    it(`(str '+' 'xyz')`
       , () => { expect(str2test_ok_2.value).toBe('+xyz') })
    it(`(str 1 true '+_+')`
       , () => { expect(str3test_ok_0.value).toBe('1true+_+') })
    it(`(str true 999 'stringsomething')`
       , () => { expect(str3test_ok_1.value).toBe('true999stringsomething') })
    it(`(str '+' 'xyz' false)`
       , () => { expect(str3test_ok_2.value).toBe('+xyzfalse') })
})
