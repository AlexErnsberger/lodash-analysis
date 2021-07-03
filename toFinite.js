import toNumber from './toNumber.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

// 约等于console.log(Number.MAX_VALUE)，这里约等于的意思是JavaScript无法正常表示大于Math.pow(2, 53) - 1 的数
const MAX_INTEGER = 1.7976931348623157e+308

/**
 * Converts `value` to a finite number.
 * 把value值处理为一个有限的值
 *
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
function toFinite(value) {
  // value falsy
  if (!value) {
    return value === 0 ? value : 0
  }
  // 转换为Number类型，不支持十六进制
  value = toNumber(value)
  // value值为INFINITY 或 -INFINITY 返回约等于  Number.MAX_VALUE 和 Number.MIN_VALUE的值
  if (value === INFINITY || value === -INFINITY) {
    const sign = (value < 0 ? -1 : 1)
    return sign * MAX_INTEGER
  }

  // value不为NaN的情况下，返回value,，否则返回0
  // NaN === NaN false
  return value === value ? value : 0
}

export default toFinite
