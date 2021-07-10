/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  // 创建一个arraybuffer的实例
  // 生成一块新的内存地址
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
  // 因为无法直接操纵arrayBuffer，我们需要一个typearray 数组来帮我们实现内存的复写
  // 因此借助一个Uint8Array typeArray 数组， new Uint8Array(result)
  // 调用set方法，set接收一个array或typeArray，因此我们需要把原始的arraybuffer也初始化为一个Uint8Array数组
  // 为什么使用Uint8Array呢？
  // 计算机的基本单位是字节，每个字节是8位2进制，所以Uint8Array就足够了
  new Uint8Array(result).set(new Uint8Array(arrayBuffer))
  return result
}

export default cloneArrayBuffer
