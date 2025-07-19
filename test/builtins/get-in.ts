import * as foxp from '../../src/foxp'
import { getIn } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'
import type Cion from '@taiyakihitotsu/cion'
import * as ut from '../../src/type-util'

// ---------
// -- map
// ---------

const map_getIntest0 =
    getIn
    <pre.bi.getIn>
    ()
  ( foxp.putRecord({a: 1, b: 2} as const)
  , foxp.putVec([':a'] as const))

const a = {a: 1, b: 2} as const

try {
const map_getIntest0_not_readonly =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putRecord({a: 1, b: 2})
// @ts-expect-error:
  , foxp.putVec(':a'))
} catch {}

try {
const map_getIntest0_out_of_bound =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putRecord({a: 1, b: 2} as const)
  , foxp.putVec([':c'] as const))
} catch {}

const v = [0,2] as const
const map_getIntest_nest0 =
    getIn
    <pre.bi.getIn>
    ()
  ( foxp.putRecord({a: v, b: 2} as const)
  , foxp.putVec([':a'] as const))

const x = foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const)).sexpr
const getintest0: Cion.Lisp<`(get-in [0 1 2] [0])`> = '0'
const getintest1: Cion.Lisp<`(get-in {:a [0 2] :b 2} [:a])`> = '[0 2]'
const getintest2: Cion.Lisp<`(get-in {:a [0 2] :b 2} [:a 0])`> = '0'

const map_getIntest_nest_with_ro =
    getIn
    <pre.bi.getIn>
    ()
  ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
  , foxp.putVec([':a'] as const))

const map_getIntest_nest_with_ro_leaf =
    getIn
    <pre.bi.getIn>
    ()
  ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
  , foxp.putVec([':a', 1] as const))

try {
const map_getIntest_nest_without_ro =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putRecord(foxp.ro({a: [0,2], b: 2}))
  , foxp.putVec([':a'] as const))
} catch {}

try {
const map_getIntest_nest_out_of_bound0 =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
  , foxp.putVec([':c'] as const))
} catch {}

const vec_getIntest_nest_with_ro_2 =
    getIn
    <pre.bi.getIn>
    ()
  ( foxp.putVec(foxp.ro([0, {a: [0,2], b: 2}] as const))
  , foxp.putVec([1, ':a'] as const))

const vec_getIntest_nest_with_ro_2_leaf =
    getIn
    <pre.bi.getIn>
    ()
  ( foxp.putVec(foxp.ro([0, {a: [0,2], b: 2}] as const))
  , foxp.putVec([1, ':a', 0] as const))

try {
const vec_getIntest_nest_without_ro =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putVec(foxp.ro({a: [0,2], b: 2}))
  , foxp.putVec([':a'] as const))
} catch {}

try {
const vec_getIntest_nest_out_of_bound0 =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putVec(foxp.ro([0, {a: [0,2], b: 2}] as const))
  , foxp.putVec([2] as const))
} catch {}

try {
const vec_getIntest_nest_out_of_bound1 =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putVec(foxp.ro([0, {a: [0,2], b: 2}] as const))
  , foxp.putVec([1, ':c'] as const))
} catch {}

try {
const vec_getIntest_nest_out_of_bound2 =
    getIn
    <pre.bi.getIn>
    ()
// @ts-expect-error:
  ( foxp.putVec(foxp.ro([0, {a: [0,2], b: 2}] as const))
  , foxp.putVec([1, ':a', 8] as const))
} catch {}

describe('getIn', () => {
it('', () => { expect(map_getIntest0.value).toBe(1) })
it('', () => { expect(map_getIntest_nest_with_ro.value).toEqual([0,2]) })
it('', () => { expect(map_getIntest0.value).toBe(1) })
it('', () => { expect(map_getIntest_nest_with_ro_leaf.value).toBe(2) })
it('', () => { expect(vec_getIntest_nest_with_ro_2.value).toEqual([0,2]) })
it('', () => { expect(vec_getIntest_nest_with_ro_2_leaf.value).toBe(0) })
})
