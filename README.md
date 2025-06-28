# Foxp
[![npm](https://img.shields.io/npm/v/@taiyakihitotsu/foxp)](https://www.npmjs.com/package/@taiyakihitotsu/foxp) ![license](https://img.shields.io/npm/l/@taiyakihitotsu/foxp) [![build](https://github.com/taiyakihitotsu/foxp/actions/workflows/node.js.yml/badge.svg)](https://github.com/taiyakihitotsu/foxp/actions)

Enabling pseudo Dependent Types --- foxp🦊 does type-check [div-by-zero](#basic-example), [type-safe get/upd](#lens), [range-of-number](#range), [sized-array](#vect), [email-with-regex](#regex) and [more](#defining-your-own-precondition) you want.

## What is foxp🦊?
TypeScript's type system cannot natively express certain dependent-type-like guarantees, such as:

- Detection division-by-zero errors at compile time
- Lenght-indexed vectors (like `Vect n` in Idris)
- Safer get/set operations (similar to Lenses)
- Regex validation at the type level

While theoretically possible, implementing these from scratch in TypeScript requires complex Peano-number encodings or other heavy machinery.

Foxp🦊 solves this by embedding a Lisp interpreter at the TypeScript type level, called [Cion](https://github.com/taiyakihitotsu/cion) Lisp, inspired by Clojure.

It provides built-in functions with preconditions, allowing you to enforce these constraints at compile time and even combine or customize them.

## Installation
```sh
npm install --save-dev @taiyakihitotsu/foxp
```

## Usage
```typescript
import foxp from '@taiyakihitotsu/foxp'
```
### Basic Example
All built-in functions are higher-order and accept optional pre-conditions. If you don't provide any, defaults are used.

```typescript
const div = foxp.bi.div()

const t0 = div(foxp.putPrim(3)
              , foxp.putPrim(2)).value // => 3/2

try {
div(foxp.putPrim(3)
  // @ts-expect-error:
  , foxp.putPrim(0)).value
} catch {}
```

### Merging Pre-conditions
You can merge pre-conditions using tuples of the same length as function arguments. Use empty strings '' to skip merging for an argument.

```typescript
type aaa = foxp.MergePreTuple<foxp.pre.div, ['', 'neg-int?']>

const div2 = foxp.bi.div<aaa>()
  div2(foxp.putPrim(3)
// @ts-expect-error:
     , foxp.putPrim(2)).value

try {
  div2(foxp.putPrim(3)
// @ts-expect-error:
     , foxp.putPrim(0)).value
} catch {}

const t2 =
  div2(foxp.putPrim(3)
     , foxp.putPrim(-2)).value // => -3/2
```

### Defining your own precondition
You can define custom preconditions as Lisp S-expressions.

```typescript
const inc = foxp.putFn1<'neg-int?', 'inc'>()((n: number):number => 1 + n)

const one = foxp.putPrim(1) // {sexpr: 'inc', value: {pre: 'neg-int?', fn: Function}}

const negone = foxp.putPrim(-1) // {sexpr: '-1', value: -1}
// @ts-expect-error:
foxp.tap1(inc, one)
const pzero = foxp.tap1(inc, negone) // {sexpr: 0, value: 0}
pzero.value // => 0
```

## Other Sample
See [test/sample](https://github.com/taiyakihitotsu/foxp/tree/main/test/sample)

### Lens
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
from [test/builtins/get-in.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/builtins/get-in.ts)


### Range
```typescript
const testnumran0
  = foxp.putFn1<'(fn [n] (and (< n 10) (< 0 n)))', '(fn [n] (* n 4))'>()((n: number) => n * 4)
 
const testnumran1
  = foxp.tap1(
      testnumran0
      , foxp.putPrim(1))
 
const testnumran2
  = foxp.tap1(
      testnumran0
      , testnumran1 )
 
const testnumran3
  = foxp.tap1(
      testnumran0
// @ts-expect-error:
      , testnumran2 )
```
from [test/sample/numrange.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/sample/numrange.ts)

### Vect
```typescript
type testpre = '(fn [n] (= 3 (count n)))'
const testvect0
  = foxp.putFn1<
    testpre
    , '(fn [n] n)'>
    ()
    ((n: unknown): unknown => n)
const testvect1 = foxp.putVec([1, 2, 3] as const)
const testvect1b = foxp.putVec([1,2,3,4] as const)

const testvect2
  = foxp.tap1(
      testvect0
      , testvect1)
 
const testvect2b
  = foxp.tap1(
      testvect0
// @ts-expect-error:
      , testvect1b)
```
from [test/sample/vect.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/sample/vect.ts)

### Regex
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

from [test/sample/email.ts](https://github.com/taiyakihitotsu/foxp/blob/main/test/sample/email.ts)

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
 - `putPrim` — wrap primitive values
 - `putVec` — wrap vectors
 - `putRecord` — wrap records
 - `putFn1` — wrap unary functions
 - `tid` — identity with checking
 - `tap1` — apply unary function with checking
 - `ro` — readonly for nested data.
 - `MergePreStr`, `MergePreTuple` — merge preconditions

**Builtin Functions**: `foxp.bi`
 - Arithmetic : add, sub, mul, div
 - Data : assoc, assoc-in, update, update-in, get, get-in
 - Compare : gt (`>`), lt (`<`), eq (`=`), gte (`>=`), lte (`<=`)

**Pre-conditiond**: `foxp.pre`
 - Eq, Vect, NotZero, Greater, Less, Interval, EmailRegex
 - assocLax, assoc (for update/assoc-in/update-in too)
 
More builtins and preconditions are planned.

Pre-conditions are Lisp S-exprs; you can write them directly as string, e.g. `'neg-int?'`

# FAQ & more
Feel free to open issues for questions.
See `DEV.md` for developer documentation.

# Author
taiyakihitotsu

# LICENSE
3-clause BSD license
