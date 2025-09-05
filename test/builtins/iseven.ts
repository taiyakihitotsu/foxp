import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { iseven } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const iseventest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim(1))

const iseventest_ok_0even: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim(2))

const iseventest_ok_0meven: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim(-2))

const iseventest_ok_0modd: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim(-1))


// [todo] fix cion
const iseventest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim('1/2'))

const iseventest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim(-1))


// [todo] fix cion
const iseventest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim('-1/2'))

const iseventest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim("string"))

const iseventest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putPrim(true))

const iseventest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const iseventest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const iseventest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iseven
()
// [todo] preliminary
(foxp.putFn1<pre.bi.iseven, 'int?'>()(iseven))

describe('add', () => {
    it('', () => { expect(iseventest_ok_0.value).toBe(false) })
    it('', () => { expect(iseventest_ok_0even.value).toBe(true) })
    it('', () => { expect(iseventest_ok_0meven.value).toBe(true) })
    it('', () => { expect(iseventest_ok_0modd.value).toBe(false) })
    it('1/2', () => { expect(iseventest_ok_01.value).toBe(false) })
    it('-1', () => { expect(iseventest_ok_0x.value).toBe(false) })
    it('-1/2', () => { expect(iseventest_ok_01x.value).toBe(false) })
    it('', () => { expect(iseventest_ok_1.value).toBe(false) })
    it('', () => { expect(iseventest_ok_2.value).toBe(false) })
    it('', () => { expect(iseventest_ok_3.value).toBe(false) })
    it('', () => { expect(iseventest_ok_4.value).toBe(false) })
    it('', () => { expect(iseventest_ok_5.value).toBe(false) })
})
