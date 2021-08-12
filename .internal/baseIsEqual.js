import baseIsEqualDeep from './baseIsEqualDeep.js'
import isObjectLike from '../isObjectLike.js'

/**
 * The base implementation of `isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison 无需比较
 *  2 - Partial comparison 部分比较
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  // optimize
  if (value === other) {
    return true
  }
  // null undefined NaN
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    // NaN 返回true  与eq行为一致
    // null undefined 行为不一致
    // 少了一句代码 value === other ||
    return value !== value && other !== other
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack)
}

export default baseIsEqual
