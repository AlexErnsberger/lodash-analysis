import Stack from './Stack.js'
import arrayEach from './arrayEach.js'
import assignValue from './assignValue.js'
import cloneBuffer from './cloneBuffer.js'
import copyArray from './copyArray.js'
import copyObject from './copyObject.js'
import cloneArrayBuffer from './cloneArrayBuffer.js'
import cloneDataView from './cloneDataView.js'
import cloneRegExp from './cloneRegExp.js'
import cloneSymbol from './cloneSymbol.js'
import cloneTypedArray from './cloneTypedArray.js'
import copySymbols from './copySymbols.js'
import copySymbolsIn from './copySymbolsIn.js'
import getAllKeys from './getAllKeys.js'
import getAllKeysIn from './getAllKeysIn.js'
import getTag from './getTag.js'
import initCloneObject from './initCloneObject.js'
import isBuffer from '../isBuffer.js'
import isObject from '../isObject.js'
import isTypedArray from '../isTypedArray.js'
import keys from '../keys.js'
import keysIn from '../keysIn.js'

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 2
const CLONE_SYMBOLS_FLAG = 4

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `clone`. */
// toStringTag 指Symbol.toStringTag 或 @@toStringTag
// 它由Object.prototype.toString()方法内部访问
const cloneableTags = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Initializes an object clone based on its `toStringTag`.
 * 根据对象的toStringTag属性，初始化一个对象
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  // 获取对象构造函数的引用
  const Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    // 布尔转数字
    case boolTag:
    // Date转时间戳
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)

    
    case mapTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor

    case symbolTag:
      return cloneSymbol(object)
  }
}

/**
 * Initializes an array clone.
 * 数组克隆初始化
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  // matchAll 方法也返回同类型的数组
  // 特殊处理正则exec返回的结果数组。exec返回一个数组，用匹配到的字符串作为数组的第一项，input属性保存匹配字符串
  // index 保存当前匹配字符串的位置 同时更新正则表达式的lastIndex属性 作为下一次匹配的起始位置
  // exec没有匹配到则返回null，同时设置正则对象的lastIndex为0
  // 更多说明： https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {number} bitmask The bitmask flags. 位掩码
 *  1 - Deep clone 深度克隆 0001
 *  2 - Flatten inherited properties 平铺继承 0010
 *  4 - Clone symbols 克隆Symbols 0100
 * @param {Function} [customizer] The function to customize cloning. 自定义克隆函数
 * @param {string} [key] The key of `value`. value 的键
 * @param {Object} [object] The parent object of `value`. 递归过车中value的父对象
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts. 跟踪遍历的对象及其克隆对象
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  let result
  // 深度克隆 0001
  const isDeep = bitmask & CLONE_DEEP_FLAG
  // 平铺克隆 0010
  const isFlat = bitmask & CLONE_FLAT_FLAG
  // 克隆，包含Symbols在哪 0100
  const isFull = bitmask & CLONE_SYMBOLS_FLAG

  // 如果传递了自定义克隆函数则调用
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value)
  }
  // 自定义克隆函数返回
  if (result !== undefined) {
    return result
  }
  // 普通数据类型，直接返回
  if (!isObject(value)) {
    return value
  }
  // 数组判断
  const isArr = Array.isArray(value)
  // 获取toStringTag
  const tag = getTag(value)
  if (isArr) {
    // 初始化数组对象，生成新实例，保留继承关系
    result = initCloneArray(value)
    // 非深度拷贝直接调用copyArray方法
    // 将value中的每一项塞入到initCloneArray生成的新数组中
    if (!isDeep) {
      return copyArray(value, result)
    }
  } else {
    // 函数判断
    const isFunc = typeof value === 'function'

    // node环境，处理Buffer
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep)
    }
    // object arguments  function 并且不包含父元素
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      /**
       * 平铺或函数 初始化result为{} 
       * 否则调用initCloneObject方法
       */
      result = (isFlat || isFunc) ? {} : initCloneObject(value)
      // 非深度遍历
      if (!isDeep) {
        // 平铺继承
        return isFlat
        /**
         * keysIn 获取对象的所有可遍历属性，包括原型继承链上的
         * copyObject 返回一个新对象，把value上的所有属性拷贝至result、
         * copySymbolsIn 内部先调用了getSymbolsIn方法，用于返回原型链上所有可枚举的symbol属性。
         * 然后调用了copyObject方法，把value上的所有symbol属性拷贝到 result上
         */
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
        /**
         * Object.assign 把value上所有的可枚举的自身属性复制到result上
         * copySymbols 先调用了getSymbols返回源对象的symbol属性，
         * 然后调用了copyObject将symbol属性复制到目标对象上
         */
          : copySymbols(value, Object.assign(result, value))
      }
    } else {
      //function或者是不可clone的对象类型
      if (isFunc || !cloneableTags[tag]) {
        // ？？？
        return object ? value : {}
      }
      // 根据toStringTag初始化result对象
      result = initCloneByTag(value, tag, isDeep)
    }
  }
  // Check for circular references and return its corresponding clone.
  // 循环引用校验
  stack || (stack = new Stack)
  const stacked = stack.get(value)
  if (stacked) {
    return stacked
  }
  stack.set(value, result)

  // map类型
  if (tag == mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    return result
  }

  // set类型
  if (tag == setTag) {
    value.forEach((subValue) => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
    return result
  }

  // typeArray对象直接返回
  if (isTypedArray(value)) {
    return result
  }

  // 根据条件调用对应的方法
  // 平铺克隆 复制原型链上的key
  // getAllKeysIn getAllKeys 包含symbol属性
  // keysIn  keys 不包含 sumybol
  const keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys)

    // 数组返回undefined 否则返回包含props的数组
    // value [1, 2]
  const props = isArr ? undefined : keysFunc(value)
  arrayEach(props || value, (subValue, key) => {
    // value 不是数组
    if (props) {
      key = subValue
      subValue = value[key]
    }
    // Recursively populate clone (susceptible to call stack limits).
    // result[key] = baseClone(subValue, bitmask, customizer, key, value, stack)
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
  })
  return result
}

export default 

const props = getAllKeysIn(value)
const props = getAllKeys(value)

arrayEach(props, (subValue, key) => {
  // props e.g ['name', 'age']
  // key = 'name'
  // subvalue = value['name']
  key = subValue
  subValue = value[key]
  // Recursively populate clone (susceptible to call stack limits).
  // result[key] = baseClone(subValue, bitmask, customizer, key, value, stack)
  assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
})

// value 指代 当前的数组对象
arrayEach(value, (subValue, key) => {
  // result 生成的新数组实例
  // key 数组的索引
  // subValue 数组索引处的值
  // bitmask 用于判断递归类型，见下方
  // customizer 自定义的递归函数
  // stack 用于记录已处理过的value的引用，避免对象内部循环引用的情况
  assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
})

function initCloneByTag(object, tag, isDeep) {
  // 获取对象构造函数的引用
  const Ctor = object.constructor
  switch (tag) {
    ...
    case symbolTag:
      return cloneSymbol(object)
  }
}




var str ="cabc"
var str1 = str.replace(/a/, '$$') // c$bc
var str2 = str.replace(/a/, '$&') // cabc
var str3 = str.replace(/a/, '$`') // ccbc
var str4 = str.replace(/a/, `$'`) // cbcbc
var str5 = str.replace(/(a)(b)/, '$1') // cac
var str6 = str.replace(/(?<test>b)(?<test2>c)/, '$<test>') // cab
// c$bc cabc ccbc cbcbc cbc cabc
console.log(str1, str2, str3, str4, str5, str6)


var a = new ArrayBuffer(10)
console.log(Buffer.isBuffer(a))