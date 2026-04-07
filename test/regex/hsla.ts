import { foxp } from "../../src/index"
import { matchStrict, hslaRegex } from "../../src/regex" // [todo] export via foxp index

import { describe, it, expect } from 'vitest'

// ------------------------
// -- Lint
// ------------------------
 
const noSpace = 'hsla(100%,100%,100%,0.4)'
const last_NoSpace_ok = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(noSpace))

const oneSpace = 'hsla( 100%,100%,100%,0.4)'
const last_OneSpace_ok = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(oneSpace))

const twoSpace = 'hsla( 100%,100%,100%,0.4  )'
const Last_TwoSpace_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(twoSpace))

const eachSpace = 'hsla(100%, 100%, 100%, 0.4)'
const eachSpace_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(eachSpace))

const not_commaPoint = 'hsla(100%, 100%, 100%, 0,4)'
const not_commaPoint_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(not_commaPoint))

// ------------------------
// -- Range
// ------------------------

const over100P = 'hsla(101%, 100%, 100%, 0.4)'
const over100P_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(over100P))

const over1P_2 = 'hsla(100%, 100%, 100%, 2)'
const over1P_2_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(over1P_2))

const over1P_1_1 = 'hsla(100%, 100%, 100%, 1.1)'
const over1P_1_1_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(over1P_1_1))

const in0to1 = 'hsla(100%, 100%, 100%, 0.81)'
const in0to1_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(in0to1))

const in0to1_3digits = 'hsla(100%, 100%, 100%, 0.811)'
const in0to1_3digits_ok = matchStrict(
  foxp.putPrim(hslaRegex)
, foxp.putPrim(in0to1_3digits))

const in0to1_4digits = 'hsla(100%, 100%, 100%, 0.8114)'
const in0to1_4digits_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(in0to1_4digits))

const opacity_0 = 'hsla(100%, 100%, 100%, 0)'
const opacity_0_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(opacity_0))

const opacity_1 = 'hsla(100%, 100%, 100%, 1)'
const opacity_1_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(opacity_1))
    
// --------------------------
// -- Arguments Number
// --------------------------

const zeroNum = 'hsla()'
// const  = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim())
const zeroNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(zeroNum))

const oneNum = 'hsla(100%)'
const oneNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(oneNum))

const twoNum = 'hsla(100%, 100%)'
const twoNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(twoNum))

const threeNum = 'hsla(100%, 100%, 100%)'
const threeNum_err = matchStrict(
  // @ts-expect-error:
  foxp
    .putPrim(hslaRegex)
, foxp.putPrim(threeNum))

const fourNum_x = 'hsla(100%, 91%, 89%, 0.99)'
const fourNum_x_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(fourNum_x))

const fourNum_y = 'hsla(3%, 1%, 2%, 0.99)'
const fourNum_y_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(fourNum_y))

const fourNum_z = 'hsla(3%, 47%, 2%, 0.99)'
const fourNum_z_ok = matchStrict(foxp.putPrim(hslaRegex), foxp.putPrim(fourNum_z))

describe("regex: hsla", () => {
  it(`ok: ${eachSpace}`, () => { expect(eachSpace_ok.value).toBe(eachSpace) })
  it(`ok: ${in0to1}`, () => { expect(in0to1_ok.value).toBe(in0to1) })
  it(`ok: ${opacity_0}`, () => { expect(opacity_0_ok.value).toBe(opacity_0) })
  it(`ok: ${opacity_1}`, () => { expect(opacity_1_ok.value).toBe(opacity_1) })
  it(`ok: ${in0to1_3digits}`, () => { expect(in0to1_3digits_ok.value).toBe(in0to1_3digits) })
  it(`ok: ${fourNum_x}`, () => { expect(fourNum_x_ok.value).toBe(fourNum_x) })
  it(`ok: ${fourNum_y}`, () => { expect(fourNum_y_ok.value).toBe(fourNum_y) })
  it(`ok: ${fourNum_z}`, () => { expect(fourNum_z_ok.value).toBe(fourNum_z) })
  it(`ok: ${fourNum_z}`, () => { expect(fourNum_z_ok.value).toBe(fourNum_z) })
})
