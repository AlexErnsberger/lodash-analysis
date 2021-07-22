import isIterateeCall from './isIterateeCall.js'

/**
 * Creates a function like `assign`.
 * 创建一个类似于assign的function
 * 基于传入的assigner创建一个新的assigner函数
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  // 闭包
  return (object, ...sources) => {
    let index = -1
    let length = sources.length
    // 最后一项为customizer
    let customizer = length > 1 ? sources[length - 1] : undefined

    // assigner形参个数大于3，排除最后一项customizer函数
    customizer = (assigner.length > 3 && typeof customizer === 'function')
      ? (length--, customizer)
      : undefined

    const guard = length > 2 ? sources[2] : undefined

    // 参数为 item index array 的形式（这里假设为数组） 对象的话就是 value key object
    // 这种情况只截取第一个参数
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer
      length = 1
    }
    object = Object(object)
    while (++index < length) {
      const source = sources[index]
      if (source) {
        assigner(object, source, index, customizer)
      }
    }
    return object
  }
}

export default createAssigner
