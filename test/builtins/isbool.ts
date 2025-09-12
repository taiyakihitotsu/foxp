import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isbool } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isbooltest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(1))

const isbooltest_ok_zero: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(0))

const isbooltest_ok_0even: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(2))

const isbooltest_ok_0meven: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(-2))

const isbooltest_ok_0modd: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(-1))

const isbooltest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim('1/2'))

const isbooltest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(-1))

const isbooltest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim('-1/2'))

const isbooltest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim("string"))

const isbooltest_ok_2: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(true))

const isbooltest_ok_2_false: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putPrim(false))

const isbooltest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isbooltest_ok_empty: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putVec([] as const))
// (foxp.putVec(foxp.ro([] as const)))

const isbooltest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isbooltest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
(foxp.putFn1<pre.bi.isbool, 'boolean?'>()(isbool))

const isbooltest_ok_undefined: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
// [todo] should define put* even for undefined/null
(foxp.putNil(undefined))

const isbooltest_ok_null: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isbool
()
// [todo] should define put* even for undefined/null
(foxp.putNil(null))


describe('boolean?', () => {
    it('', () => { expect(isbooltest_ok_0.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_zero.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_0even.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_0meven.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_0modd.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_01.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_0x.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_01x.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_1.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_2.value).toBe(true) })
    it('', () => { expect(isbooltest_ok_2_false.value).toBe(true) })
    it('', () => { expect(isbooltest_ok_3.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_4.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_5.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_undefined.value).toBe(false) })
    it('', () => { expect(isbooltest_ok_null.value).toBe(false) })
})
