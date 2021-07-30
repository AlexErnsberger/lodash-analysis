import isObject from './isObject.js'
import isSymbol from './isSymbol.js'

/** Used as references for various `Number` constants. */
// 生成not a number 的常量
const NAN = 0 / 0

/** Used to match leading and trailing whitespace. */
// 匹配开头或结尾的空格
const reTrim = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. */
// 匹配以 - 或者 + 开头的错误的十六进制数字
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
// 匹配二进制数字
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. */
// 匹配八进制数字
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
// parseInt内部方法的引入
// parseInt(string, radix)
const freeParseInt = parseInt

/**
 * Converts `value` to a number.
 * 把传入的value转换为数字
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 */
function toNumber(value) {
  // 十进制数字类型直接返回
  if (typeof value === 'number') {
    return value
  }
  // symbol类型返回NaN
  if (isSymbol(value)) {
    return NAN
  }
  // 对象
  if (isObject(value)) {
    // 优先调用valueOf方法
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value
    // 其次对valueof调用toString方法
    value = isObject(other) ? `${other}` : other
  }
  // value不是string类型
  if (typeof value !== 'string') {
    // +0 -0 0 直接返回 否则转换成数字
    return value === 0 ? value : +value
  }
  // 去除前后空格
  value = value.replace(reTrim, '')
  // 是否是二进制数
  const isBinary = reIsBinary.test(value)
  // 二进制或八进制 截取0b 0o 调用parseInt转换
  return (isBinary || reIsOctal.test(value))
    // 调用parseInt方法
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    // 错误的十六进制返回NaN，正确的十六进制直接转换
    : (reIsBadHex.test(value) ? NAN : +value)
}

export default toNumber
