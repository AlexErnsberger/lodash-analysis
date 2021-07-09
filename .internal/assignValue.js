import baseAssignValue from './baseAssignValue.js'
import eq from '../eq.js'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  const objValue = object[key]

  // object不包含当前的key 并且 object[key]与传入的value相等
  // 即当前key在object的原型链上 或 不包含当前的key
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    // value 不为+0或-0时，直接把key定义在当前对象上
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      baseAssignValue(object, key, value)
    }
    // value 未传或全等于undefined && key 不在 object 对象或其原型链上
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}

export default assignValue
