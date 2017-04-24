import uuid from 'node-uuid'

var GLOBAL_IDS = new Set()

export function getUUID() {
  var theID = ''
  while(true) {
    theID = uuid.v4()
    if(GLOBAL_IDS.has(theID))
      continue

    GLOBAL_IDS.add(theID)
    break

  }
  return theID
}

export function isUUID(val) {
  return typeof val === 'string' && val.length === 36
}

export function dictListToMap(dictList, key) {
  var theMap = dictList.reduce((o, x, i) => {
    var idx = x[key]
    o[idx] = x
    return o
  }, {})
  var theIds = Object.keys(theMap)

  return [theIds, theMap]
}

export function purifyDictListEmptyToStr(item) {
  console.log('utils.purifyDictListEmptyToStr: item:', item, 'typeof:', typeof item)

  if(typeof item === 'object') return ''

  return item
}

export function delay(milliseconds) {
  return new Promise(() => {
    setTimeout(() => {Promise.resolve()}, milliseconds)
  })
}

export function delayFunc(func, params, milliseconds=200) {
  setTimeout(() => {func(...params)}, milliseconds)
}

export function queryToString(query) {
  if(!query) return ''

  return Object.keys(query).reduce((acc, cur) => {
    if (!query[cur]) return acc;
    return acc += `${cur}=${query[cur]}&`
  }, '')
}
