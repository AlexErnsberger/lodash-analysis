
/**
 * Casts `value` as an array if it's not one.
 *
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 */
function castArray(...args) {
  // 参数未传返回一个空数组
  if (!args.length) {
    return []
  }
  // 获取第一个参数
  const value = args[0]
  // 如果已经是数组则返回它自身，如果不是则用数组字面量的形式包裹返回
  return Array.isArray(value) ? value : [value]
}

console.log(castArray(1)) // [1]
console.log(castArray(null)) // [null]
console.log(castArray(undefined)) // [undefined]
console.log(castArray(1, 2, 3)) // [1]
console.log(castArray({a: 1, b: 2})) // [{a: 1, b: 2}]
console.log(castArray([1, 2, 3])) // [1, 2, 3]

console.log(Array.of(1)) // [1]
console.log(Array.of(null)) // [null]
console.log(Array.of(undefined)) // [undefined]
console.log(Array.of(1, 2, 3)) // [1, 2, 3]
console.log(Array.of({a: 1, b: 2})) // [{a: 1, b: 2}]
console.log(Array.of([1, 2, 3])) // [[1, 2, 3]]

console.log(new Array(1)) // [ <1 empty item> ]
console.log(new Array(null)) // [null]
console.log(new Array(undefined)) // [undefined]
console.log(new Array(1, 2, 3)) // [1, 2, 3]
console.log(new Array({a: 1, b: 2})) // [{a: 1, b: 2}]
console.log(new Array([1, 2, 3])) // [[1, 2, 3]]

console.log(Array.from(1)) // []
console.log(Array.from(null)) // TypeError
console.log(Array.from(undefined)) // TypeError
console.log(Array.from(1, 2, 3)) // TypeError
console.log(Array.from({0: 1, 1: 2, length: 2})) // [{a: 1, b: 2}]
console.log(Array.from([1, 2, 3])) // [1, 2, 3] 数组实现了可迭代协议
console.log(Array.from([1, [2], 3])) // [1, [2], 3]

export default castArray
