// [note]
//
// those definition of assoc, assocIn, update, updateIn are too dangerous but easy to write.
// if you dump a type check on foxposs, they works at least.
// if not, don't use them directly.
export const cutkey = (s: string | number): string | number => typeof s === 'number' ? s : s.startsWith(':') ? s.slice(1) : s

export const get = ([m,k]:any): any => m[cutkey(k)]
export const getIn = ([m,ks]:any): any => { 
  if (ks.length === 1) return m[cutkey(ks[0])]
  const [k, ...next] = ks
  return getIn([m[cutkey(k)], next])
}

export const assoc = ([m,k,v]: any): any => {
  if (Array.isArray(m)) { 
    const tmp = m.slice()
    tmp[k] = v
    return tmp }
  else return {...m, [cutkey(k)]: v}
}

export const update = ([m,k,f]: any): any => {
  if (Array.isArray(m)) { 
    const tmp = m.slice()
    tmp[k] = f(tmp[k])
    return tmp }
  else return {...m, [cutkey(k)]: f(m[cutkey(k)])}
}

export const assocIn = ([m,ks,v]: any): any => {
  if (ks.length === 1) return assoc([m,ks[0],v])

  const [k, ...next] = ks
  const key = cutkey(k)

  return assoc([m,key,assocIn([get([m,key]),next,v])])
}

export const updateIn = ([m,ks,f]: any): any => {
  if (ks.length === 1) return assoc([m,ks[0],f(get([m,cutkey(ks[0])]))])

  const [k, ...next] = ks
  const key = cutkey(k)

  return assoc([m,key,updateIn([get([m,key]),next,f])])
}

export * as util from './util'
