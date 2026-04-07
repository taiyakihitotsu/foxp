import * as merge from './merge.js'
import * as pre from './pre.js'
import * as bi from './builtins.js'
import * as regex from './regex.js'

export * from './merge.js'
export { regex } from './regex.js'
export { pre } from './pre.js'
export { builtins as bi } from './builtins.js'
export { putRecord, putVec, putFn1, putPrim, putSym, tap1, tid, ro, } from './foxp.js'

export * as foxp from './index.js'
