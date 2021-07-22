import baseAssignValue from './baseAssignValue.js'
import eq from '../eq.js'

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 * 类似于assignValue的实现但会混合值为undefined的value
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  // 1. object[key] !== value
  // 2. undefined && (key in obejct) false
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value)
  }
}

export default assignMergeValue
