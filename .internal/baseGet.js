import castPath from './castPath.js'
import toKey from './toKey.js'

/**
 * The base implementation of `get` without support for default values.
 * get方法的基本实现，不返回对象默认值
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  // 获取路径数组，如[prop],嵌套属性[a, b ,c]
  path = castPath(path, object)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    // tokey处理-0情况，length > 1 的时候循环处理嵌套属性
    // 对于.开头的path参数，castPath返回的数组的第一项为''
    object = object[toKey(path[index++])]
  }
  return (index && index == length) ? object : undefined
}

export default baseGet
