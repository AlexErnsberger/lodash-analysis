import baseIndexOf from './baseIndexOf.js'

/**
 * A specialized version of `includes` for arrays without support for
 * specifying an index to search from.
 *
 * Array.prototype.includes 的实现但是没有支持第二个fromIndex参数，该参数支持从指定位置开始查找
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  const length = array == null ? 0 : array.length
  return !!length && baseIndexOf(array, value, 0) > -1
}

export default arrayIncludes
