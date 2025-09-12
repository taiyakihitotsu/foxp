import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isposint } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isposinttest_ok_0: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putPrim(1))

const isposinttest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putPrim('1/2'))

const isposinttest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putPrim(-1))

const isposinttest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putPrim('-1/2'))

const isposinttest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putPrim("string"))

const isposinttest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putPrim(true))

const isposinttest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isposinttest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isposinttest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isposint
()
(foxp.putFn1<pre.bi.isposint, 'pos-int?'>()(isposint))

describe('pos-int?', () => {
    it('', () => { expect(isposinttest_ok_0.value).toBe(true) })
    it('', () => { expect(isposinttest_ok_01.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_0x.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_01x.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_1.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_2.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_3.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_4.value).toBe(false) })
    it('', () => { expect(isposinttest_ok_5.value).toBe(false) })
})
