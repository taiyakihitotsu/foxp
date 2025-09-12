import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { ismap } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

const ismaptest_ok_0: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putPrim(1))

const ismaptest_ok_01: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putPrim('1/2'))

const ismaptest_ok_1: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putPrim("string"))

const ismaptest_ok_2: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putPrim(true))

const ismaptest_ok_3: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putVec(foxp.ro([1,2,3] as const)))

const ismaptest_ok_4: {
    [c.SexprKey]: 'true'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putRecord(foxp.ro({a: 1, b: 2} as const)))

const ismaptest_ok_5: {
    [c.SexprKey]: 'false'
    , [c.ValueKey]: boolean } = 
    ismap
()
(foxp.putFn1<pre.bi.ismap, 'map?'>()(ismap))

describe('add', () => {
    it('', () => { expect(ismaptest_ok_0.value).toBe(false) })
    it('', () => { expect(ismaptest_ok_01.value).toBe(false) })
    it('', () => { expect(ismaptest_ok_1.value).toBe(false) })
    it('', () => { expect(ismaptest_ok_2.value).toBe(false) })
    it('', () => { expect(ismaptest_ok_3.value).toBe(false) })
    it('', () => { expect(ismaptest_ok_4.value).toBe(true) })
    it('ismap', () => { expect(ismaptest_ok_5.value).toBe(false) })
})
