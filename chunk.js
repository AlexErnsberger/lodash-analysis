import slice from './slice.js'
import toInteger from './toInteger.js'

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 * 根据第二个参数size对数组内的元素进行分组。如果数组不能根据size参数均匀的进行分组，那么最后一个分组将会包含剩余的数组元素
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size = 1) {
  // size 支持十进制 二进制 和 八进制
  size = Math.max(toInteger(size), 0)
  // length 默认为0 或 数组长度
  const length = array == null ? 0 : array.length
  // 数组长度为0 或 非数组 或 传入的size小于默认值1 默认返回空数组
  if (!length || size < 1) {
    return []
  }
  // 待处理数组的index
  let index = 0
  // 结果数组的 index
  let resIndex = 0
  // 根据size和length生成一个新的数组，想上取整，如 9/2 = 4.5 Math.ceil(4.5) = 5 生成一个长度为5的数组，其中前4项的length为2，最后一项为1
  const result = new Array(Math.ceil(length / size))

  // 填充并返回新数组
  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

export default chunk
