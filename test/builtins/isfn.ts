import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isfn } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isfntest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putPrim(1))

const isfntest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putPrim('1/2'))

const isfntest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putPrim("string"))

const isfntest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putPrim(true))

const isfntest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isfntest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isfntest_ok_5: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isfn
()
(foxp.putFn1<pre.bi.isfn, 'fn?'>()(isfn))

describe('fn?', () => {
    it('', () => { expect(isfntest_ok_0.value).toBe(false) })
    it('', () => { expect(isfntest_ok_01.value).toBe(false) })
    it('', () => { expect(isfntest_ok_1.value).toBe(false) })
    it('', () => { expect(isfntest_ok_2.value).toBe(false) })
    it('[1 2 3]', () => { expect(isfntest_ok_3.value).toBe(false) })
    it('{:a 1 :b 2}', () => { expect(isfntest_ok_4.value).toBe(false) })
    it('isfn', () => { expect(isfntest_ok_5.value).toBe(true) })
})
