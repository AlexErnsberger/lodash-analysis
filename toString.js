import isSymbol from './isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 * value转换为string类型。回null或undefined会返空字符串。-0会被保留
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
function toString(value) {
  if (value == null) {
    return ''
  }
  // Exit early for strings to avoid a performance hit in some environments.
  // string类型直接返回
  if (typeof value === 'string') {
    return value
  }
  // 数组类型
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    // 数组项不为null或undefined的情况下，递归调用自身进行转换
    return `${value.map((other) => other == null ? other : toString(other))}`
  }
  // symbol类型调用symbol的toString方法
  if (isSymbol(value)) {
    return value.toString()
  }
  // 处理-0的情况
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default toString
