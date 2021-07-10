import cloneArrayBuffer from './cloneArrayBuffer.js'

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
}

const buffer = cloneArrayBuffer(dataView.buffer)
const buffer =  dataView.buffer

export default cloneDataView
