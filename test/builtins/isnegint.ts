import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isnegint } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isneginttest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putPrim(1))

const isneginttest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putPrim('1/2'))

const isneginttest_ok_0x: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putPrim(-1))

const isneginttest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putPrim('-1/2'))

const isneginttest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putPrim("string"))

const isneginttest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putPrim(true))

const isneginttest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isneginttest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isneginttest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnegint
()
(foxp.putFn1<pre.bi.isnegint, 'neg-int?'>()(isnegint))

describe('neg-int?', () => {
    it('', () => { expect(isneginttest_ok_0.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_01.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_0x.value).toBe(true) })
    it('', () => { expect(isneginttest_ok_01x.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_1.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_2.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_3.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_4.value).toBe(false) })
    it('', () => { expect(isneginttest_ok_5.value).toBe(false) })
})
