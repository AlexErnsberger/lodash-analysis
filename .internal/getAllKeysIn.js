import getSymbolsIn from './getSymbolsIn.js'

/**
 * Creates an array of own and inherited enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  const result = []
  // 获取所有可枚举属性（原型链+对象本身）
  for (const key in object) {
    result.push(key)
  }
  // 非数组
  if (!Array.isArray(object)) {
    // 获取所有symbol属性（原型链+对象本身）
    result.push(...getSymbolsIn(object))
  }
  return result
}

export default getAllKeysIn
