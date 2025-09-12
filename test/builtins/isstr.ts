import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isstr } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isstrtest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putPrim(1))

const isstrtest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putPrim('1/2'))

const isstrtest_ok_1: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putPrim("string"))

const isstrtest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putPrim(true))

const isstrtest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isstrtest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isstrtest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isstr
()
(foxp.putFn1<pre.bi.isstr, 'string?'>()(isstr))

describe('add', () => {
    it('', () => { expect(isstrtest_ok_0.value).toBe(false) })
    it('', () => { expect(isstrtest_ok_01.value).toBe(false) })
    it('', () => { expect(isstrtest_ok_1.value).toBe(true) })
    it('', () => { expect(isstrtest_ok_2.value).toBe(false) })
    it('', () => { expect(isstrtest_ok_3.value).toBe(false) })
    it('', () => { expect(isstrtest_ok_4.value).toBe(false) })
    it('', () => { expect(isstrtest_ok_5.value).toBe(false) })
})
