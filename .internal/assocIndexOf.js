import eq from '../eq.js'

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 * 获取在键值对的“数组”中找到“键”的索引。
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  // 获取数组的length
  let { length } = array
  while (length--) {
    // 存在对应的key返回index
    if (eq(array[length][0], key)) {
      return length
    }
  }
  // 不存在返回-1
  return -1
}

export default assocIndexOf
