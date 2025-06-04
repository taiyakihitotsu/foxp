import * as foxp from '../../src/foxp'
import * as util from '../../src/util'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'

const testlens0
  = foxp.putFn1<
    '(fn [n] (some? (get (first n) (second n))))'
    , '(fn [n] (assoc (first n) (second n) (get n 2)))'>
    ()
    (util.assoc)

const testlens1 = foxp.putVec([{a: 3, b: 4, c: 5}, ':a', 6] as const)
const testlens1b = foxp.putVec([{a: 3, b: 4, c: 5}, ':d', 6] as const)
const testlens10 = foxp.putVec([[1, 2, 3], '0', 5] as const)
const testlens10b = foxp.putVec([[1, 2, 3], '3', 5] as const)

const testlens2
  = foxp.tap1(
      testlens0
      , testlens1)

const testlens2b
  = foxp.tap1(
      testlens0
// @ts-expect-error:
      , testlens1b)
const testlens3
  = foxp.tap1(
      testlens0
      , testlens10)

const testlens3b
  = foxp.tap1(
      testlens0
// @ts-expect-error:
      , testlens10b)

describe("lens", () => {
  it("map", () => { expect(testlens2.value).toEqual({a: 6, b: 4, c:5})})
  it("vec", () => { expect(testlens3.value).toEqual([5,2,3])})
})

