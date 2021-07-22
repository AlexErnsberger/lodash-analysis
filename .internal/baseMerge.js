// 自定义的数据结构，用于保存遍历过程中的对象引用，防止循环引用陷入死循环
import Stack from './Stack.js'
// 赋值操作 obejct[key] = value
import assignMergeValue from './assignMergeValue.js'
// 类似于针对于对象的forEach功能，但回调函数返回false可以终止循环
import baseFor from './baseFor.js'
import baseMergeDeep from './baseMergeDeep.js'
// 对象判断 object function
import isObject from '../isObject.js'
// 返回对象的可枚举（包括原型链）上的属性
import keysIn from '../keysIn.js'

/**
 * The base implementation of `merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  // 目标对象和源对象相同，直接返回
  if (object === source) {
    return
  }
  // 获取source的key
  baseFor(source, (srcValue, key) => {
    // srcValue source[key]
    // key (key in source) true
    // object 和 function，保存引用
    if (isObject(srcValue)) {
      // 第一次调用初始化stack
      stack || (stack = new Stack)
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
    }
    // 非 object 和 function
    // 直接赋值
    else {
      let newValue = customizer
        
        ? customizer(object[key], srcValue, `${key}`, object, source, stack)
        : undefined

      if (newValue === undefined) {
        newValue = srcValue
      }
      // object[key] = newValue
      assignMergeValue(object, key, newValue)
    }
  }, keysIn)
}

export default baseMerge
