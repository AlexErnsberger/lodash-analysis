import findLastIndex from './findLastIndex.js'
import isArrayLike from './isArrayLike.js'

/**
 * This method is like `find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @see find, findIndex, findKey, findLastIndex, findLastKey
 * @example
 *
 * findLast([1, 2, 3, 4], n => n % 2 == 1)
 * // => 3
 */
function findLast(collection, predicate, fromIndex) {
  let iteratee
  // 字符串包装为对象
  const iterable = Object(collection)
  // 数组对象类型校验
  if (!isArrayLike(collection)) {
    collection = Object.keys(collection)
    iteratee = predicate
    predicate = (key) => iteratee(iterable[key], key, iterable)
  }
  // 获取对应位置的索引
  const index = findLastIndex(collection, predicate, fromIndex)
  // 返回值
  return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
}

export default findLast
