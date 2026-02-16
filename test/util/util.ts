// test/util/util.ts
import { describe, it, expect } from 'vitest'
import { get, getIn, assoc, assocIn, update, updateIn, cutkey, mod } from '../../src/util'

// 深いfreeze（mutation検出用）
const deepFreeze = (obj: any): any => {
  if (obj && typeof obj === 'object') {
    Object.freeze(obj)
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      if (
        obj[prop] !== null &&
        (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
        !Object.isFrozen(obj[prop])
      ) {
        deepFreeze(obj[prop])
      }
    })
  }
  return obj
}

describe('util.ts: no side effects (referential transparency)', () => {

  it('assoc: does not mutate object', () => {
    const original = deepFreeze({ a: 1 })
    const result = assoc([original, 'a', 2])
    expect(result).toEqual({ a: 2 })
    expect(original).toEqual({ a: 1 })
    expect(result).not.toBe(original)
  })

  it('assoc: does not mutate array', () => {
    const original = deepFreeze([1, 2, 3])
    const result = assoc([original, 1, 99])
    expect(result).toEqual([1, 99, 3])
    expect(original).toEqual([1, 2, 3])
    expect(result).not.toBe(original)
  })

  it('update: does not mutate object', () => {
    const original = deepFreeze({ count: 1 })
    const result = update([original, 'count', (x: number) => x + 1])
    expect(result.count).toBe(2)
    expect(original.count).toBe(1)
    expect(result).not.toBe(original)
  })

  it('assocIn: deep no mutation', () => {
    const original = deepFreeze({ a: { b: { c: 1 } } })
    const result = assocIn([original, ['a','b','c'], 42])
    expect(result.a.b.c).toBe(42)
    expect(original.a.b.c).toBe(1)
    expect(result.a).not.toBe(original.a)
  })

  it('updateIn: deep no mutation', () => {
    const original = deepFreeze({ a: { b: { c: 1 } } })
    const result = updateIn([original, ['a','b','c'], (x: number) => x + 1])
    expect(result.a.b.c).toBe(2)
    expect(original.a.b.c).toBe(1)
    expect(result.a).not.toBe(original.a)
  })

  it('get / getIn: pure (no mutation)', () => {
    const original = deepFreeze({ a: { b: 10 } })
    const v1 = get([original, 'a'])
    const v2 = getIn([original, ['a','b']])
    expect(v1).toEqual({ b: 10 })
    expect(v2).toBe(10)
    expect(original.a.b).toBe(10)
  })

  it('same input => same output (deterministic)', () => {
    const input = deepFreeze({ a: { b: 1 } })
    const r1 = assocIn([input, ['a','b'], 2])
    const r2 = assocIn([input, ['a','b'], 2])
    expect(r1).toEqual(r2)
  })

  it('mod: pure function', () => {
    expect(mod(-1, 3)).toBe(2)
    expect(mod(5, 3)).toBe(2)
    expect(mod(0, 5)).toBe(0)
  })

  it('cutkey: removes leading colon for string keys', () => {
    expect(cutkey(':foo')).toBe('foo')
    expect(cutkey('bar')).toBe('bar')
    expect(cutkey(42)).toBe(42)
  })

})

// ====
describe('util.ts: extremely strict referential transparency (deep nested)', () => {

  it('assocIn: deep nested object/array mix does not mutate', () => {
    const original = deepFreeze({
      a: [ { b: { c: 1 } }, { d: [2, 3] } ],
      x: { y: [ { z: 5 } ] }
    })

    const result = assocIn([original, ['a', 1, 'd', 0], 42])
    expect(result.a[1].d[0]).toBe(42)
    expect(original.a[1].d[0]).toBe(2) // 元データは変わらない
    expect(result.a).not.toBe(original.a)
    expect(result.a[1]).not.toBe(original.a[1])
    expect(result.x).toBe(original.x) // 他の部分は変更されてない
  })

  it('updateIn: deep nested object/array mix does not mutate', () => {
    const original = deepFreeze({
      a: [ { b: { c: 10 } }, { d: [20, 30] } ],
      x: { y: [ { z: 50 } ] }
    })

    const result = updateIn([original, ['a', 0, 'b', 'c'], (v: number) => v + 100])
    expect(result.a[0].b.c).toBe(110)
    expect(original.a[0].b.c).toBe(10)
    expect(result.a[0]).not.toBe(original.a[0])
    expect(result.a).not.toBe(original.a)
    expect(result.x).toBe(original.x) // 他の部分は変わらない
  })

  it('assocIn: multiple deep changes maintain immutability', () => {
    const original = deepFreeze({
      arr: [ { foo: [1, 2, { bar: 3 }] } ],
      nested: { a: { b: { c: 4 } } }
    })

    const step1 = assocIn([original, ['arr', 0, 'foo', 2, 'bar'], 99])
    const step2 = assocIn([step1, ['nested','a','b','c'], 123])

    expect(step1.arr[0].foo[2].bar).toBe(99)
    expect(original.arr[0].foo[2].bar).toBe(3)
    expect(step2.nested.a.b.c).toBe(123)
    expect(original.nested.a.b.c).toBe(4)

    // 参照が正しく分離されていること
    expect(step1.arr).not.toBe(original.arr)
    expect(step2.arr).not.toBe(original.arr)
    expect(step2.nested).not.toBe(original.nested)
  })

  it('updateIn: array inside object inside array', () => {
    const original = deepFreeze({
      list: [ { inner: [1,2,3] }, { inner: [4,5,6] } ]
    })

    const result = updateIn([original, ['list', 1, 'inner', 2], (v: number) => v * 10])
    expect(result.list[1].inner[2]).toBe(60)
    expect(original.list[1].inner[2]).toBe(6)
    expect(result.list[1]).not.toBe(original.list[1])
    expect(result.list).not.toBe(original.list)
  })

  it('assocIn & updateIn: deeply nested combinations remain immutable', () => {
    const original = deepFreeze({
      a: [{ b: { c: [1, { d: 2 }] } }],
      x: { y: [ { z: 3 }, { w: 4 } ] }
    })

    const r1 = assocIn([original, ['a', 0, 'b', 'c', 1, 'd'], 99])
    const r2 = updateIn([r1, ['x','y',1,'w'], (v:number)=>v*10])

    // 元データは壊れていない
    expect(original.a[0].b.c[1].d).toBe(2)
    expect(original.x.y[1].w).toBe(4)

    // 新しい結果は正しい
    expect(r2.a[0].b.c[1].d).toBe(99)
    expect(r2.x.y[1].w).toBe(40)

    // 部分参照も分離されている
    expect(r2.a[0]).not.toBe(original.a[0])
    expect(r2.a[0].b).not.toBe(original.a[0].b)
    expect(r2.a[0].b.c).not.toBe(original.a[0].b.c)
    expect(r2.x).not.toBe(original.x)
  })

})
