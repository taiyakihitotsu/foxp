import { lambda, lambdaWrap, add, sub, fn } from '../../src/builtins'
import * as foxp from '../../src/foxp'
import * as pre  from '../../src/pre'
import * as c    from '../../src/const'
import { describe, it, expect } from 'vitest'

type yposint = `(fn [x y] (pos-int? y))`

//
// -- normal
//
const lambda_a = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const a_success0 = lambda_a()(foxp.putPrim(1))
const a_failure0
 = lambda_a
     ()
// @ts-expect-error
     (foxp.putPrim(-1))

// 
// -- pass through pattern
//
const lambda_c = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const d_success2 = lambda<'n', 'number?'>(1)((n:number) => lambda_c()(foxp.putSym('n', n)))
const d_success3 = d_success2()(foxp.putPrim(1))
const d_failure0
 = d_success2
     ()
// @ts-expect-error:
     (foxp.putPrim(-1))

//
// -- pass through pattern 2
//
const e_success3 = lambda<'m', 'pos-int?'>(1)((m:number) => lambda_c()(foxp.putSym('m', m)))
const e_success4 = lambda<'n', 'number?'>(1)((n:number) => e_success3()(foxp.putSym('n', n)))
const e_success5 = e_success4()(foxp.putPrim(1))
const e_failure5 = 
  e_success4
    ()
// @ts-expect-error:
    (foxp.putPrim('s'))
const e_failure6 = 
  e_success4
    ()
// @ts-expect-error:
    (foxp.putPrim(-1))





type StripGenerics<T> =
  T extends (...args: any[]) => infer R
    ? (...args: any[]) => StripGenerics<R>
    : T;

// 判定
type IsDoubleFunctionToString<T> =
  T extends (...args: any[]) => (...args:any[]) => unknown ? true : false;

declare const fn: <A, D, E>() => <X, Y, Z>() => unknown

type Test = IsDoubleFunctionToString<typeof fn>; // ✅ true






// hof by hand --- (1)

const ft =
  lambdaWrap<'m', 'pos-int?'>(1)((m:number) => (
    lambdaWrap<'n', 'number?'>(1)((n: number) =>
//      add()(foxp.putSym('n', n), foxp.putSym('m', m))))()())
      add()(foxp.putSym('n', n), foxp.putSym('m', m)))))

const ft_result0 = ft()(foxp.putPrim(1))

// todo
const ft_result0_debug: typeof ft_result0['debug'] = false

const ft_result0_isquote: typeof ft_result0[c.FnFlagKey] = false
const ft_result0_sexpr: typeof ft_result0[c.SexprKey] = '(fn [m] (fn [n] (+ n m)))'
const ft_result0_env: typeof ft_result0['env'] = 'm 1'
const ft_result0_leafflag: typeof ft_result0['leafflag']  = false
const ft_result0_cont: typeof ft_result0[c.ContKey] = ''
const ft_result0_value_pre: typeof ft_result0[c.ValueKey][c.PreKey] = 'pos-int?'

// the last of curry.
const ft_result1 = ft_result0.value.fn<'number?', typeof ft_result0_env>()(foxp.putPrim(2))

const ft_result1_isquote:  typeof ft_result1[c.FnFlagKey] = false
// [todo] true if it's the deepest lambda.
const ft_result1_leafflag: typeof ft_result1['leafflag']  = true
const ft_result1_sexpr: typeof ft_result1[c.SexprKey] = "(fn [n] (+ n m))"
// [todo] this is sym env.
const ft_result1_env: typeof ft_result1['env'] = 'm 1 n 2'
// [todo] to make let eat, via overwriting a precond, with exec fn.
const ft_result1_cxont: typeof ft_result1[c.ContKey] = '(and (number? n) (if (and (every? some? [n m]) ((fn [x y] (and (number? x) (number? y))) n m)) (+ n m) nil))'
const ft_result1_value_pre: typeof ft_result1[c.ValueKey][c.PreKey] = 'number?'

// final result, to test in vitest.
const ft_result2 = ft_result0.value.fn()(foxp.putPrim(2)).value.fn


// -- vitest

describe('hof', () => {
it('', () => { expect(a_success0.value).toBe(2) })
it('', () => { expect(d_success3.value).toBe(2) })
it('', () => { expect(e_success5.value).toBe(2) })
it('', () => { expect(ft_result2.value).toBe(3) })
})
