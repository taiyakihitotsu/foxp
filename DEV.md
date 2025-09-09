# Commands



## setup
```terminal
sh init.sh
```

## format
```terminal
npm run format:smith
```

**NOTE**: Due to the homemade and rough formatter, it is recommended to commit your changes before running it, then `--amend` if success.

## commit
You must have one of the tags with a commit message: `[add]` `[update]` `[fix]` `[refactor]` `[chore]` `[doc]` `[test]`.

`husky` runs when you commit it with the 3 command below.

## test
- ```npm run check``` for `src` dir.
- ```npm run check:test``` for `test` dir (This makes tsx run as well).
- ```npm run check:smith``` for `src` dir (to see whether it's formatted well).

**Important**: Use `Cion.Lisp` to test things about record, because union type doesn't save the order of the record, so it doesn't keep the same string S-exprs any time. It requires a new order to keep it with using `map` or similar.



# Code
The core codes are placed in `src/builtins.ts` / `src/foxp.ts`.
 - builtins: defining built-ins, and `fn` / `lambda` / `hof`. 
 - foxp: defining container to help type-check.

To translate TypeScript values to CionLisp's values, in the other words, values to types, it's written in `compiler.ts`. Wrappes of `foxp.ts` use it to decide a value of [c.SexprKey].
The code base picks them when doing type-checks via pre-conditions, implemented in `pre.ts`.
 - compiler: This uses `type-util.ts`
 - type-util: Utils and for TypeScript value / type to Cion Sexpr.
 - pre: Pre-conditions for the alternative type checker. They are strings which are pred functions in Cion.
 - merge: This is merging strings which expresses pre-condition.

Rational numbers should be passed with string, like `foxp.putPrim('3/2')`. This is implemented with `mathjs`.
 - fraction: a simple utils.

`src/compiler.ts` is used for translating CionLisp value to TS (extended) type.


# Environment
## Editor
If you use `emacs` with `tide` / `flycheck`, which relies on `tsserver`, you should know that there's a difference.
You can pick the commit ([44ea12d9b72c6953fb4faeef432a5d4f1b840bd2](https://github.com/taiyakihitotsu/foxp/commit/44ea12d9b72c6953fb4faeef432a5d4f1b840bd2)) and watch the behavior. In this, `tide` on `emacs` says no error in `test/builtins/map.ts` but `npm run check:test` which executes `tsc` spits an error.

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

You can just watch files properly and simply with `npm run build:watch`.




# Policy
 - Foxp is written as a Functionl Programming Library. So we don't touch and add what it has side-effect. 
 - Foxp has clearly overhead because the type checker uses object as wraper to earn its sexpr. You would know about Branded Type to solve it but we'll not adopt it because of [this issue](https://github.com/microsoft/TypeScript/issues/42557) . Moreover, `'string' & {__tag: "tag"}` is able to expand in Template Literal Type even if you don't want. We accept the overheads as a trade-off. (I'll write an article about them.)



# FAQ & more
Please build an issue casually. I'll try to read and fix it if you put `[bug]` tag.

Foxp uses `Cion` deeply, so we need to separate the cases.
Bugs would happen in foxp if Cion can eval the sexpr normally. if Cion can read it, it would happen in Cion.



### license
3-Clause BSD



### Author
taiyakihitotsu
