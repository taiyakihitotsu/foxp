import * as foxp from '../../src/index'
import * as pre  from '../../src/pre'
import * as c    from '../../src/const'
import * as ut   from '../../src/type-util'
import * as m from '../../src/merge'
import type Cion from '@taiyakihitotsu/cion'
import { describe, it, expect } from 'vitest'



const hof = foxp.bi.hof
const add = foxp.bi.add
const sub = foxp.bi.sub
const runHof = foxp.bi.runHof



// ----------------------
// -- simple pattern
// ----------------------
const define_hof =
  hof<'m', 'pos-int?'>(1)(
     (m:number) => (
      hof<'n', 'number?'>(1)(
        (n: number) =>
          (add()(foxp.putSym('n', n), foxp.putSym('m', m))))))

const hof_result0 = define_hof

// [note]
// we should pick this as a whole sexpr of higher-order-function.
const hof_result0_sexpr: ut.Equal<typeof hof_result0[c.SexprKey], '(fn [m] (fn [n] (+ n m)))'> = true

// [note]
// This picks the deepest lambda.
const hof_result0_cont: ut.Equal<typeof hof_result0[c.ContKey], '(if (and (every? some? [n m]) ((fn [x y] (and (number? x) (number? y))) n m)) (+ n m) nil)'> = true
const hof_result0_hofflag: ut.Equal<true, typeof hof_result0[c.HofFlag]> = true
const hof_result0_value_pre: ut.Equal<typeof hof_result0[c.ValueKey][c.PreKey], 'pos-int?'> = true
const hof_result0_value_fn: typeof hof_result0[c.ValueKey][c.FnKey] = hof_result0.value.fn

// the last of curry.
const hof_result1 = hof_result0_value_fn(foxp.putPrim(2))
const hof_result1_fail = hof_result0_value_fn(
// @ts-expect-error:
  foxp.putPrim(-2))
// [todo] true if it's the deepest lambda.
const _hof_result1_data: typeof hof_result1 = hof_result1
const _hof_result1_env:  ut.Equal<typeof hof_result1['env'], "m 2"> = true
const hof_result1_sexpr: ut.Equal<typeof _hof_result1_data[c.SexprKey], "(fn [n] (+ n m))"> = true

// [note]
// This picks the deepest lambda.
const hof_result1_cont: ut.Equal<typeof _hof_result1_data[c.ContKey], '(if (and (every? some? [n m]) ((fn [x y] (and (number? x) (number? y))) n m)) (+ n m) nil)'> = true
const hof_result1_value_pre: ut.Equal<typeof _hof_result1_data[c.ValueKey][c.PreKey], 'number?'> = true
const hof_result1_value_fn: typeof _hof_result1_data[c.ValueKey][c.FnKey] = hof_result1.value.fn
const hof_result1_hofflag: ut.Equal<true, typeof hof_result1[c.HofFlag]> = true

const fin = hof_result1_value_fn(foxp.putPrim(1))
const fin_env: ut.Equal<typeof fin['env'], 'n 1'> = true
const fin_hof: typeof fin[c.HofFlag] = false
const fin_fail = hof_result1_value_fn(
// @ts-expect-error:
  foxp.putPrim('asb'))



// const define_hof2 =
//   hof<'o', 'neg-int?'>(1)(
//     (o: number) =>
//       hof<'m', 'pos-int?'>(1)(
//         (m:number) => (
//           hof<'n', 'number?'>(1)(
//             (n: number) =>
//               (sub()(foxp.putSym('o', o), add<m.MergeTuple<[pre.Grater<5>, pre.Grater<9>]>>()(foxp.putSym('n', n), foxp.putSym('m', m))))))))

const define_hof2 =
  hof<'o', 'neg-int?'>(1)(
    (o: number) =>
      hof<'m', 'pos-int?'>(1)(
        (m:number) => (
          hof<'n', 'number?'>(1)(
            (n: number) =>
              (sub()(foxp.putSym('o', o), add()(foxp.putSym('n', n), foxp.putSym('m', m))))))))

const define_hof2_value_fn = define_hof2[c.ValueKey][c.FnKey]

// const addtest = lambda<'m', 'number?'>(1)
const addtest = ((m: number) => add()(foxp.putPrim(1), foxp.putSym('m', m)))(2)
const addtest_sexpr: ut.Equal<(typeof addtest)['sexpr'], '(+ 1 m)'> = true
const addtest_sexpr_s: (typeof addtest)['sexpr'] = '(+ 1 m)'
const addtest_fnflag: ut.Equal<(typeof addtest)['fnflag'], true> = true
const addtest_value: ut.Equal<number, (typeof addtest)['value']> = true
const addtest_pre_s: (typeof addtest)['cont'] = '(if (and (every? some? [1 m]) ((fn [x y] (and (number? x) (number? y))) 1 m)) (+ 1 m) nil)'
const addtest_pre: ut.Equal<(typeof addtest)['cont'], typeof addtest_pre_s> = true

const subtest = ((m: number) => sub()(foxp.putPrim(1), add()(foxp.putPrim(1), foxp.putSym('m', m))))(2)
const subtest_sexpr: ut.Equal<(typeof subtest)['sexpr'], '(- 1 (+ 1 m))'> = true
const subtest_fnflag: ut.Equal<(typeof subtest)['fnflag'], true> = true
const subtest_value: ut.Equal<number, (typeof subtest)['value']> = true

const subtest_pre_s: (typeof subtest)['cont'] = '(if (and (every? some? [1 (+ 1 m)]) ((fn [x y] (and (number? x) (number? y))) 1 (if (and (every? some? [1 m]) ((fn [x y] (and (number? x) (number? y))) 1 m)) (+ 1 m) nil))) (- 1 (+ 1 m)) nil)'
const subtest_pre: ut.Equal<(typeof subtest)['cont'], typeof subtest_pre_s> = true

const addmerge = add<foxp.pre.MergeTuple<[pre.Grater<5>, pre.Grater<9>]>>()(foxp.putPrim(6), foxp.putPrim(20))

const define_hof2_return_no =
   define_hof2
     .value
     .fn
// @ts-expect-error:
     (foxp.putPrim(0))

const define_hof2_return0_ok =
  define_hof2
    .value
    .fn
    (foxp.putPrim(-1))

const define_hof2_return1_no_str =
  define_hof2_return0_ok
    .value
    .fn
// @ts-expect-error:
    (foxp.putPrim('str'))

const define_hof2_return1_no =
  define_hof2_return0_ok
    .value
    .fn
// @ts-expect-error:
    (foxp.putPrim(-4))

const define_hof2_return1_ok =
  define_hof2_return0_ok
    .value
    .fn
    (foxp.putPrim(4))

const define_hof2_return2_no_str =
  define_hof2_return1_ok
    .value
    .fn
// @ts-expect-error
    (foxp.putPrim('str'))

const define_hof2_return2_ok =
  define_hof2_return1_ok
    .value
    .fn
    (foxp.putPrim(4))

const final_hof2_result2_ok = define_hof2_return2_ok.value



// -------------------
// -- runHof Engine
// -------------------
const runHof0_r0 = runHof()(hof_result0_value_fn(foxp.putPrim(2)))
const runHof0_r1 = runHof0_r0(hof_result1_value_fn(foxp.putPrim(1)))

const runHof1_r0 = runHof()(define_hof2_value_fn(foxp.putPrim(-1)))
const runHof1_r0_no = runHof()(define_hof2_value_fn(
// @ts-expect-error:
  foxp.putPrim(1)))



// --------------
// -- runHof 3
// --------------

const define_hof3 =
  hof<'o', foxp.pre.NegInt>(1)(
    (o: number) =>
      hof<'m', foxp.pre.PosInt>(1)(
        (m:number) => (
          hof<'n', foxp.pre.Num>(1)(
            (n: number) =>
              ( sub
                  ()
                  (foxp.putSym('o', o)
                , add
                    <foxp.pre.MergeTuple<[pre.Grater<5>, pre.Grater<9>]>>
                    ()
                    ( foxp.putSym('m', m)
                    , foxp.putSym('n', n))))))))

const runHof2_value_r0 = define_hof3.value.fn(foxp.putPrim(-1))
const runHof2_value_r1 = runHof2_value_r0.value.fn(foxp.putPrim(6))
const runHof2_value_r2 = runHof2_value_r1.value.fn(foxp.putPrim(10))

const runHof2_engine   = runHof()
const runHof2_engine_r0 = runHof2_engine(runHof2_value_r0)
const runHof2_engine_r1 = runHof2_engine_r0(runHof2_value_r1)
const runHof2_engine_r2 = runHof2_engine_r1(runHof2_value_r2)



// [note]
// legacy test of `runHof2_engine_r2`.
const __tset: Cion.Lisp<`(let [o -1 m 6 n 10] (if (and (every? some? [o (+ m n)]) ((fn [x y] (and (number? x) (number? y))) o (if (and (every? some? [m n]) ((fn [a b] (and ((fn [n] (< 5 n)) a) ((fn [n] (< 9 n)) b))) m n)) (+ m n) nil))) (- o (+ m n)) nil))`> = '-17'
const __tste0: Cion.Lisp<`(let [o -1 m 6 n 10] (if (and (every? some? [m n]) ((fn [a b] (and ((fn [n] (< 5 n)) a) ((fn [n] (< 9 n)) b))) m n)) (+ m n) nil))`> = '16'
const __tste1: Cion.Lisp<`(let [o -1 m 6 n 10] (if (and (every? some? [o (+ m n)]) ((fn [x y] (and (number? x) (number? y))) o 16)) (- o (+ m n)) nil))`> = '-17'
const __tsfet: Cion.Lisp<`(let [o -1 m 6 n 10] (if (and (every? some? [o (+ m n)]) ((fn [x y] (and (number? x) (number? y))) o (if 1 1 1))) (- o (+ m n)) nil))`> = '-17'

const __tsfess: Cion.Lisp<`(if 1 1 1)`> = '1'
const __tsfess1: Cion.Lisp<`(and true (if 1 1 1))`> = 'true'
const __tsfess2: Cion.Lisp<`(and true 1)`> = 'true'
const __jkxead: Cion.Lisp<`((fn [x y] (and (number? x) (number? y))) 1 (if 1 1 1))`> = 'true'



describe('hof', () => {
it('hof1', () => { expect(fin.value).toBe(3) })
it('hof2', () => { expect(final_hof2_result2_ok).toBe(-9) })

it('runHof0_r1', () => { expect(runHof0_r1.value).toBe(3) })
it('runHof0_r1', () => { expect(final_hof2_result2_ok).toBe(-9) })

it('(- o (+ m n))', () => { expect(runHof2_engine_r2.value).toBe(-17) })
})
