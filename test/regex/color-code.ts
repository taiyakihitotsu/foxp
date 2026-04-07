import { foxp } from "../../src/index"
import { matchStrict, colorCode } from "../../src/regex" // [todo] export via foxp index

import { describe, it, expect } from 'vitest'

// ------------------------
// -- Lint
// ------------------------
 
const noSpace = '#008fef'
const last_NoSpace_ok = matchStrict(foxp.putPrim(colorCode), foxp.putPrim(noSpace))

const fist_OneSpace = ' #008fef'
const fist_OneSpace_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(colorCode)
, foxp.putPrim(fist_OneSpace))

const last_OneSpace = '#008fef '
const last_OneSpace_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(colorCode)
, foxp.putPrim(last_OneSpace))

const mixed_Upper_Lower = '#008fEf'
const mixed_Upper_Lower_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(colorCode)
, foxp.putPrim(mixed_Upper_Lower))

// ------------------------
// -- Range
// ------------------------

const out_of_range = '#008fgf'
const out_of_range_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(colorCode)
, foxp.putPrim(out_of_range))

// ------------------------
// -- Number of Code
// ------------------------

const three_digit = "#000"
const three_digit_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(colorCode)
, foxp.putPrim(three_digit))

const lack_of_digit = "#00000"
const lack_of_digit_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(colorCode)
, foxp.putPrim(lack_of_digit))

describe("regex: color code", () => {
  it(`ok: ${noSpace}`, () => { expect(last_NoSpace_ok.value).toBe(noSpace) })
})
