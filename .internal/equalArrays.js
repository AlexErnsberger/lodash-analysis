import SetCache from './SetCache.js'
import some from '../some.js'
import cacheHas from './cacheHas.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  // 部分比较 isPartial = 1
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG
  const arrLength = array.length
  const othLength = other.length

  // 数组长度不等 直接返回false
  // 部分比较 array.length > other.length 直接返回false
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false
  }
  // Assume cyclic values are equal.
  // 已存在缓存中的array，假设other也存在，并进行比较
  const stacked = stack.get(array)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  // 索引
  let index = -1
  // 结果
  let result = true
  // 无序比较生成 new SetCache
  const seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined

  // 保存引用
  stack.set(array, other)
  stack.set(other, array)

  // Ignore non-index properties.
  while (++index < arrLength) {
    let compared
    const arrValue = array[index]
    const othValue = other[index]

    // 是否有自定义比较函数
    if (customizer) {
      compared = isPartial
        // 部分比较
        ? customizer(othValue, arrValue, index, other, array, stack)
        // 无序比较
        : customizer(arrValue, othValue, index, array, other, stack)
    }
    if (compared !== undefined) {
      // true 继续比较
      if (compared) {
        continue
      }
      // 否则返回false
      result = false
      break
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      // 不包含对应的项，直接返回
      if (!some(other, (othValue, othIndex) => {
        // 保存已经比较过的值，性能优化
        if (!cacheHas(seen, othIndex) &&
          (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex)
        }
      })) {
        result = false
        break
      }
    // 部分比较
    } else if (!(
      arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
    )) {
      result = false
      break
    }
  }

  // 删除引用
  stack['delete'](array)
  stack['delete'](other)

  return result
}

export default equalArrays
