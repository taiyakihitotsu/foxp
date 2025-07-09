import * as foxp from '../../src/foxp'
import { get } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'
import type Cion from '@taiyakihitotsu/cion'
import * as ut from '../../src/type-util'

// ---------
// -- map
// ---------

const map_gettest0 =
    get
    <pre.bi.get>
    ()
  ( foxp.putRecord({a: 1, b: 2} as const)
  , foxp.putPrim(':a'))

const a = {a: 1, b: 2} as const
const map_gettest0_arg_readonly =
    get
    <pre.bi.get>
    ()
  ( foxp.putRecord(a)
  , foxp.putPrim(':a'))

const map_gettest0_not_readonly =
    get
    <pre.bi.get>
    ()
// @ts-expect-error:
  ( foxp.putRecord({a: 1, b: 2})
  , foxp.putPrim(':a'))

const vec_gettest0_readonly =
    get
    <pre.bi.get>
    ()
  ( foxp.putVec([0,2,4] as const)
  , foxp.putPrim(0))

const vec_gettest0_not_readonly =
    get
    <pre.bi.get>
    ()
// @ts-expect-error:
  ( foxp.putVec([0,2,4])
  , foxp.putPrim(0))

describe('get', () => {
it('', () => { expect(map_gettest0.value).toBe(1) })
it('', () => { expect(map_gettest0_arg_readonly.value).toBe(1) })
it('', () => { expect(vec_gettest0_readonly.value).toBe(0) })
})
