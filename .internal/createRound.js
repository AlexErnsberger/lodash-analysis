/**
 * Creates a function like `round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  // 默认调用Math上的方法
  const func = Math[methodName]
  return (number, precision) => {
    precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
    // 需要根据精度向上取整
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      console.log(pair)
      const value = func(`${pair[0]}e+${pair[1] + precision}`)
      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    }
    // 不需要
    return func(number)
  }
}
// function createRound(methodName) {
//   const func = Math[methodName]
//   return (number) => {
//     return func(number)
//   }
// }

// console.log(Math.pow(10, 300), Math.pow(2, 53))
// console.log(90071992547409934)
const ceil = createRound('ceil')


ceil(4.006e2, 2)

