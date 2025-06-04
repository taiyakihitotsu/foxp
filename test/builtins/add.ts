import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { add } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'

type preadd = ['number?', 'number?']
type prestrict = ['number?', merge.MergePreStr<'number?', 'pos-int?'>]
type malpre = ['number?', 'string?']

// --test
const addtest0: {
  [c.SexprKey]: '2'
, [c.ValueKey]: number} =
   add
     <['number?', '']>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))


const addtest0_str: {
  [c.SexprKey]: '2'
, [c.ValueKey]: number} =
   add
     <'(fn [n] (and (number? (first n)) (number? (second n))))'>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))


const addtest0_hof = add<['number?', '']>()
const addtest0_hof_app =
  addtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const addtest0_hof_app_ok =
  addtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const addtest0b: {
  [c.SexprKey]: '2'
, [c.ValueKey]: number} =
  add
    <preadd>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))


const addtest0b_strict: {
  [c.SexprKey]: '2'
, [c.ValueKey]: number} =
  add
    <prestrict>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const addtest0b_strict_failed: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  add
    <prestrict>
    ()
    ( foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim(-1))

// @ts-expect-error:
const addtest0f_notmatch_sexpr: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
  add
    <preadd>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const addtest1_pass: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
  add
    <preadd>
    ()
    (add
      <preadd>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(1))
      , foxp.putPrim(3))  

const addtest1fail_0_1_string: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
  add
    <preadd>
    ()
    (add
       <malpre>
       ()
       (
       foxp.putPrim(1)
       // @ts-expect-error:
       , foxp.putPrim(1))
     , foxp.putPrim(3))

const addtest1fail_1_1_string: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
  add
    <malpre>
    ()
    (add
      <preadd>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(1))
     // @ts-expect-error:
     , foxp.putPrim(3))

// @ts-expect-error:
const addtest1f_notmatch_sexpr: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
   add
     <preadd>
     ()
     ((add
       <preadd>
       ()
       (foxp.putPrim(1)
       , foxp.putPrim(1)))
    , foxp.putPrim(3))

describe('add', () => {
it('', () => { expect(addtest0.value).toBe(2) })
it('', () => { expect(addtest0_str.value).toBe(2)})
it('', () => { expect(addtest0b.value).toBe(2)})
it('', () => { expect(addtest0b_strict.value).toBe(2)})
it('', () => { expect(addtest1_pass.value).toBe(5)})
})
