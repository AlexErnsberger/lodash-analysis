/**
 * The base implementation of `findIndex` and `findLastIndex`.
 * findIndex 和 findLastIndex的基础实现
 * Array.prototype.findIndex() 返回符合测试函数的第一个元素
 * 与其他数组方法（例如 Array.some()）不同，即使对于具有未分配值的索引，也会运行 callbackFn
 *
 * @private
 * @param {Array} array The array to inspect.[1,2,3,4] 3
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)
  while ((fromRight ? index-- : (++index < length))) {
    // console.log(index)
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}

// const arr = [1, 2, 3, 4]
// const predicate = (value, index) => {
//   // console.log(index)
//   return value === 1
// }
// baseFindIndex(arr, predicate, 3, true)


export default baseFindIndex
