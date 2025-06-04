import * as foxp from '../../src/foxp'
import type Cion from '@taiyakihitotsu/cion'
import { describe, it, expect } from 'vitest'

type testpre = '(fn [n] (= 3 (count n)))'
const testvect0
  = foxp.putFn1<
    testpre
    , '(fn [n] n)'>
    ()
    ((n: unknown): unknown => n)
const testvect1 = foxp.putVec([1, 2, 3] as const)
const testvect1b = foxp.putVec([1,2,3,4] as const)
const testvect1c = foxp.putRecord({a: 5} as const)

// @ts-expect-error:
const testvecpre : Cion.Lisp<`(${testpre} {a: 5})`> = false

const testvect2
  = foxp.tap1(
      testvect0
      , testvect1)

const testvect2b
  = foxp.tap1(
      testvect0
// @ts-expect-error:
      , testvect1b)

const testvect2c
  = foxp.tap1(
      testvect0
// @ts-expect-error:
      , testvect1c)

describe("vect", () => {
  it("", () => { expect(testvect2.value).toEqual([1,2,3]) })
})
