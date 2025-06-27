# Foxp
A TypeScript type checker enabling pseudo Dependent Types.

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


### Other Sample
See [test/sample](https://github.com/taiyakihitotsu/foxp/tree/main/test/sample)

Currently I write lens, vect-n, numrange case there.

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
 - `tid` — identity
 - `tap1` — apply unary function with checking
 - `MergePreStr`, `MergePreTuple` — merge preconditions

**Builtin Functions**: `foxp.bi`
 - Arithmetic : add, sub, mul, div
 - Data : assoc, assoc-in, update, update-in
 
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
