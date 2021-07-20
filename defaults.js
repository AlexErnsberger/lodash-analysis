import eq from './eq.js'

/** Used for built-in method references. */
const objectProto = Object.prototype

/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 * 
 * 把source对象上的（包括原型链上）可枚举属性赋值给object。如果object上已存在对应的属性
 * 那么source对象上的属性会被忽略
 *
 * **Note:** This method mutates `object`.
 * 这个方法修改了object
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaultsDeep
 * @example
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
 * // => { 'a': 1, 'b': 2 }
 */
function defaults(object, ...sources) {
  object = Object(object)
  sources.forEach((source) => {
    if (source != null) {
      source = Object(source)
      for (const key in source) {
        const value = object[key]
        if (value === undefined ||
            // 原型对象的值相等并且 object不包含当前key
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            // 赋值
          object[key] = source[key]
        }
      }
    }
  })
  return object
}

export default defaults
