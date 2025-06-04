import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { div } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'
type prediv = ['number?', 'number?']
type prestrict = ['number?', merge.MergePreStr<'number?', 'pos-int?'>]
type malpre = ['number?', 'string?']

// --test
const divtest0: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
   div
     <pre.div>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))



const divtest0_str: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
   div
     <'(fn [n] (and (number? (first n)) (number? (second n))))'>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const divtest0_hof = div<['number?', '']>()
const divtest0_hof_app =
  divtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const divtest0_hof_app_ok =
  divtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const divtest0b: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const divtest0b_strict: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
  div
    <prestrict>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const divtest0b_strict_failed: {
  [c.SexprKey]: '-3/2'
, [c.ValueKey]: number} =
  div
    <prestrict>
    ()
    ( foxp.putPrim(3)
// @ts-expect-error:
    , foxp.putPrim(-2))

try {
const divtest0b_strict_failed =
// div<pre.div>()( foxp.putPrim(3), foxp.putPrim(0))
  div
    <pre.div>
    ()
    ( foxp.putPrim(3)
// @ts-expect-error:
    , foxp.putPrim(0))
} catch {}

// @ts-expect-error:
const divtest0f_notmatch_sexpr: {
  [c.SexprKey]: '3/3'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const divtest1_pass: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    (div
      <prediv>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
      , foxp.putPrim(5))  


const divtest1fail_0_1_string: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    (div
       <malpre>
       ()
       (
       foxp.putPrim(3)
       // @ts-expect-error:
       , foxp.putPrim(2))
     , foxp.putPrim(5))

const divtest1fail_1_1_string: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
  div
    <malpre>
    ()
    (div
      <prediv>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
     // @ts-expect-error:
     , foxp.putPrim(5))

// @ts-expect-error:
const divtest1f_notmatch_sexpr: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   div
     <prediv>
     ()
     ((div
       <prediv>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(2)))
    , foxp.putPrim(4))

try {
const divtest1f_error_divbyzero: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   div
     <pre.div>
     ()
// @ts-expect-error:
     ((div
       <pre.div>
       ()
       (foxp.putPrim(3)
// @ts-expect-error:
       , foxp.putPrim(0)))
    , foxp.putPrim(4))
} catch {}

try {
const divtest1f_error_divbyzero2: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
   div
     <pre.div>
     ()
     ((div
       <pre.div>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(1)))
// @ts-expect-error:
    , foxp.putPrim(0))
} catch {}

describe('div', () => {
it('', () => { expect(divtest0.value).toBe(3/2) })
it('', () => { expect(divtest0b.value).toBe(3/2) })
it('', () => { expect(divtest0b_strict.value).toBe(3/2) })
it('', () => { expect(divtest1_pass.value).toBe(3/10) })
})
