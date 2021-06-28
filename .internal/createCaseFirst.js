import castSlice from './castSlice.js'
import hasUnicode from './hasUnicode.js'
import stringToArray from './stringToArray.js'

/**
 * Creates a function like `lowerFirst`.
 * 根据传入的methodname 生成对应的函数
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return (string) => {
    // string 为空字符串 不做任何操作
    if (!string) {
      return ''
    }

    // 包含unicode码，调用内部的asciiToArray和unicodeToArray方法
    const strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined

    // string 字符不包含unicode 默认取string的第一个字符。否则转化为数组后，取第一个字符
    const chr = strSymbols
      ? strSymbols[0]
      : string[0]

    // string截取剩下的字符串。包含unicode情况，截取数组的1到最后一项并转换为字符串
    const trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1)

    // 调用第一个字符串对应的方法执行 prototype上对应的函数 并 追加后续字符串
    // 只对字符串的第一个字符进行操作
    return chr[methodName]() + trailing
  }
}

export default createCaseFirst
