import isFlattenable from './isFlattenable.js'

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array 需要扁平化的数组
 * @param {number} depth 最大递归深度
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.每次迭代调用的函数
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks. 限制数组值通过predicate类型校验
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  // predicate 是否可扁平化校验，可扁平化的类型，默认数组，Arguments，是否实现了Symbol.isConcatSpreadable协议
  predicate || (predicate = isFlattenable)
  // 返回值，默认空数组
  result || (result = [])

  // array 为 null 或者 undefined时直接返回空数组
  if (array == null) {
    return result
  }

  for (const value of array) {
    // 递归深度大于0 并且能够被扁平化
    if (depth > 0 && predicate(value)) {
      // 大于 1 层，递归遍历
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        // 等于 1 层 直接 解构
        result.push(...value)
      }
    // 将数组的项限制为通过predicate检查的值
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}

export default baseFlatten
