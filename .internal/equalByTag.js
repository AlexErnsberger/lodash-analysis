import eq from '../eq.js'
import equalArrays from './equalArrays.js'
import mapToArray from './mapToArray.js'
import setToArray from './setToArray.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

/** `Object#toString` result references. */
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'

/** Used to convert symbols to primitives and strings. */
const symbolValueOf = Symbol.prototype.valueOf

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false
      }
      object = object.buffer
      other = other.buffer

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false
      }
      return true

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other)

    case errorTag:
      return object.name == other.name && object.message == other.message

    // RegExp.prototype.toString 返回正则表达式的字符串版本
    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == `${other}`

    // map set 转换成数组
    case mapTag:
      let convert = mapToArray

    case setTag:
      // 包含比较
      const isPartial = bitmask & COMPARE_PARTIAL_FLAG
      convert || (convert = setToArray)

      // size不等且不是包含比较 返回false
      if (object.size != other.size && !isPartial) {
        return false
      }
      // Assume cyclic values are equal.
      // 假设重复引用对象相等
      const stacked = stack.get(object)
      if (stacked) {
        return stacked == other
      }
      // 0001 0010
      // 默认为全量比较
      bitmask |= COMPARE_UNORDERED_FLAG

      // Recursively compare objects (susceptible to call stack limits).
      // 递归调用equalArrays进行比较
      stack.set(object, other)
      const result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack)
      // 比较完成后删除当前object引用
      stack['delete'](object)
      return result

    // 计算Symbol对象的原始值
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other)
      }
  }
  return false
}

export default equalByTag
