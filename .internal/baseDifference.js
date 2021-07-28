import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  // 本质上调用indexOf 判断返回值是否大于-1
  let includes = arrayIncludes
  // 是否正常数组值对比，默认为true
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    // Array.prototype.map
    // 对values进行处理返回了一个新数组
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    // 调用comparator进行includes检验
    includes = arrayIncludesWith
    isCommon = false
  }
  // 大数组调用cacheHas
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    // 过滤重复value，本质上吧value作为Map（或对象）的键
    values = new SetCache(values)
  }
  // 循环标签申明
  outer:
  for (let value of array) {
    // 存在iteratee 对 array 的 value 进行相同处理
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    // 普通比较 并且 computed 不为NaN
    if (isCommon && computed === computed) {
      // 循环values进行比较
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          // 中断当前循环，继续执行outer代码
          continue outer
        }
      }
      result.push(value)
    }
    // 处理NaN
    // 调用自定义的comparator
    // 大数组调用SetCache优化性能
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}

let x = 0;
let z = 0;
labelCancelLoops: while (true) {
  console.log('Outer loops: ' + x);
  x += 1;
  z = 1;
  while (true) {
    console.log('Inner loops: ' + z);
    z += 1;
    if (z === 10 && x === 10) {
      break labelCancelLoops;
    } else if (z === 10) {
      break;
    }
  }
  console.log(222)
}


export default baseDifference
