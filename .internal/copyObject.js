import assignValue from './assignValue.js'
import baseAssignValue from './baseAssignValue.js'

/**
 * Copies properties of `source` to `object`.
 * 把source上的属性复制到object上
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  // 是否使用新对象
  const isNew = !object
  object || (object = {})

  for (const key of props) {
    // 是否传递了自定义复制函数customizer
    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined

    // 未传递customizer
    if (newValue === undefined) {
      newValue = source[key]
    }
    // object未传
    if (isNew) {
      baseAssignValue(object, key, newValue)
    } else {
      assignValue(object, key, newValue)
    }
  }
  return object
}

function copyObject(source, props, object) {
  // 是否创建新的空对象
  const isNew = !object
  object || (object = {})

  for (const key of props) {
    // 是否传递了自定义复制函数customizer
    let newValue = source[key]
    // object未传
    if (isNew) {
      baseAssignValue(object, key, newValue)
    } else {
      assignValue(object, key, newValue)
    }
  }
  return object
}

export default copyObject
