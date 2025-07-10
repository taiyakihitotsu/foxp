import { lambda, add, fn } from '../../src/builtins'
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
const a_success1
 = lambda_a
     ()
// @ts-expect-error
     (foxp.putPrim(-1))

// --------------------
// -- normal hof
// --------------------
// draft
const hlambda_a = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const ha = (n:number) => hlambda_a()(foxp.putSym('n', n))
const ha2 = lambda<'n', 'number?'>(1)(ha)
const hat = lambda<'n', 'number?'>(1)((n:number) => (
  { sexpr: 'inc'
  , cont: 'true' // 'number?'
  , fnflag: true
  , value:
    { fn: lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putSym('n', n), foxp.putSym('m', m)))
    , pre: 'number?'}} as const))

const hattt  = hat()
const hat_s  = hat()(foxp.putPrim(1)).value.value.fn
const hatss  = hat_s()(foxp.putPrim(1))















// 
// -- pass through pattern
//
const lambda_c = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const d_success2 = lambda<'n', 'number?'>(1)((n:number) => lambda_c()(foxp.putSym('n', n)))
const d_success3 = d_success2()(foxp.putPrim(1))
const d_success4
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
