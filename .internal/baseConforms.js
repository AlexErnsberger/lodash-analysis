import baseConformsTo from './baseConformsTo.js'
import keys from '../keys.js'

/**
 * The base implementation of `conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(source) {
  // 获取source对象自身的可枚举属性
  const props = keys(source)
  return (object) => baseConformsTo(object, source, props)
}

export default baseConforms
