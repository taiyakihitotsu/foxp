import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { issome } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const issometest_ok_0: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(1))

const issometest_ok_zero: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(0))

const issometest_ok_0even: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(2))

const issometest_ok_0meven: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(-2))

const issometest_ok_0modd: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(-1))


// [todo] fix cion
const issometest_ok_01: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim('1/2'))

const issometest_ok_0x: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(-1))


// [todo] fix cion
const issometest_ok_01x: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim('-1/2'))

// [todo] fix cion
const issometest_ok_1: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim("string"))

const issometest_ok_2: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putPrim(true))

const issometest_ok_3: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const issometest_ok_empty: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putVec([] as const))
// (foxp.putVec(foxp.ro([] as const)))

const issometest_ok_4: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const issometest_ok_5: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    issome
()
// [todo] preliminary
(foxp.putFn1<pre.bi.issome, 'int?'>()(issome))

const issometest_ok_undefined: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    issome
()
// [todo] should define put* even for undefined/null
(foxp.putNil(undefined))

const issometest_ok_null: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    issome
()
// [todo] should define put* even for undefined/null
(foxp.putNil(null))


describe('add', () => {
    it('', () => { expect(issometest_ok_0.value).toBe(true) })
    it('', () => { expect(issometest_ok_zero.value).toBe(true) })
    it('', () => { expect(issometest_ok_0even.value).toBe(true) })
    it('', () => { expect(issometest_ok_0meven.value).toBe(true) })
    it('', () => { expect(issometest_ok_0modd.value).toBe(true) })
    it('', () => { expect(issometest_ok_01.value).toBe(true) })
    it('', () => { expect(issometest_ok_0x.value).toBe(true) })
    it('', () => { expect(issometest_ok_01x.value).toBe(true) })
    it('', () => { expect(issometest_ok_1.value).toBe(true) })
    it('', () => { expect(issometest_ok_2.value).toBe(true) })
    it('', () => { expect(issometest_ok_3.value).toBe(true) })
    it('', () => { expect(issometest_ok_4.value).toBe(true) })
    it('', () => { expect(issometest_ok_5.value).toBe(true) })
    it('', () => { expect(issometest_ok_undefined.value).toBe(false) })
    it('', () => { expect(issometest_ok_null.value).toBe(false) })
})
