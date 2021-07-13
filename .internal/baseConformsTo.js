/**
 * The base implementation of `conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect. 需要检查的object
 * @param {Object} source The object of property predicates to conform to.
 * @param {Array} props source自身的可枚举属性
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
function baseConformsTo(object, source, props) {
  let length = props.length
  if (object == null) {
    return !length
  }
  object = Object(object)
  while (length--) {
    const key = props[length]
    const predicate = source[key]
    const value = object[key]

    // 不包含该属性
    // 并且不在object对象及其原型链上
    // 先校验source上的key属性是否也存在于object
    // 然后把object的值传入predicate作为参数
    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false
    }
  }
  return true
}

export default baseConformsTo
