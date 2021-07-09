import copyObject from './copyObject.js'
import getSymbolsIn from './getSymbolsIn.js'

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  // getSymbolsIn 获取原型链上可枚举的symbol属性
  return copyObject(source, getSymbolsIn(source), object)
}

export default copySymbolsIn
