### setup
```terminal
sh init.sh
```

### format
```terminal
npm run format:smith
```

NOTE: Due to the homemade and rough formatter, it is recommended to commit your changes before running it.

### commit
You must have one of the tags with a commit message: `[add]` `[update]` `[fix]` `[refactor]` `[chore]` `[doc]` `[test]`.

`husky` runs when you commit it with the 3 command below.

### test
- ```npm run check``` for `src` dir.
- ```npm run check:test``` for `test` dir (This makes tsx run as well).
- ```npm run check:smith``` for `src` dir (to see whether it's formatted well).

Important: Use `Cion.Lisp` to test things about record, because union type doesn't save the order of the record, so it doesn't keep the same string S-exprs any time. It requires a new order to keep it with using `map` or similar.

### code
The core codes are placed in `src/builtins.ts` / `src/foxp.ts`.
 - builtins: defining built-ins, and `fn` / `lambda` / `hof`. 
 - foxp: defining container to help type-check.

`src/compiler.ts` is used for translating CionLisp value to TS (extended) type.

### FAQ & more
Please build an issue casually. I'll try to read and fix it if you put `[bug]` tag.

Foxp uses `Cion` deeply, so we need to separate the cases.
Bugs would happen in foxp if Cion can eval the sexpr normally. if Cion can read it, it would happen in Cion.

### license
3-Clause BSD

### Author
taiyakihitotsu
