import assignMergeValue from './assignMergeValue.js'
import cloneBuffer from './cloneBuffer.js'
import cloneTypedArray from './cloneTypedArray.js'
import copyArray from './copyArray.js'
import initCloneObject from './initCloneObject.js'
import isArguments from '../isArguments.js'
import isArrayLikeObject from '../isArrayLikeObject.js'
import isBuffer from '../isBuffer.js'
import isObject from '../isObject.js'
import isPlainObject from '../isPlainObject.js'
import isTypedArray from '../isTypedArray.js'
import toPlainObject from '../toPlainObject.js'

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  const objValue = object[key]
  const srcValue = source[key]
  // 获取对应的引用
  const stacked = stack.get(srcValue)

  // 存在重复引用，直接赋值，跳出递归
  if (stacked) {
    assignMergeValue(object, key, stacked)
    return
  }
  // 递归 source[key] 是一个对象 
  // 如果 object[key] 也是一个对象，调用customizer函数递归，否则直接返回object[key]
  let newValue = customizer
    ? customizer(objValue, srcValue, `${key}`, object, source, stack)
    : undefined

  let isCommon = newValue === undefined

  if (isCommon) {
    // 源对象类数组判断
    const isArr = Array.isArray(srcValue)
    const isBuff = !isArr && isBuffer(srcValue)
    const isTyped = !isArr && !isBuff && isTypedArray(srcValue)
    newValue = srcValue
    // 类数组处理
    if (isArr || isBuff || isTyped) {
      if (Array.isArray(objValue)) {
        newValue = objValue
      }
      else if (isArrayLikeObject(objValue)) {
        // 生成一个新类数组
        newValue = copyArray(objValue)
      }
      else if (isBuff) {
        isCommon = false
        newValue = cloneBuffer(srcValue, true)
      }
      else if (isTyped) {
        isCommon = false
        newValue = cloneTypedArray(srcValue, true)
      }
      else {
        newValue = []
      }
    }
    // 空对象处理 arguments处理
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue
      // arguments转为普通对象
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue)
      }
      // 函数或非对象
      else if (typeof objValue === 'function' || !isObject(objValue)) {
        // 基于object的实例创建一个原型对象
        newValue = initCloneObject(srcValue)
      }
    }
    else {
      isCommon = false
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue)
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack)
    stack['delete'](srcValue)
  }
  // 赋值
  assignMergeValue(object, key, newValue)
}

export default baseMergeDeep
