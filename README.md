# Foxp
[![npm](https://img.shields.io/npm/v/@taiyakihitotsu/foxp)](https://www.npmjs.com/package/@taiyakihitotsu/foxp) ![license](https://img.shields.io/npm/l/@taiyakihitotsu/foxp) [![build](https://github.com/taiyakihitotsu/foxp/actions/workflows/node.js.yml/badge.svg)](https://github.com/taiyakihitotsu/foxp/actions)

Enabling pseudo Dependent Types --- foxp🦊 does type-check [div-by-zero](#basic-example), [type-safe get/upd](#lens), [range-of-number](#range), [sized-array](#vect), [email-with-regex](#regex) and [more](#defining-your-own-precondition) you want.

## Installation
```sh
npm install --save-dev @taiyakihitotsu/foxp
```

## Usage
```typescript
import foxp from '@taiyakihitotsu/foxp'
```
### Basic Example
[test/doc/basic-example.ts](https://github.com/taiyakihitotsu/foxp/tree/main/test/doc/basic-example.ts)

All built-in functions are higher-order and accept optional pre-conditions. If you provide nothing, defaults are used.

And values must be wraped with `put*`. Pick its value via `.value` key.

```typescript
const div = foxp.bi.div()

// => 3/2
const t0 =
  div(
    foxp.putPrim(3)
  , foxp.putPrim(2)).value

// => Error but success to catch at the type-check.
try {
  div(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}
```

### Merging Pre-conditions
[test/doc/merging-pre-conditions.ts](https://github.com/taiyakihitotsu/foxp/tree/main/test/doc/merging-pre-conditions.ts)

You can merge pre-conditions using tuples of the same length as function arguments. Use empty strings `''` to skip merging for an argument.

```typescript
// NOTE: To keep a default pre, see `t3` pattern.
type Merged = foxp.pre.MergeTuple<[foxp.pre.Grater<2>, foxp.pre.Less<4>]>
const div = foxp.bi.div<Merged>()

// => 3/3
const t0 =
  div(
    foxp.putPrim(3)
  , foxp.putPrim(3)).value

const t1 =
  div(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(9)).value

try {
const t2 = 
  div(
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}
```

If you want to keep a default, get it with `foxp.pre.bi.*` and then merge them.

```typescript
type NewMerged = foxp.pre.MergePreStr<Merged, foxp.pre.bi.div>
const newdiv = foxp.bi.div<NewMerged>()

try {
const t3 = 
  newdiv(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}

```

### Lambda
[test/builtins/lambda.ts](https://github.com/taiyakihitotsu/foxp/tree/main/test/builtins/lambda.ts)

The first unary fn takes a number of arguments.
The second needs anonymous function, with `foxp.putSym`.
The third and fourth are the same constructure of built-ins.

You can define custom preconditions as Lisp S-expressions in this situation.

```typescript
const lambdatest0 = (n: number) => add()(foxp.putPrim(1), foxp.putSym('n', n))

const lambdatestr0n  = lambda<'n', 'neg-int?'>(1)(lambdatest0)()(foxp.putPrim(-1))

const lambdatestr1nf =
  lambda<'n', 'neg-int?'>
    (1)
    (lambdatest0)
    ()
// @ts-expect-error:
    (foxp.putPrim(1))
```

### Higher order function
[test/sample/higher-order-fn.ts](https://github.com/taiyakihitotsu/foxp/tree/main/test/sample/higher-order-fn.ts)

This is a bit of hard. You should call `runHof`, a type-level closure to earn env, and push every results into it.

```typescript
const hof = foxp.bi.hof
const add = foxp.bi.add
const sub = foxp.bi.sub
const runHof = foxp.bi.runHof

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
```

## Other Sample
See [test/sample](https://github.com/taiyakihitotsu/foxp/tree/main/test/sample)

### Lens
[test/builtins/get-in.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/builtins/get-in.ts)

You should `foxp.ro` if you want to use nested data.

```typescript
const map_getIntest_nest_with_ro_leaf =
       getIn
       <pre.getIn>
       ()
     ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
     , foxp.putVec([':a', 1] as const))

try {
   const map_getIntest_nest_out_of_bound0 =
       getIn
       <pre.getIn>
       ()
   // @ts-expect-error:
     ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
     , foxp.putVec([':c'] as const))
   } catch {}
```

### Range
[test/sample/numrange.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/sample/numrange.ts)

```typescript
const tested_num = foxp.putPrim(3)
type tested_pre = pre.Range<0,10>

const testnum0_success = bi.inc<tested_pre>()(tested_num)

const testnum0_ffailure =
  bi.inc
    <tested_pre>
    ()
// @ts-expect-error:
    (foxp.putPrim(20))
```

### Vect
[test/sample/vect.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/sample/vect.ts)

```typescript
const tested_vec = foxp.putVec(foxp.ro([0, 1, 2] as const))

const testvect0 = bi.first<pre.VectN<3>>()(tested_vec)
const testvect0_ffailure =
  bi.first
    <pre.VectN<3>>
    ()
// @ts-expect-error:
    (foxp.putVec(foxp.ro([0, 1] as const)))
```

### Regex
[test/sample/email.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/sample/email.ts)

```typescript
type email = `'(([^<>()[\\].,;: @"]+(\\.[^<>()[\\].,;: @"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))'`
const test_refind0 : Cion.Lisp<`(re-find ${email} 'zzz.zzz@testmailreg.com')`> = `'zzz.zzz@testmailreg.com'`
const test_refind1 : Cion.Lisp<`(re-find ${email} 'https://github.com/taiyakihitotsu/foxp/tree/main')`> = "''"

const email_str = foxp.putPrim('zzz.zzz@testmailreg.com')
const not_email_str = foxp.putPrim('https://github.com/taiyakihitotsu/foxp/tree/main')
const email = foxp.tid<foxp.pre.IsEmail>()(email_str)
// @ts-expect-error:
const notemail = foxp.tid<foxp.pre.IsEmail>()(not_email_str)
```

## Core concept
As we see above, every values wrapped by foxp🦊 is an object with two keys:

- `sexpr` : a lisp-sexpr acting like a singleton type.
- `value` : the original value.

If the value is a function, it contains:

- `value.pre` : the pre-condition used for type checking.
- `value.fn`  : original function implementation.

You can call with `.value.fn` directly if you want to bypass foxp🦊's checker.

The TypeScript type of value is passed via the compiler, which transfers the sexpr to the corresponding TypeScript type.

Important: This doesn't automatically track type transitions of functions at the type level; thus, its type is inferred as Function. You either use only the builtins or write them yourself. You should be aware of this when writing first-class functions and/or higher-order functions.

## builtins
**Core API**: `foxp`
 - `putPrim` --- wrap primitive values
 - `putVec` --- wrap vectors
 - `putRecord` --- wrap records
 - `putFn1` --- wrap unary functions
 - `putSym` --- used only with `lambda` / `hof`
 - `tid` --- identity with checking
 - `tap1` --- apply unary function with checking
 - `ro` --- readonly for nested data.

**Builtin Functions**: `foxp.bi`
 - `fn`, `lambda`, `hof`
 - Arithmetic : add, sub, mul, div
 - Data : assoc, assoc-in, update, update-in, get, get-in
 - Compare : gt (`>`), lt (`<`), eq (`=`), gte (`>=`), lte (`<=`)

**Pre-conditiond**: `foxp.pre`
 - Eq, Vect, NotZero, Greater, Less, Interval, EmailRegex
 - assocLax, assoc (for update/assoc-in/update-in too)
 - `MergePreStr`, `MergePreTuple` --- merge preconditions
 
**Pre-conditiond**: `foxp.pre.bi`
 - Pre-conditions for `foxp.bi`
 
More builtins and preconditions are planned.

Pre-conditions are Lisp S-exprs; you can write them directly as string, e.g. `'neg-int?'`

# FAQ & more
Feel free to open issues for questions.
See `DEV.md` for developer documentation.

# Author
taiyakihitotsu

# LICENSE
3-clause BSD license
