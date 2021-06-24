import isError from './isError.js'

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 * 尝试执行传入的函数，返回执行函数的值或捕获错误对象。任意传递给attempt函数的额外参数都会传递给func
 * 
 * @since 3.0.0
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Avoid throwing errors for invalid selectors.
 * const elements = attempt(selector =>
 *   document.querySelectorAll(selector), '>_>')
 *
 * if (isError(elements)) {
 *   elements = []
 * }
 */
function attempt(func, ...args) {
  try {
    return func(...args)
  } catch (e) {
    return isError(e) ? e : new Error(e)
  }
}

export default attempt
