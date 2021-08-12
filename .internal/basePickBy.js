import baseGet from './baseGet.js'
import baseSet from './baseSet.js'
import castPath from './castPath.js'

/**
 * The base implementation of `pickBy`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  let index = -1
  const length = paths.length
  const result = {}

  while (++index < length) {
    // [prop]
    const path = paths[index]
    // 获取value
    const value = baseGet(object, path)
    // predicate(value, [prop])
    if (predicate(value, path)) {
      // 设置对应的属性到result上
      /*
        castPath 把不是[prop]形式的path转换为[prop]形式
      */
      baseSet(result, castPath(path, object), value)
    }
  }
  // 返回
  return result
}

export default basePickBy
