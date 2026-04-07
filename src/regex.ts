import { builtins as bi } from "./builtins.js"
import { pre } from './pre.js'
import Cion from '@taiyakihitotsu/cion'

/**
**Dev Note**

foxp (currently) replaces the first arguments with `never` if it doesn't match, which is a bit unfriendly to end-users (I plan to update this).
So, you can use Cion.Lisp as a sandbox, I recommend, to search a complete regex, instead of foxp directly.  
After you decided to use some results, declare them as general TypeScript types via `type`, then expand in template-literal-type to be passed in foxp's pre-conditions.

Every Cion.Lisp string should be wrapped in single quotes, not double quotes.
Because when you define `type A = 'this'` then expand into Cion.Lisp:

```typescript
Cion.Lisp<`(re-find '${A}' 'this')`> // Instead of `(re-find ${A} 'this')`

// In this case, `${A}` is expanded to directly, so the result is:
// `(re-find this 'this')`
//
// This expression spits an error.
// Error messages would say 'sexpr is not atom list.'.
```

Moreover, foxp provides `bi.refind` built-in function.
*/

export const matchStrict = bi.rematch<pre.match>()


// --- rgba regex ---
//
// This regex includes lint:
//   - Declare rgba, NOT rgb.
//   - Exactly one comma and one space must follow each of the first three number declarations.
//   - Opening and closing parentheses must not contain leading or trailing spaces.
//   - Every percentage must be in range of 0 to 100%
//   - Opacity must be in range of 0 to 1.
//   - Opacity should be a float-number including 1 to 3 digits after decimal points.
//     - Except if 0 or 1.
//   - Color values can be floating-point percentages with 1 to 3 decimal places.
// 
// -----------------------------------------------------------------------------------
// type RGBA = Cion.Lisp<`(re-find '${RgbaRegex}' 'rgba(255, 255, 255, 0.81)')`> // ok.
// type RGBA2 = Cion.Lisp<`(re-find '${RgbaRegex}' 'rgba(255, 255, 255, 0.181)')`> // ok.
// type RGBA_err = Cion.Lisp<`(re-find '${RgbaRegex}' 'rgba(255,255,255,0.81)')`> // ok.
// -----------------------------------------------------------------------------------
export const rgbaRegex = `^rgba\\((\\d{1,3}(\\.\\d{1,3})?, ){3}(1|(0\\.\\d{1,3})|0)\\)$`
export type RgbaRegex = typeof rgbaRegex

// --- hsla regex ---
//
// This regex includes lint:
//   - Declare hsla, NOT hsl.
//   - Exactly one comma and one space must follow each of the first three number declarations.
//   - Opening and closing parentheses must not contain leading or trailing spaces.
//   - Every percentage must be in range of 0 to 100%.
//   - Opacity must be in range of 0 to 1.
//   - Opacity should be a float-number including 1 to 3 digits after decimal points.
//     - Except if 0 or 1.
//   - Color values can be floating-point percentages with 1 to 3 decimal places.
// 
// -----------------------------------------------------------------------------------
// type HSLA = Cion.Lisp<`(re-find '${HslaRegex}' 'hsla(100%, 10%, 10%, 0.81)')`> // ok.
// -----------------------------------------------------------------------------------
export const hslaRegex = `^hsla\\(((((100)|(\\d{1,2}(\\.\\d{1,3})?))%), ){3}(1|(0\\.\\d{1,3})|0)\\)$`
export type HslaRegex = typeof hslaRegex

// --- color code regex ---
//
// This regex includes lint:
//   - Mixing uppercase and lowercase letters is not permitted.
//   - No space is allowed.
//   - Only 6-digit codes are allowed.
//     - Not permit 3 digits.
// -----------------------------------------------------------------------------------
// type ColorCode_err = Cion.Lisp<`(re-find '${ColorCodeRegex}' '#0000fF')`> // err
// type ColorCode_bad0 = Cion.Lisp<`(re-find '${ColorCodeRegex}' '#0000FF')`> // ok
// type ColorCode_bad1 = Cion.Lisp<`(re-find '${ColorCodeRegex}' '#0000ff')`> // ok
// -----------------------------------------------------------------------------------
export const colorCode = `^#([a-f0-9]{6}|[A-F0-9]{6})$`
export type ColorCodeRegex = typeof colorCode

export * as regex from './regex.js'
