import isPrototype from './isPrototype.js'

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  // object是一个实例并且不是一个原型对象
  return (typeof object.constructor === 'function' && !isPrototype(object))
    // 基于object的实例创建一个原型对象
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}

export default initCloneObject
