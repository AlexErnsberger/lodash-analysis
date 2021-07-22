import baseMerge from './baseMerge.js'
import isObject from '../isObject.js'

/**
 * Used by `defaultsDeep` to customize its `merge` use to merge source
 * objects into destination objects that are passed thru.
 * 在defaultsDeep中使用，定义把源对象合并到目标对象的方法
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  // typeof object function
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    // 保存引用防止重复引用
    stack.set(srcValue, objValue)
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack)
    // 删除对应的引用
    // 可以使用weakMap来实现
    stack['delete'](srcValue)
  }
  return objValue
}

export default customDefaultsMerge
