/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 */
function clamp(number, lower, upper) {
  // 传入的数字进行转换
  number = +number
  lower = +lower
  upper = +upper
  // NaN === NaN false
  // NaN === 1 false
  // +null 0
  // +undefined NaN
  // 处理非数字的情况
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    // 和最大边界值比较，超过最大边界值，返回upper
    number = number <= upper ? number : upper
    // 和最小边界值比较，小于最小边界值，返回lower
    number = number >= lower ? number : lower
  }
  return number
}

export default clamp
