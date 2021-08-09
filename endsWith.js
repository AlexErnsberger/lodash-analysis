/**
 * Checks if `string` ends with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @see includes, startsWith
 * @example
 *
 * endsWith('abc', 'c')
 * // => true
 *
 * endsWith('abc', 'b')
 * // => false
 *
 * endsWith('abc', 'b', 2)
 * // => true
 */
function endsWith(string, target, position) {
  const { length } = string
  // 是否传position 默认为 +string.length
  position = position === undefined ? length : +position
  // 负数或NaN
  if (position < 0 || position != position) {
    position = 0
  }
  // 大于length
  else if (position > length) {
    position = length
  }
  // 结束位置
  const end = position
  // 起始位置
  position -= target.length
  return position >= 0 && string.slice(position, end) == target
}

console.log(endsWith('abc', 'ab', 2))
export default endsWith
