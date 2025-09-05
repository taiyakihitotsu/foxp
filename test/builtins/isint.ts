import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isint } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isinttest_ok_0: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isint
()
(foxp.putPrim(1))

const isinttest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isint
()
(foxp.putPrim('1/2'))

const isinttest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isint
()
(foxp.putPrim("string"))

const isinttest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isint
()
(foxp.putPrim(true))

const isinttest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isint
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isinttest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isint
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isinttest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isint
()
// [todo] preliminary
(foxp.putFn1<pre.bi.isint, 'int?'>()(isint))

describe('add', () => {
    it('', () => { expect(isinttest_ok_0.value).toBe(true) })
    it('', () => { expect(isinttest_ok_01.value).toBe(false) })
    it('', () => { expect(isinttest_ok_1.value).toBe(false) })
    it('', () => { expect(isinttest_ok_2.value).toBe(false) })
    it('', () => { expect(isinttest_ok_3.value).toBe(false) })
    it('', () => { expect(isinttest_ok_4.value).toBe(false) })
    it('', () => { expect(isinttest_ok_5.value).toBe(false) })
})
