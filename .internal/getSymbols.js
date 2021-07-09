/** Built-in value references. */
// 该方法判断一个对象中的是否可以被for...in枚举，除去原型链上的属性
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols = Object.getOwnPropertySymbols

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbols(object) {
  if (object == null) {
    return []
  }
  // Object(object) 兼容es5版本
  object = Object(object)
  // 返回可枚举的symbol属性
  return nativeGetSymbols(object).filter((symbol) => propertyIsEnumerable.call(object, symbol))
}

export default getSymbols
