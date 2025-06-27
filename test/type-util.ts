import * as typeUtil from '../src/type-util'
import type Cion from '@taiyakihitotsu/cion'

type test_rtou_map1a = typeUtil.RtoU<{x:1, y:2, z: [1, 2, 3]}>
type test_rtou_map1b = typeUtil.UnionKVStrToString<test_rtou_map1a>
type test_rtou_map2a = typeUtil.RtoU<{x:1, y:2, z: [1, 2, 3], a: {b: 1, c: 2}}>
type test_rtou_map2b = typeUtil.UnionKVStrToString<test_rtou_map2a>
type test_rtou_map3a = typeUtil.RtoU<{x:1, y:2, z: [1, 2, 3], a: {b: {bb: 21}, c: 2}}>
type test_rtou_map3b = typeUtil.UnionKVStrToString<test_rtou_map3a>
const test_rtou_map1b: Cion.Lisp<`(map ${test_rtou_map1b} [:x :y :z])`> = '[1 2 [1 2 3]]'
const test_rtou_map2b: Cion.Lisp<`(let [r (map ${test_rtou_map2b} [:x :y :z :a])] [(take 3 r) (map (last r) [:b :c])])`> = '[[1 2 [1 2 3]] [1 2]]'
const test_rtou_map3b: Cion.Lisp<`(map (fn [ks] (get-in ${test_rtou_map3b} ks)) [[:a :b :bb] [:a :c] [:x] [:y] [:z]])`> = '[21 2 1 2 [1 2 3]]'

type test_vs0 = typeUtil.VectorString<[1,2,3]>
type test_vs1 = typeUtil.VectorString<[]>
type test_vs2 = typeUtil.VectorString<[0,1,2,[3,4]]>
type test_vs3 = typeUtil.VectorString<[0,1,2,[3,4],5]>
type test_vs4a = typeUtil.RtoS<{six: 6}>
type test_vs4 = typeUtil.VectorString<[0,1,2,[3,4],5, {six: 6, seven: [7,8,9]}]>
const test_vs0: test_vs0 = '[1 2 3]'
const test_vs1: test_vs1 = '[]'
const test_vs2: test_vs2 = '[0 1 2 [3 4]]'
const test_vs3: test_vs3 = '[0 1 2 [3 4] 5]'
const test_vs4a: test_vs4a = '{:six 6}'
const test_vs4: Cion.Lisp<`[(take 5 ${test_vs4}) (map (last ${test_vs4}) [:six :seven])]`> = '[[0 1 2 [3 4] 5] [6 [7 8 9]]]'

const test_rtou0: typeUtil.RtoS<{readonly a: 1, readonly b: 2}> extends '{:b 2 :a 1}' | '{:a 1 :b 2}' ? true : false = true 
const test_rtou1: typeUtil.RtoS<{a: 1, readonly b: 2}> extends '{:b 2 :a 1}' | '{:a 1 :b 2}' ? true : false = true
const test_rtou2: typeUtil.RtoS<{readonly a: [0, 1], readonly b: 2}> extends '{:b 2 :a [0 1]}' | '{:a [0 1] :b 2}' ? true : false = true
const test_rtou3: typeUtil.RtoS<{readonly a: readonly [0, 1], readonly b: 2}> extends '{:b 2 :a [0 1]}' | '{:a [0 1] :b 2}' ? true : false = true
const test_rtou4: typeUtil.RtoS<{readonly a: readonly [0, {readonly c: 2}], readonly b: 2}> extends '{:b 2 :a [0 {:c 2}]}' | '{:a [0 {:c 2}] :b 2}' ? true : false = true


const testvtos0: typeUtil.VtoS<[readonly [1,2,3], '0', 5]> = '[[1 2 3] 0 5]' 
const testvtos1: typeUtil.VtoS<[[1,2,3], '0', 5]> = '[[1 2 3] 0 5]' 
const testvtos2: typeUtil.VtoS<[[1,[22,23],3], '0', 5]> = '[[1 [22 23] 3] 0 5]' 
const testvtos3: typeUtil.VtoS<[[1,[22,23],[31],3], '0', 5]> = '[[1 [22 23] [31] 3] 0 5]' 
const testvtos4: typeUtil.VtoS<[6, [1, readonly [22, 23, {a: 6}, 5], 5], 5, [31, 32], {readonly z: {zz: [33, 4]}}, {x: {y: {z: {a: 1}}}}]> = '[6 [1 [22 23 {:a 6} 5] 5] 5 [31 32] {:z {:zz [33 4]}} {:x {:y {:z {:a 1}}}}]'

const test_ft0 = typeUtil.ForceTuple([1, '1', '1', '1', '1', '1', '1', '2'] as const)
// @ts-expect-error:
const test_ft = typeUtil.ForceTuple([1, '1', '1', '1', '1', '1', '1', '2'])
