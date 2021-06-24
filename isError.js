import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'
import isPlainObject from './isPlainObject.js'

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
function isError(value) {
  // 不是一个"类"对象
  if (!isObjectLike(value)) {
    return false
  }
  // 获取对象错误类型
  const tag = getTag(value)
  return tag == '[object Error]' || tag == '[object DOMException]' ||
  // error message 属性为 string 类型 并且 name 属性为 string 类型 并且不是通过直接调用Object构造函数直接创建的对象
    (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value))
}

export default isError
