import isSymbol from '../isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Converts `value` to a string key if it's not a string or symbol.
 * 把value转换成一个键
 * 
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  // string 或 symbol类型，直接返回
  if (typeof value === 'string' || isSymbol(value)) {
    return value
  }
  // 否则， 处理 -0 情况 后返回
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default toKey
