// 是否arguments类型
import isArguments from '../isArguments.js'
// 是否buffer类型
import isBuffer from '../isBuffer.js'
// 合法的索引
import isIndex from './isIndex.js'
// 类数组
import isTypedArray from '../isTypedArray.js'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  const isArr = Array.isArray(value)
  const isArg = !isArr && isArguments(value)
  const isBuff = !isArr && !isArg && isBuffer(value)
  const isType = !isArr && !isArg && !isBuff && isTypedArray(value)
  const skipIndexes = isArr || isArg || isBuff || isType
  const length = value.length
  const result = new Array(skipIndexes ? length : 0)
  let index = skipIndexes ? -1 : length
  // 获取索引键
  while (++index < length) {
    result[index] = `${index}`
  }
  // for..in是无序的
  for (const key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
          // 跳过索引 true && （key为length 或者key是索引）
          // 如exec和matchAll返回的input和index属性
        !(skipIndexes && (
          // 排除length属性和索引
        // Safari 9 has enumerable `arguments.length` in strict mode.
          (key === 'length' ||
           // Skip index properties.
           isIndex(key, length))
        ))) {
      result.push(key)
    }
  }
  return result
}

export default arrayLikeKeys

const a = /123/
const b = a.exec('123123')
console.log(Object.getOwnPropertyDescriptor(b, 'input'))
