import { foxp } from "../../src/index"
import { matchStrict, rgbaRegex } from "../../src/regex" // [todo] export via foxp index

import { describe, it, expect } from 'vitest'

// ------------------------
// -- Lint
// ------------------------

const noSpace_err = 'rgba(128,42,53)'
const last_NoSpace_ok = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(noSpace_err))

const oneSpace_err = 'rgba( 128,42,53 )'
const last_OneSpace_ok = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(noSpace_err))

const twoSpace_err = 'rgba( 128,42,53  )'
const Last_TwoSpace_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(twoSpace_err))

// --------------------------
// -- Arguments Number
// --------------------------

const zeroNum = 'rgba()'
// const  = matchStrict(foxp.putPrim(rgbaRegex), foxp.putPrim())
const zeroNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(zeroNum))

const oneNum = 'rgba(128)'
const oneNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(oneNum))

const twoNum = 'rgba(128, 128)'
const twoNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(twoNum))

const threeNum = 'rgba(128, 128, 128)'
const threeNum_ok = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(threeNum))

const fourNum = 'rgba(128, 128, 128, 0)'
const fourNum_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(fourNum))

const fourNum_1 = 'rgba(128, 128, 128, 1)'
const fourNum_1_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(fourNum_1))

const fourNum_2 = 'rgba(128, 128, 128, 2)'
const fourNum_2_ok = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(fourNum_2))

// --------------------------
// -- Numeric Range
// --------------------------

const range_color_points_1 = 'rgba(128.1, 128, 128, 0)'
const range_color_points_1_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(range_color_points_1)
)

const range_color_points_2 = 'rgba(128.11, 128, 128, 0)'
const range_color_points_2_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(range_color_points_2)
)

const range_color_points_3 = 'rgba(128.111, 128, 128, 0)'
const range_color_points_3_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(range_color_points_3)
)

const range_color_points_4 = 'rgba(128.1111, 128, 128, 0)'
const range_color_points_4_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(range_color_points_4)
)

const range_opacity_points_1 = 'rgba(128, 128, 128, 0.1)'
const range_opacity_points_1_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(range_opacity_points_1)
)

const range_opacity_points_2 = 'rgba(128, 128, 128, 0.11)'
const range_opacity_points_2_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(range_opacity_points_2)
)

const range_opacity_points_3 = 'rgba(128, 128, 128, 0.111)'
const range_opacity_points_3_ok = matchStrict(
  foxp.putPrim(rgbaRegex)
, foxp.putPrim(range_opacity_points_3)
)

const range_opacity_points_4 = 'rgba(128, 128, 128, 0.1111)'
const range_opacity_points_4_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(rgbaRegex)
, foxp.putPrim(range_opacity_points_4)
)

describe("regex: rgba", () => {
  it('rgba(128, 128, 128, 0)', () => { expect(fourNum_ok.value).toBe(fourNum) })
  it('rgba(128, 128, 128, 1)', () => { expect(fourNum_1_ok.value).toBe(fourNum_1) })
  it('rgba(128.1, 128, 128, 0)', () => { expect(range_color_points_1_ok.value).toBe(range_color_points_1) })
  it('rgba(128.11, 128, 128, 0)', () => { expect(range_color_points_2_ok.value).toBe(range_color_points_2) })
  it('rgba(128.111, 128, 128, 0)', () => { expect(range_color_points_3_ok.value).toBe(range_color_points_3) })
  it('rgba(128, 128, 128, 0.1)', () => { expect(range_opacity_points_1_ok.value).toBe(range_opacity_points_1) })
  it('rgba(128, 128, 128, 0.11)', () => { expect(range_opacity_points_2_ok.value).toBe(range_opacity_points_2) })
  it('rgba(128, 128, 128, 0.111)', () => { expect(range_opacity_points_3_ok.value).toBe(range_opacity_points_3) })
})
