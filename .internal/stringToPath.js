import memoizeCapped from './memoizeCapped.js'

// 46
const charCodeOfDot = '.'.charCodeAt(0)
console.log(charCodeOfDot)
// 匹配转译字符\ 或 \\
const reEscapeChar = /\\(\\)?/g
console.log('\\\\'.match(reEscapeChar))
// https://www.runoob.com/regexp/regexp-syntax.html
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  // 非. 或 非 括号
  '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  // \\[(?:([^"'][^[]*)|("')(?:(?!\2[^\\\\]|\\\\.)*?)\\2)]
  '\\[(?:' +
    // Match a non-string expression.
    // 任意非"or非'非[
    '([^"\'][^[]*)' + '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]'+ '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')
// 表达式1 非. [ ]
const rePropName1 = /[^.[\]]/
// 表达式2 非" 非' 非[
// 或 非贪婪匹配" 或 ' 未跟 " 或 '非\
// 或 非贪婪匹配\任意除换行会车以外的字符
// 匹配"或'
const rePropName2 = /\[(?:([^"'][^[])|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/
// 表达式3 正向预查 . 或者 []  . 或者 [] 或者 结束符
const rePropName3 = /(?=(?:\.|\[\])(?:\.|\[\]|$))/


/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
const stringToPath = memoizeCapped((string) => {
  const result = []
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('')
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match
    if (quote) {
      key = subString.replace(reEscapeChar, '$1')
    }
    else if (expression) {
      key = expression.trim()
    }
    result.push(key)
  })
  return result
})

const charCodeOfDot = '.'.charCodeAt(0)
const reEscapeChar = /\\(\\)?/g
// console.log('\\a'.replace(reEscapeChar, function(match, $1){
//   console.log($1)
// }))
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  // 非. 或 非 括号
  '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  // \\[(?:([^"'][^[]*)|("')(?:(?!\2[^\\\\]|\\\\.)*?)\\2)]
  '\\[(?:' +
    // Match a non-string expression.
    // 任意非"or非'非[
    '([^"\'][^[]*)' + '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]'+ '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')

const withoutMemoize = (string) => {
  const result = []
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('')
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    // expression ([^"'][^[])
    // quote ["']
    // subString ((?:(?!\2)[^\\]|\\.)*?)
    console.log(match, expression, quote, subString)
    let key = match
    if (quote) {
      key = subString.replace(reEscapeChar, '$1')
    }
    else if (expression) {
      key = expression.trim()
    }
    result.push(key)
  })
  return result
}

console.log(withoutMemoize('["n"].b.c'))

export default stringToPath
