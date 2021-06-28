import upperFirst from './upperFirst.js'
import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 * 驼峰转换
 * 
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
const camelCase = (string) => (
  /**
   * 1. 先转换成string类型
   * 2. replace替换撇号' ’ 为空字符串
   * 3. 
   */
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => {
    // 当前字母转小写
    word = word.toLowerCase()
    // index 不等于 0时 把当前word转换成大写 
    return result + (index ? upperFirst(word) : word)
  }, '')
)

export default camelCase
