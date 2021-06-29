/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.这个方法确保密集型数组的返回
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 */
function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  // length为0返回空数组
  if (!length) {
    return []
  }
  // start为null 或 undefined 默认为0
  start = start == null ? 0 : start
  // end 为 undefined 默认数组长度
  end = end === undefined ? length : end

  // start 为负数 则从后向前定位起始位置
  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  // end 最大不能超过数组长度
  end = end > length ? length : end
  // end为负数，从后向前确定截止位置
  if (end < 0) {
    end += length
  }
  // 开始位置大于截止位置返回0 否则
  // 无符号右移 取整
  length = start > end ? 0 : ((end - start) >>> 0)
  // 无符号右移 取整
  start >>>= 0

  // 返回对应的数组
  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice
