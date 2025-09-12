import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isneg } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isnegtest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putPrim(1))

const isnegtest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putPrim('1/2'))

const isnegtest_ok_0x: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putPrim(-1))

const isnegtest_ok_01x: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putPrim('-1/2'))

const isnegtest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putPrim("string"))

const isnegtest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putPrim(true))

const isnegtest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isnegtest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isnegtest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isneg
()
(foxp.putFn1<pre.bi.isneg, 'neg?'>()(isneg))

describe('add', () => {
    it('', () => { expect(isnegtest_ok_0.value).toBe(false) })
    it('', () => { expect(isnegtest_ok_01.value).toBe(false) })
    it('', () => { expect(isnegtest_ok_0x.value).toBe(true) })
    it('', () => { expect(isnegtest_ok_01x.value).toBe(true) })
    it('', () => { expect(isnegtest_ok_1.value).toBe(false) })
    it('', () => { expect(isnegtest_ok_2.value).toBe(false) })
    it('', () => { expect(isnegtest_ok_3.value).toBe(false) })
    it('', () => { expect(isnegtest_ok_4.value).toBe(false) })
    it('', () => { expect(isnegtest_ok_5.value).toBe(false) })
})
