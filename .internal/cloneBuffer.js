import root from './root.js'

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  // 深度拷贝
  // 原先为isDeep，这里我改掉了
  if (!isDeep) {
    // 返回一个新的 Buffer ，它引用与原始内存相同的内存
    return buffer.slice()
  }
  const length = buffer.length
  // 生成一块新的内存（可能包含脏数据）
  const result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length)

  // 将原始数据copy到新内存中
  buffer.copy(result)
  return result
}

export default cloneBuffer
