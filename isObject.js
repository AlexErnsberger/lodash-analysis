/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
function isObject(value) {
  const type = typeof value
  // 例如：普通的对象，函数，数组，正则表达式对象，String构造函数生成的对象，Number构造函数生成的对象等等
  // 关于Object类型的定义 https://262.ecma-international.org/7.0/#sec-object-type
  return value != null && (type === 'object' || type === 'function')
}

export default isObject
