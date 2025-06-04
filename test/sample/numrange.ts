import * as foxp from '../../src/foxp'
import { describe, it, expect } from 'vitest'

// test : num range
const testnumran0
  = foxp.putFn1<'(fn [n] (and (< n 10) (< 0 n)))', '(fn [n] (* n 4))'>()((n: number) => n * 4)

const testnumran1
  = foxp.tap1(
      testnumran0
      , foxp.putPrim(1))

const testnumran2
  = foxp.tap1(
      testnumran0
      , testnumran1 )

const testnumran3
  = foxp.tap1(
      testnumran0
// @ts-expect-error:
      , testnumran2 )

const testnumran4
  = foxp.tap1(
      testnumran0
// @ts-expect-error:
      , foxp.putPrim('test'))

describe("numrange", () => {
  it("", () => { expect(testnumran1.value).toBe(4) })
  it("", () => { expect(testnumran2.value).toBe(16) })
})
