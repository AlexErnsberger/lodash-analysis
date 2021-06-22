import isArguments from '../isArguments.js'

/** Built-in value reference. */
// @@isConcatSpreadable 用于判断对象在concat方法中是否能被扁平化
const spreadableSymbol = Symbol.isConcatSpreadable

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  // 数组对象， arguments对象，或者是可扁平化对象
  return Array.isArray(value) || isArguments(value) ||
    !!(value && value[spreadableSymbol])
}

export default isFlattenable
