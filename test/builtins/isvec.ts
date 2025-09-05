import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isvec } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isvectest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isvec
()
(foxp.putPrim(1))

const isvectest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isvec
()
(foxp.putPrim('1/2'))

const isvectest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isvec
()
(foxp.putPrim("string"))

const isvectest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isvec
()
(foxp.putPrim(true))

const isvectest_ok_3: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isvec
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isvectest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isvec
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isvectest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isvec
()
// [todo] preliminary
(foxp.putFn1<pre.bi.isvec, 'int?'>()(isvec))

describe('add', () => {
    it('', () => { expect(isvectest_ok_0.value).toBe(false) })
    it('', () => { expect(isvectest_ok_01.value).toBe(false) })
    it('', () => { expect(isvectest_ok_1.value).toBe(false) })
    it('', () => { expect(isvectest_ok_2.value).toBe(false) })
    it('', () => { expect(isvectest_ok_3.value).toBe(true) })
    it('', () => { expect(isvectest_ok_4.value).toBe(false) })
    it('', () => { expect(isvectest_ok_5.value).toBe(false) })
})
