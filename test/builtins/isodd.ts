import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isodd } from '../../src/builtins'
// import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
// import type Cion from '@taiyakihitotsu/cion'

const isoddtest_ok_0: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim(1))

const isoddtest_ok_0even: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim(2))

const isoddtest_ok_0meven: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim(-2))

const isoddtest_ok_0modd: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim(-1))

const isoddtest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim('1/2'))

const isoddtest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim('-1/2'))

const isoddtest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim("string"))

const isoddtest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putPrim(true))

const isoddtest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isoddtest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isoddtest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isodd
()
// [todo] preliminary
(foxp.putFn1<pre.bi.isodd, 'int?'>()(isodd))

describe('odd', () => {
    it('', () => { expect(isoddtest_ok_0.value).toBe(true) })
    it('', () => { expect(isoddtest_ok_0even.value).toBe(false) })
    it('', () => { expect(isoddtest_ok_0meven.value).toBe(false) })
    it('1/2', () => { expect(isoddtest_ok_01.value).toBe(false) })
    it('-1', () => { expect(isoddtest_ok_0modd.value).toBe(true) })
    it('-1/2', () => { expect(isoddtest_ok_01x.value).toBe(false) })
    it('', () => { expect(isoddtest_ok_1.value).toBe(false) })
    it('', () => { expect(isoddtest_ok_2.value).toBe(false) })
    it('', () => { expect(isoddtest_ok_3.value).toBe(false) })
    it('{:a 1 :b 2}', () => { expect(isoddtest_ok_4.value).toBe(false) })
    it('isodd', () => { expect(isoddtest_ok_5.value).toBe(false) })
})
