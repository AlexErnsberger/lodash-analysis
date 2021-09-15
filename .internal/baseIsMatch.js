import Stack from './Stack.js'
import baseIsEqual from './baseIsEqual.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

/**
 * The base implementation of `isMatch`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  let index = matchData.length
  const length = index
  const noCustomizer = !customizer

  if (object == null) {
    return !length
  }
  let data
  let result
  object = Object(object)

  while (index--) {
    data = matchData[index]
    if ((noCustomizer && data[2])
      // 值比较
      ? data[1] !== object[data[0]]
      // 函数 对象 NaN 直接判断是否存在对应的key
      : !(data[0] in object)
    ) {
      return false
    }
  }
  while (++index < length) {
    data = matchData[index]
    const key = data[0]
    const objValue = object[key]
    // value
    const srcValue = data[1]

    if (noCustomizer && data[2]) {
      // 不存在对应的key
      // 值为undefined并且目标对象不存在key 则返回false
      if (objValue === undefined && !(key in object)) {
        return false
      }
    } else {
      // 处理对象内部重复引用
      const stack = new Stack
      // 自定义比较函数
      if (customizer) {
        result = customizer(objValue, srcValue, key, object, source, stack)
      }

      // result undefined 调用 baseIsEqual
      // result 有值 false 直接结束循环返回结果
      if (!(result === undefined
        // 调用baseIsEqual 递归获取结果
        ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
        : result
      )) {
        return false
      }
    }
  }
  return true
}

export default baseIsMatch
