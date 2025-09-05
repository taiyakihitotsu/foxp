import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { isempty } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const isemptytest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(1))

const isemptytest_ok_zero: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(0))

const isemptytest_ok_0even: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(2))

const isemptytest_ok_0meven: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(-2))

const isemptytest_ok_0modd: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(-1))


// [todo] fix cion
const isemptytest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim('1/2'))

const isemptytest_ok_0x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(-1))


// [todo] fix cion
const isemptytest_ok_01x: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim('-1/2'))

// [todo] fix cion
const isemptytest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim("string"))

const isemptytest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putPrim(true))

const isemptytest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const isemptytest_ok_empty: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putVec([] as const))

const isemptytest_ok_empty1: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putVec(foxp.ro([] as const)))
// [todo] fix ro
// (foxp.putVec(foxp.ro([] as const)))

const isemptytest_ok_4: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const isemptytest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    isempty
()
// [todo] preliminary
(foxp.putFn1<pre.bi.isempty, 'int?'>()(isempty))

describe('add', () => {
    it('', () => { expect(isemptytest_ok_0.value).toBe(false) })
    it('0', () => { expect(isemptytest_ok_zero.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_0even.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_0meven.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_0modd.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_01.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_0x.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_01x.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_1.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_2.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_3.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_4.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_5.value).toBe(false) })
    it('', () => { expect(isemptytest_ok_empty.value).toBe(true) })
    it('', () => { expect(isemptytest_ok_empty1.value).toBe(true) })

})
