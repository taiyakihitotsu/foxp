### setup
```terminal
sh scripts/init.sh
```

### format
```terminal
npm run format:smith
```

### commit
You must have one of the tags with a commit message: `[add]` `[update]` `[fix]` `[refactor]` `[chore]` `[doc]` `[test]`.

`husky` runs when you commit it with the 3 command below.

### test
- ```npm run check``` for `src` dir.
- ```npm run check:test``` for `test` dir (This makes tsx run as well).
- ```npm run check:smith``` for `src` dir (to see whether it's formatted well).

Important: Use `Cion.Lisp` to test things about record, because union type doesn't save the order of the record, so it doesn't keep the same string S-exprs any time. It requires a new order to keep it with using `map` or similar.

### code
the core function is `tap1` in `src/foxp.ts`. all args is expected to be wraped with `put...` functions. it gets the s-exprs from the value via the singleton type. `tap1` uses `Ltc` compiler `src/compiler.ts` to earn the return s-exprs.

if you want to accept only tuple arg, see `ForceTuple` in `src/type-util.ts`.

### FAQ & more
Please build an issue casually. I'll try to read and fix it if you put `[bug]` tag.

foxp uses `Cion` deeply, so we need to separate the cases.
Bugs would happen in foxp if Cion can eval the sexpr normally. if Cion can read it, it would happen in Cion.

### license
3-Clause BSD

### Author
taiyakihitotsu
