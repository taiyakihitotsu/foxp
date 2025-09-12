import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isnat } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'

const isnattest_ok_0: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putPrim(1))

const isnattest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putPrim('1/2'))

const isnattest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putPrim(-1))

const isnattest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putPrim('-1/2'))

const isnattest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putPrim("string"))

const isnattest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putPrim(true))

const isnattest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isnattest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isnattest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnat
()
(foxp.putFn1<pre.bi.isnat, 'nat?'>()(isnat))

describe('nat?', () => {
    it('1', () => { expect(isnattest_ok_0.value).toBe(true) })
    it('', () => { expect(isnattest_ok_01.value).toBe(false) })
    it('', () => { expect(isnattest_ok_0x.value).toBe(false) })
    it('', () => { expect(isnattest_ok_01x.value).toBe(false) })
    it('', () => { expect(isnattest_ok_1.value).toBe(false) })
    it('', () => { expect(isnattest_ok_2.value).toBe(false) })
    it('', () => { expect(isnattest_ok_3.value).toBe(false) })
    it('', () => { expect(isnattest_ok_4.value).toBe(false) })
    it('', () => { expect(isnattest_ok_5.value).toBe(false) })
})
