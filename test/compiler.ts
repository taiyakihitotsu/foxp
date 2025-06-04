import type Cion from '@taiyakihitotsu/cion'
import * as c from '../src/compiler'
import * as ut from '../src/type-util'

// const test_vtom0: ut.Equal<c.VtoLispM<[':a', 'true', 'c', '-1']>, {a: boolean, c: number}> = true 

const test_vtom0: ut.Equal<c.VtoLispM<[':a', 'true', 'c', '-1']>, {a: boolean, c: number}> = true
const test_vtom1: ut.Equal<c.VtoLispM<[':a', 'true', 'c', ['d', '-1']]>, {a: boolean, c: ['d', '-1']}> = true

const test_ltCompiler0: ut.Equal<c.ltCompiler<Cion.CionParser<'[0 1 2 [3 4 [5 6]]]'>>, [number, number, number, [number, number, [number, number]]]> = true
const test_ltCompiler1: ut.Equal<c.ltCompiler<Cion.CionParser<'[0 1 2 [3 4 [5 6 []]]]'>>, [number, number, number, [number, number, [number, number, []]]]> = true 
const test_ltCompiler2: ut.Equal<c.ltCompiler<Cion.CionParser<'[0 1 {:a 2}]'>>, [number, number, {a: number}]> = true
const test_ltCompiler20: ut.Equal<c.ltCompiler<Cion.CionParser<'[0 1 {:a 2} 4]'>>, [number, number, {a: number}, number]> = true
const test_ltCompiler3: ut.Equal<c.ltCompiler<Cion.CionParser<'[0 1 {:a 2 :b 3}]'>> ,[number, number, {a: number, b: number}]> = true
const test_ltCompiler4: ut.Equal<c.ltCompiler<Cion.CionParser<'[0 1 {:a 2 :b {:c 3}}]'>>, [number, number, {a: number, b: {c: number}}]> = true
const test_ltCompiler5: ut.Equal<c.ltCompiler<Cion.CionParser<'[{:x [0 1]} 1 {:a 2 :b {:c {:d 5}}}]'>>, [{x: [number, number]}, number, {a: number, b: {c: {d: number}}}]> = true
const test_ltCompiler6: ut.Equal<c.ltCompiler<Cion.CionParser<'[{:a 1}]'>>, [{a: number}]> = true
const test_ltCompiler6a: ut.Equal<c.ltCompiler<Cion.CionParser<'[{:a [0 1 2]}]'>>, [{a: [number, number, number]}]> = true
const test_ltCompiler0m: ut.Equal<c.ltCompiler<Cion.CionParser<'{:a 2}'>>, {a: number}> = true
const test_ltCompiler0s: ut.Equal<c.ltCompiler<Cion.CionParser<`{:a "this is"}`>>, {a: string}> = true
const test_ltCompiler0b: ut.Equal<c.ltCompiler<Cion.CionParser<`{:a number?}`>>, {a: Function}> = true
const test_ltCompiler0f: ut.Equal<c.ltCompiler<Cion.CionParser<`(fn [n] (+ n 1))`>>, Function> = true
const test_ltCompiler1f: ut.Equal<c.ltCompiler<Cion.CionParser<`[9 2 (fn [n] (+ n 1))]`>>, [number, number, Function]> = true
const test_ltCompilerp0: ut.Equal<c.ltCompiler<Cion.CionParser<`[9 2 (fn [n] (+ n 1))]`>>, [number, number, Function]> = true
const test_ltCompilerp1: ut.Equal<c.ltCompiler<Cion.CionParser<`'9'`>>, string> = true
const test_ltCompilerp2: ut.Equal<c.ltCompiler<Cion.CionParser<`9`>>, number> = true
const test_ltCompilerp3: ut.Equal<c.ltCompiler<Cion.CionParser<`[]`>>, []> = true
const test_ltCompilerp4: ut.Equal<c.ltCompiler<Cion.CionParser<`{}`>>, {}> = true
const test_ltCompilerp5: ut.Equal<c.ltCompiler<Cion.CionParser<`true`>>, boolean> = true

// test
const test_rename0: c.Str<c.RenameLet<Cion.CionParser<`(fn [n] (+ n 1))`>, 'n', 'm'>> = '(fn [m] (+ m 1))'
const test_renam1: c.Str<c.RenameLet<Cion.CionParser<`(fn [n] (str 'note' n))`>, 'n', 'm'>> = `(fn [m] (str 'note' m))`

const test_rename0a: c.Str<c.RenameLet<Cion.CionParser<`(fn [n] (+ n 1))`>, 'n', 'm', true>> = '(fn [nm] (+ nm 1))'
const test_renam1a: c.Str<c.RenameLet<Cion.CionParser<`(fn [n] (str 'note' n))`>, 'n', 'm', true>> = `(fn [nm] (str 'note' nm))`


