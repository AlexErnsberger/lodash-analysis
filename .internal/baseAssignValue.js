/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 * 
 * assignValue 和 assignMergeValue的基础实现版本，不对value校验
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  // 特殊处理__proto__属性
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}

export default baseAssignValue
