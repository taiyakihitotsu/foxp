import * as fr from '../src/fraction'
import * as math from 'mathjs'

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
const someFraction_test6 = fr.someFraction('string')
const someFraction_test7 = fr.someFraction('8/')
const someFraction_test8 = fr.someFraction('/8')
const someFraction_test9 = fr.someFraction('8//')
// const someFraction_test10: fr.someFraction('-/8')

// export const someFraction: (s: unknown) => number = (s) => typeof s === 'string' && math.isFraction(s) ? math.evaluate(s) : s

describe("evaluate", () => {
it('3/2',   () => { expect(someFraction_test0).toBe(math.evaluate('3/2')) })
it('2',     () => { expect(someFraction_test1).toBe(math.evaluate('2')) })
it('-2',    () => { expect(someFraction_test2).toBe(math.evaluate('-2')) })
it('-2/10', () => { expect(someFraction_test3).toBe(math.evaluate('-2/10')) })
it('0',     () => { expect(someFraction_test4).toBe(math.evaluate('0')) })
it('-2/+1', () => { expect(someFraction_test5).toBe(math.evaluate('-2/+1')) })
it('string',() => { expect(someFraction_test6).toBe('string') })
it('8/',    () => { expect(someFraction_test7).toBe('8/') })
it('/8',    () => { expect(someFraction_test8).toBe('/8') })
it('8//',   () => { expect(someFraction_test9).toBe('8//') })
})
