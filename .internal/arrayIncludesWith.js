/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 * 与arrayIncludes相比，arrayIncludes是通过循环数组的值进行比较的，而该函数则是通过comparator函数进行比较
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, target, comparator) {
  if (array == null) {
    return false
  }

  for (const value of array) {
    if (comparator(target, value)) {
      return true
    }
  }
  return false
}

export default arrayIncludesWith
