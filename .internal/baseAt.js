import get from '../get.js'

/**
 * The base implementation of `at` without support for individual paths.
 * at 方法的基本实现，返回对应paths的值的数组
 * 
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths to pick.
 * @returns {Array} Returns the picked elements.
 */
function baseAt(object, paths) {
  let index = -1
  const length = paths.length
  const result = new Array(length)
  // object 为 null 或者 undefined时
  const skip = object == null

  // 下标0开始依次返回对应的值
  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index])
  }
  return result
}

export default baseAt
