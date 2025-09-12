import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isnil } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isniltest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(1))

const isniltest_ok_zero: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(0))

const isniltest_ok_0even: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(2))

const isniltest_ok_0meven: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(-2))

const isniltest_ok_0modd: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(-1))

const isniltest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim('1/2'))

const isniltest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(-1))

const isniltest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim('-1/2'))

const isniltest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim("string"))

const isniltest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putPrim(false))

const isniltest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isniltest_ok_empty: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putVec([] as const))
// (foxp.putVec(foxp.ro([] as const)))

const isniltest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isniltest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isnil
()
(foxp.putFn1<pre.bi.isnil, 'nil?'>()(isnil))

const isniltest_ok_undefined: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isnil
()
// [todo] should define put* even for undefined/null
(foxp.putNil(undefined))

const isniltest_ok_null: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isnil
()
// [todo] should define put* even for undefined/null
(foxp.putNil(null))


describe('add', () => {
    it('', () => { expect(isniltest_ok_0.value).toBe(false) })
    it('', () => { expect(isniltest_ok_zero.value).toBe(false) })
    it('', () => { expect(isniltest_ok_0even.value).toBe(false) })
    it('', () => { expect(isniltest_ok_0meven.value).toBe(false) })
    it('', () => { expect(isniltest_ok_0modd.value).toBe(false) })
    it('', () => { expect(isniltest_ok_01.value).toBe(false) })
    it('', () => { expect(isniltest_ok_0x.value).toBe(false) })
    it('', () => { expect(isniltest_ok_01x.value).toBe(false) })
    it('', () => { expect(isniltest_ok_1.value).toBe(false) })
    it('', () => { expect(isniltest_ok_2.value).toBe(false) })
    it('', () => { expect(isniltest_ok_3.value).toBe(false) })
    it('', () => { expect(isniltest_ok_4.value).toBe(false) })
    it('', () => { expect(isniltest_ok_5.value).toBe(false) })
    it('', () => { expect(isniltest_ok_undefined.value).toBe(true) })
    it('', () => { expect(isniltest_ok_null.value).toBe(true) })
})
