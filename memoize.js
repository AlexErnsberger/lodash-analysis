/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * const object = { 'a': 1, 'b': 2 }
 * const other = { 'c': 3, 'd': 4 }
 *
 * const values = memoize(values)
 * values(object)
 * // => [1, 2]
 *
 * values(other)
 * // => [3, 4]
 *
 * object.a = 2
 * values(object)
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b'])
 * values(object)
 * // => ['a', 'b']
 *
 * // Replace `memoize.Cache`.
 * memoize.Cache = WeakMap
 */
function memoize(func, resolver) {
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function')
  }
  const memoized = function(...args) {
    // 利用提供给 memoized 的参数生成 caceh key 或者使用 第一个实参作为 caceh key
    const key = resolver ? resolver.apply(this, args) : args[0]
    // 获取cache map
    const cache = memoized.cache

    // 如果有缓存，则返回对应的缓存
    if (cache.has(key)) {
      return cache.get(key)
    }
    // 否则，执行func
    const result = func.apply(this, args)
    // 并缓存在 当前 函数引用的cache 属性上
    memoized.cache = cache.set(key, result) || cache
    return result
  }
  // memoized 的 cache 默认使用 memoize.Cache 的 Map 对象 
  memoized.cache = new (memoize.Cache || Map)
  return memoized
}

memoize.Cache = Map

export default memoize


// const m = new Map()

// m.set(['a', 'b'], 'aaa')
// m.set(['a', 'b'], 'bbb')

// console.log(m)

function b (key) {
  console.log(key)
}

function a (...args) {
  b.apply(this, args)
  console.log(args)
}

console.log(a(2, 3, 4))