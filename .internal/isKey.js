import isSymbol from '../isSymbol.js'

/** Used to match property names within property paths. */
// 嵌套属性
// .开头 或者 多个[ 非[ ]的字符 或者 "或'非"或'非\ 或者 \除换行会车以外的字符 在遇见下一个"或'时非贪婪匹配 ]
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/

// 表达式1
const reIsDeepProp1 = /\[(?:[^[\]]*)\]/
// 去掉性能优化 (?:) 不捕获当前子表达式 匹配任意数量非 [ 或 ]
const reIsDeepProp2 = /\[[^[\]]*\]/
// 去掉两边[] 匹配任意数量非 [ 或 ]
const reIsDeepProp3 = /[^[\]]*/ // 写成/[^\[\]]*/清晰一点

// 表达式2
const reIsDeepProp4 = /\[(?:(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
// 去掉性能优化 (?:) 不捕获当前子表达式 非贪婪匹配"或'且未跟"或'且非\并以"或'结尾 
const reIsDeepProp5 = /\[(["'])(?!\1)[^\\]*?\1\]/
// 去掉两边[] 非贪婪匹配"或'且未跟"或'且非\并以"或'结尾 
const reIsDeepProp6 = /(["'])(?!\1)[^\\]*?\1/

// 表达式3
const reIsDeepProp7 = /\[(["'])(?:\\.)*?\1)\]/
// 去掉性能优化 (?:) 不捕获当前子表达式 非贪婪匹配"或'\并匹配任意除换行会车以外的字符
const reIsDeepProp8 = /\[(["'])\\.*?\1)\]/
// 去掉两边[] 非贪婪匹配"或'\并匹配任意除换行会车以外的字符
const reIsDeepProp9 = /(["'])\\.*?\1)/

// 常规对象属性，以0-9A-z_开头并结尾的属性
const reIsPlainProp = /^\w*$/

/**
 * Checks if `value` is a property name and not a property path.
 * 检测value是一个属性名并且不是一个property path
 * 
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  // 数组返回false
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  // number boolean null symbol 返回 true
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true
  }
  // 正则校验，普通属性，嵌套属性
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}

export default isKey

const reIsPlainProp = /^\w*$/
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
function isKey(value, object) {
  // 数组返回false
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  // number boolean null symbol 返回 true
  if (type === 'number' || type === 'boolean' || value == null ) {
    return true
  }
  // 正则校验，普通属性，嵌套属性
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}

console.log(isKey('[a].b.c'))


var str = 'abc'

console.log(str.match(/[^ab]/))