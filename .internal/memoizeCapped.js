import memoize from '../memoize.js'

/** Used as the maximum memoize cache size. */
// 最大缓存数量
const MAX_MEMOIZE_SIZE = 500

/**
 * A specialized version of `memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 * 另一个版本的缓存函数，在达到最大缓存数量限制的时候，清空缓存
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  const result = memoize(func, (key) => {
    // 获取memoize函数上的cache Map对象
    const { cache } = result
    // 达到最大缓存数量限制， 清空缓存
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear()
    }
    // 返回 cache key，默认为传入参数的第一个参数的值
    return key
  })

  return result
}

export default memoizeCapped
