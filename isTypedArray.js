import getTag from './.internal/getTag.js'
import nodeTypes from './.internal/nodeTypes.js'
import isObjectLike from './isObjectLike.js'

/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/

/* Node.js helper references. */
// https://nodejs.org/api/util.html#util_util_types
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray

/**
 * Checks if `value` is classified as a typed array.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array)
 * // => true
 *
 * isTypedArray([])
 * // => false
 */
const isTypedArray = nodeIsTypedArray
  // node环境调用util.types上的isTypedArray方法
  ? (value) => nodeIsTypedArray(value)
  // 对象 ｜ 函数 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#typedarray_objects
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value))

export default isTypedArray

function b64EncodeUnicode(str) {
  // %E2%9C%93%20%C3%A0%20la%20mode
  console.log( encodeURIComponent(str))
  //%0A - %9F -> 0x0A - 0x9F
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

b64EncodeUnicode('✓ à la mode'); 
