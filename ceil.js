import createRound from './.internal/createRound.js'

console.log(Math.ceil(0.2))

/**
 * Computes `number` rounded up to `precision`. (Round up: the smallest integer greater than or equal to a given number.)
 * 向上取整，并可以根据 precision 参数对小数位或整数位向上取整
 * 
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round up.
 * @param {number} [precision=0] The precision to round up to.
 * @returns {number} Returns the rounded up number.
 * @example
 *
 * ceil(4.006)
 * // => 5
 *
 * ceil(6.004, 2)
 * // => 6.01
 *
 * ceil(6040, -2)
 * // => 6100
 */
const ceil = createRound('ceil')

export default ceil
