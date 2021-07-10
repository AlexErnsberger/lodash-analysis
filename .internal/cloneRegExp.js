/** Used to match `RegExp` flags from their coerced string values. */
const reFlags = /\w*$/

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  // reFlags.exec(regexp)返回匹配到的flags数组，猜测RegExp内部会隐式调用toString方法，将flags和正则字符串进行组合
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  // 由于上述操作lastIndex被重置为0，所以此处将lastIndex重新赋值
  result.lastIndex = regexp.lastIndex
  return result
}

export default cloneRegExp
