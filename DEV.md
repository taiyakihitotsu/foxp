# Development
## Toolchain
This project uses `pnpm`.
## Workflow
### Setup
1. Initialize: `sh init.sh`
2. Format: `pnpm format:smith`
3. Lint & Type Check:
   - `pnpm check`: Validates the `src` directory.
   - `pnpm check:test`: Validates the `test` directory.
   - `pnpm check:smith`: Verifies formatting compliance.

**Note**: Due to the homemade and rough formatter, it is recommended to commit your changes before running it, then `--amend` if success.
### Commit Convention
Commit messages must be prefixed with one of the following tags:  
`[add]` | `[update]` | `[fix]` | `[refactor]` | `[chore]` | `[doc]` | `[test]`
## Testing Note
### Map Equality
**Important**  
Use `Cion.Lisp` to test map-object types, **NOT directly comparing literals** generated from a map-object, because union type doesn't ensure the order of the record.  
The Foxp compiler internally uses union types to lift TypeScript values up to Cion S-expressions as singleton types.  
This means that any order of map-object doesn't keep on Cion Layer.

See also [Map Equality]( https://github.com/taiyakihitotsu/cion/blob/main/DEV.md#map-equality ) in [DEV.md]( https://github.com/taiyakihitotsu/cion/blob/main/DEV.md ) in Cion.
### Debugging & Error Handling
Any errors in foxp would be caused by Cion, not foxp itself.  
Foxp uses `Cion` deeply, so we need to separate the cases.  

Bugs occur in foxp only if Cion can evaluate the sexpr normally; otherwise, the bug originates in Cion.  
For example, a type mismatch detected at compile-time in foxp is usually due to Cion’s evaluation rules.
### Error depending on server/editor
If you use `emacs` with `tide` / `flycheck`, which relies on `tsserver`, you should know that there's a difference.

You can pick the commit ([44ea12d9b72c6953fb4faeef432a5d4f1b840bd2](https://github.com/taiyakihitotsu/foxp/commit/44ea12d9b72c6953fb4faeef432a5d4f1b840bd2)) and watch the behavior. In this, `tide` on `emacs` says no error in `test/builtins/map.ts` but `pnpm check:test` which executes `tsc` spits an error.

> test/builtins/map.ts:31:6 - error TS2345: Argument of type 'LispWrapedFnWith<"number?", "inc", <Arg0 extends FoxWith<true extends IsSymbol<Arg0> ? Symbol : number, Arg0>, Arg1 extends FoxWith<true extends IsSymbol<Arg1> ? Symbol : never, Arg1>, Arg2 extends FoxWith<...>, Arg3 extends FoxWith<...>, IsQuote extends [...] extends [...] ? false : true, UnrollArgsStrResult extend...' is not assignable to parameter of type 'FoxWith<{ fn: (w: unknown) => { value: unknown; }; }, LispWrapedFnWith<"number?", "inc", <Arg0 extends FoxWith<true extends IsSymbol<Arg0> ? Symbol : number, Arg0>, Arg1 extends FoxWith<true extends IsSymbol<...> ? Symbol : never, Arg1>, Arg2 extends FoxWith<...>, Arg3 extends FoxWith<...>, IsQuote extends [...] ext...'.  
>  The types of '[c.ValueKey].fn' are incompatible between these types.  
>    Type '<Arg0 extends FoxWith<true extends IsSymbol<Arg0> ? Symbol : number, Arg0>, Arg1 extends FoxWith<true extends IsSymbol<Arg1> ? Symbol : never, Arg1>, Arg2 extends FoxWith<...>, Arg3 extends FoxWith<...>, IsQuote extends [...] extends [...] ? false : true, UnrollArgsStrResult extends UnrollArgsStr<...>, UnrollContStr...' is not assignable to type '(w: unknown) => { value: unknown; }'.  
>      Types of parameters 'w' and 'w' are incompatible.  
>        Type 'unknown' is not assignable to type 'undefined'.  
>  
>31     (pinc, foxp.putVec(foxp.ro(['0', '1', '2'] as const)))  
>        ~~~~  
>  
>  
>Found 1 error in test/builtins/map.ts:31  

This error is made by the way of implementation of `runFn` in `src/builtins.ts`, but it's enough to see both `tsx` and `tsserver` run in a different way, not need to understand what the error want to say.

You can just watch files properly and simply with `pnpm build:watch`.

(This is the same: [845126bf833a9caf6ca619262fbbdd929351dcee](https://github.com/taiyakihitotsu/foxp/commit/845126bf833a9caf6ca619262fbbdd929351dcee))

Please correct me if I'm missing something.

# Core concept
This replaces the general type checks of TypeScript with an execution of a type-level scripting language, [CionLisp](https://github.com/taiyakihitotsu/cion). Foxp🦊 slurps values and tracks their unique S-expressions via singleton types, to pass them as arguments of a function of Cion.
Pre-conditions themselves are just pred function. So it works as below:

 - We will get types of values.
 - The types will be processed into sexprs.
 - The sexprs will be passed as arguments of pre-condition.
 - Cion will run. If it returns a falsy, it will be seemed that it is failed of type check. If not, the result acts for a return type.
 
In the other words, foxp🦊 is just a wraper of Type Level Lisp for TypeScript.

As we see above examples, every values wrapped by foxp🦊 is an object with two keys:

- `sexpr` : a lisp-sexpr acting like a singleton type.
- `value` : the original value.

If the value is a function, it contains:

- `value.pre` : the pre-condition used for type checking.
- `value.fn`  : original function implementation.

You can call with `.value.fn` directly if you want to bypass foxp🦊's checker.

The TypeScript type of value is passed via the compiler, which transfers the sexpr to the corresponding TypeScript type.

Important: This doesn't automatically track type transitions of functions at the type level; thus, its type is inferred as Function. You either use only the builtins or write them yourself. You should be aware of this when writing first-class functions and/or higher-order functions.
## Error Representation at Type Level
When a pre-condition fails, Foxp replaces the 1st argument type with `never` instead of an error object (e.g., `{ error: "..." }`).

Reasoning:
1. Zero-Runtime Guarantee: By using `never`, we ensure that any subsequent code relying on that value becomes un-callable, effectively halting the compilation.
2. Avoiding False Positives: Returning an error object type might accidentally satisfy some generic object constraints. Using `never` provides the most rigorous way.

**Note**: This behavior is also part of the Beta specification and may be refined for better error reporting in future versions.

# Code
## Core Overview
The core implementation is centered around two main modules: `src/builtins.ts` and `src/foxp.ts`.

This layer is responsible for translating between TypeScript values and Cion Lisp representations.  
In other words, it translates values into types via singleton types.

1. Values are lifted via `foxp.put*` functions into foxp expression in value layer, with Cion Lisp S-expression in type layer.
2. Built-in functions take these processed foxp values (and return a foxp value).
3. Preconditions stored in the type layer are checked, relying on Cion Lisp.
4. If they pass, built-ins operate in value layer and return new foxp objects.
   - If they fail, a type error occurs at **compile time**, NOT at runtime.
5. The resulting foxp objects can be passed into subsequent built-in functions, or used in user-defined functions via `lambda` or `higher-order functions` provided by `foxp/builtins.ts`.
6. Finally, you can unwrap the result to obtain a plain value using the `.value` method (e.g., `the_object.value`).

**Flow of data and type checking**  
The lifecycle of a value can be summarized as:  
`TS value → foxp value → Cion (type layer) → pre-check → eval (value layer) → foxp value → TS value`  
This shows how TypeScript values are lifted, checked, evaluated, and unwrapped back.
## Modules
### Builtins
 - `src/builtins.ts`: Defines built-in functions, exported as foxp API, including [lambda]( https://github.com/taiyakihitotsu/foxp?tab=readme-ov-file#lambda ) and [higher-order function utilities]( https://github.com/taiyakihitotsu/foxp?tab=readme-ov-file#lambda ).
 - `src/builtins-bodies.ts` : Value layer functions for `src/builtins.ts`.
### Foxp
 - `src/foxp.ts` : Provides wrapper objects used to assist type-checking and hold Cion S-expressions.
### Type Checking Layer
 - `src/pre.ts`: Defines pre-conditions as strings, works by adding types via Cion List S-expression. (For clojure-users, `pre` is named from Clojure's pre/post conditions.)
 - `src/merge.ts` : Combines multiple pre-conditions expressions into a single condition.
### Numeric Handling
Rational numbers must be passed as string:
```typescript
foxp.putPrim('3/2')
```

- Value layer is implemented using `mathjs`.

And `src/fractions.ts` provides small helper utilities.
### Compilation from Cion Lisp
- `src/compiler.ts` : Also supports translating Cion Lisp values back into extended TypeScript types.
### Utilities & Constants
 - `src/type-util.ts` : Utility types used during the conversion process.
 - `src/const.ts` : Wrappers defined in `foxp.ts` rely on this layer to determine the value of `[c.SexprKey]`.

## Policy
### Not todo
- We do not introduce side-effects; Foxp is purely functional.
So we don't modify or add anything with side effects.
### Using object and its overhead style
Foxp uses objects to store sexprs with values, which introduces some overhead. Branded types could reduce overhead, but we do not adopt them because behavior is hard to predict (e.g., [TS issue #42557](https://github.com/microsoft/TypeScript/issues/42557)). We accept this small cost to simplify implementation.
# FAQ & more
Feel free to open issues casually. Issues with the `[bug]` tag will be prioritized.
