import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { iszero } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const iszerotest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(1))

const iszerotest_ok_zero: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(0))

const iszerotest_ok_0even: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(2))

const iszerotest_ok_0meven: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(-2))

const iszerotest_ok_0modd: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(-1))


// [todo] fix cion
const iszerotest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim('1/2'))

const iszerotest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(-1))


// [todo] fix cion
const iszerotest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim('-1/2'))

// [todo] fix cion
const iszerotest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim("string"))

const iszerotest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putPrim(true))

const iszerotest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const iszerotest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const iszerotest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    iszero
()
// [todo] preliminary
(foxp.putFn1<pre.bi.iszero, 'int?'>()(iszero))

describe('add', () => {
    it('', () => { expect(iszerotest_ok_0.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_zero.value).toBe(true) })
    it('', () => { expect(iszerotest_ok_0even.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_0meven.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_0modd.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_01.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_0x.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_01x.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_1.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_2.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_3.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_4.value).toBe(false) })
    it('', () => { expect(iszerotest_ok_5.value).toBe(false) })
})
