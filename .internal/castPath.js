import isKey from './isKey.js'
import stringToPath from './stringToPath.js'

/**
 * Casts `value` to a path array if it's not one.
 * 如果value不是路径数组则将它转换为一个路径数组
 * 
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  // 数组直接返回
  if (Array.isArray(value)) {
    return value
  }
  // 否则如果是嵌套属性返回嵌套数组，不是嵌套属性则直接返回[对应的值]
  return isKey(value, object) ? [value] : stringToPath(value)
}

export default castPath
