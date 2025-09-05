import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { ispos } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const ispostest_ok_0: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putPrim(1))

const ispostest_ok_01: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putPrim('1/2'))

const ispostest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putPrim(-1))

const ispostest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putPrim('-1/2'))

const ispostest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putPrim("string"))

const ispostest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putPrim(true))

const ispostest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const ispostest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const ispostest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ispos
()
// [todo] preliminary
(foxp.putFn1<pre.bi.ispos, 'int?'>()(ispos))

describe('add', () => {
    it('', () => { expect(ispostest_ok_0.value).toBe(true) })
    it('', () => { expect(ispostest_ok_01.value).toBe(true) })
    it('', () => { expect(ispostest_ok_0x.value).toBe(false) })
    it('', () => { expect(ispostest_ok_01x.value).toBe(false) })
    it('', () => { expect(ispostest_ok_1.value).toBe(false) })
    it('', () => { expect(ispostest_ok_2.value).toBe(false) })
    it('', () => { expect(ispostest_ok_3.value).toBe(false) })
    it('', () => { expect(ispostest_ok_4.value).toBe(false) })
    it('', () => { expect(ispostest_ok_5.value).toBe(false) })
})
