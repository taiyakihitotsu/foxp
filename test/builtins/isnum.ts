import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isnum } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isnumtest_ok_0: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putPrim(1))

const isnumtest_ok_01: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putPrim('1/2'))

const isnumtest_ok_1: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putPrim("string"))

const isnumtest_ok_2: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putPrim(true))

const isnumtest_ok_3: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putVec(foxp.ro([1,2,3] as const)))

const isnumtest_ok_4: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isnumtest_ok_5: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean } = 
  isnum
    ()
    (foxp.putFn1<pre.bi.isnum, 'number?'>()(isnum))

describe('number?', () => {
it('', () => { expect(isnumtest_ok_0.value).toBe(true) })
it('', () => { expect(isnumtest_ok_01.value).toBe(true) })
it('', () => { expect(isnumtest_ok_1.value).toBe(false) })
it('', () => { expect(isnumtest_ok_2.value).toBe(false) })
it('', () => { expect(isnumtest_ok_3.value).toBe(false) })
it('', () => { expect(isnumtest_ok_4.value).toBe(false) })
it('', () => { expect(isnumtest_ok_5.value).toBe(false) })
})
