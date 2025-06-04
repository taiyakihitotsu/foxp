import * as foxp from '../src/foxp'
import { const as c } from '../src/const'
import * as ut from '../src/type-util'

// test
const test_lispwrapprim0: {[c.SexprKey]: '1', [c.ValueKey]: 1} = foxp.putPrim(1)
const test_lispwrapprim1: {[c.SexprKey]: 'true', [c.ValueKey]: true} = foxp.putPrim(true)
const test_lispwrapprim2: {[c.SexprKey]: `'teststr'`, [c.ValueKey]: 'teststr'} = foxp.putPrim('teststr')
const test_lispwrapmap0:  {[c.SexprKey]: '[0 1 2]', [c.ValueKey]: unknown} = foxp.putVec([0,1,2] as const)

// ----------
// -- put
// ----------
const testvec = foxp.putVec([0, 1, 2] as const)
const testvect: typeof testvec = {sexpr: '[0 1 2]', value: [0, 1, 2]}
const __readonlyv = [0, 1, 2] as const
// @ts-expect-error:
const testvec_f = foxp.putVec([0, 1, 2])
// @ts-expect-error:
const testvec_ft: typeof testvec_f = {sexpr: '[0 1 2]', value: [0, 1, 2]}
const testvec_ro = foxp.putVec(__readonlyv)
const testvec_rot: typeof testvec_ro = {sexpr: '[0 1 2]', value: [0, 1, 2]}
const testvec_rot_malv: typeof testvec_ro = {
  sexpr: '[0 1 2]'
, value: [ 0
         , 1
// @ts-expect-error:
         , 3]}
const testvec_empty = foxp.putVec([] as const)
const testvec_emptyt: typeof testvec_empty = {sexpr: '[]', value: []}
// @ts-expect-error:
const testvec_empty0 = foxp.putVec([])


const testrec = foxp.putRecord({x: 1, y: 2, z: 3} as const)
const testrec_empty = foxp.putRecord({} as const)
const testrecvec = foxp.putRecord({x: 1, y: 2, z: [0, 1, 2]} as const)
const testvecrec = foxp.putVec([0, 1, {x: 1, y: 2, z: [0, 1, 2]}] as const)

// ---------
// -- tid
// ---------
const valid0: '(fn [v] (number? (:x v)))' = '' as '(fn [v] (number? (:x v)))'
const valid1: '(fn [v] (string? (:y v)))' = '' as '(fn [v] (string? (:y v)))'
const valid2: '(fn [v] (number? (:z v)))' = '' as '(fn [v] (number? (:z v)))'

const valid_test0 = foxp.tid(valid0, testrec)
const valid_test1 = foxp.tid(valid2, foxp.tid(valid0, foxp.tid(valid0, testrec)))
// @ts-expect-error:
const valid_test2 = foxp.tid(valid2, foxp.tid(valid1, foxp.tid(valid0, testrec)))
