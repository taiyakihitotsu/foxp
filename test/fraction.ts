import * as fr from '../src/fraction'

import { describe, it, expect } from 'vitest'

const isRational_test0:  fr.isRational<'3/2'> = true
const isRational_test1:  fr.isRational<'2'> = true
const isRational_test2:  fr.isRational<'-2'> = true
const isRational_test3:  fr.isRational<'-2/10'> = true
const isRational_test4:  fr.isRational<'0'> = true
const isRational_test5:  fr.isRational<'-2/+1'> = true
const isRational_test6:  fr.isRational<'string'> = false
const isRational_test7:  fr.isRational<'8/'> = false
const isRational_test8:  fr.isRational<'/8'> = false
const isRational_test9:  fr.isRational<'8//'> = false
const isRational_test10: fr.isRational<'-/8'> = false

const someFraction_test0 = fr.someFraction('3/2')
const someFraction_test1 = fr.someFraction('2')
const someFraction_test2 = fr.someFraction('-2')
const someFraction_test3 = fr.someFraction('-2/10')
const someFraction_test4 = fr.someFraction('0')
const someFraction_test5 = fr.someFraction('-2/+1')
const someFraction_test6 =
  // @ts-expect-error:
  fr.someFraction('string')
const someFraction_test7 =
  // @ts-expect-error:
  fr.someFraction('8/')
const someFraction_test8 =
  // @ts-expect-error:
  fr.someFraction('/8')
const someFraction_test9 =
  // @ts-expect-error:
  fr.someFraction('8//')
const someFraction_test10 =
  // @ts-expect-error:
  fr.someFraction('-/8')
const someFraction_test11 =
  // @ts-expect-error:
  fr.someFraction('')

describe("evaluate", () => {
it('3/2',   () => { expect(someFraction_test0).toBe(1.5) })
it('2',     () => { expect(someFraction_test1).toBe(2) })
it('-2',    () => { expect(someFraction_test2).toBe(-2) })
it('-2/10', () => { expect(someFraction_test3).toBe(-0.2) })
it('0',     () => { expect(someFraction_test4).toBe(0) })
it('-2/+1', () => { expect(someFraction_test5).toBe(-2) })
})

describe("evalute (abnormal cases)", () => {
it('string',() => { expect(someFraction_test6).toBe('string') })
it('8/',    () => { expect(someFraction_test7).toBe('8/') })
it('/8',    () => { expect(someFraction_test8).toBe('/8') })
it('8//',   () => { expect(someFraction_test9).toBe('8//') })
it('-/8',   () => { expect(someFraction_test10).toBe('-/8') })
it('',   () => { expect(someFraction_test11).toBe('') })
})

describe("boundary", () => {
  it('max small int', () => {
    expect(fr.someFraction('32767')).toBe(32767)
  })
  it('min small int', () => {
    expect(fr.someFraction('-32768')).toBe(-32768)
  })
  it('one over max', () => {
    expect(fr.someFraction('1/32767')).toBeCloseTo(1/32767)
  })
  it('negative fraction edge', () => {
    expect(fr.someFraction('-1/1')).toBe(-1)
  })
})

describe("equivalence forms", () => {
  it('reduces fraction', () => {
    expect(fr.someFraction('2/4')).toBe(0.5)
  })
  it('negative normalization', () => {
    expect(fr.someFraction('-2/4')).toBe(-0.5)
  })
  it('double negative style', () => {
    expect(fr.someFraction('-2/-4')).toBe(0.5)
  })
  it('already reduced', () => {
    expect(fr.someFraction('5/3')).toBe(5/3)
  })
})

describe("malformed stress", () => {
  it('spaces', () => {
    expect(fr.someFraction(
      // @ts-expect-error:
      ' 3/2 '
      )).toBe(' 3/2 ')
  })

  it('multiple slashes', () => {
    expect(fr.someFraction(
      // @ts-expect-error:
      '1/2/3'
      )).toBe('1/2/3')
  })

  it('just minus', () => {
    expect(fr.someFraction(
      // @ts-expect-error:
      '-'
      )).toBe('-')
  })

  it('empty-ish whitespace', () => {
    expect(fr.someFraction(
      // @ts-expect-error:
      '   '
      )).toBe('   ')
  })
})

describe("randomized consistency", () => {
  const randInt = () => Math.floor(Math.random() * 1000 - 500)

  it('random fractions match', () => {
    for (let i = 0; i < 200; i++) {
      const n = randInt()
      const d = randInt() || 1

      const input = `${n}/${d}`

      const got = fr.someFraction(
        // @ts-expect-error:
        input)
      const expected = n/d

      expect(got).toBeCloseTo(expected)
    }
  })
})

describe("canonical behavior", () => {
  it('same value different forms', () => {
    expect(fr.someFraction('2/4')).toBe(fr.someFraction('1/2'))
  })

  it('zero normalization', () => {
    expect(fr.someFraction('0/10')).toBe(0)
  })

  it('negative zero stability', () => {
    expect(fr.someFraction('-0/10')).toBe(0)
  })
})

describe("type-level safety", () => {
  it('invalid strings are compile-time rejected', () => {
    // @ts-expect-error
    fr.someFraction('abc')

    // @ts-expect-error
    fr.someFraction('1//2')

    // @ts-expect-error
    fr.someFraction('1/')

    expect(true).toBe(true)
  })
})
