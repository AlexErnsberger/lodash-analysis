/**
 * The opposite of `before`. This method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const saves = ['profile', 'settings']
 * const done = after(saves.length, () => console.log('done saving!'))
 *
 * forEach(saves, type => asyncSave({ 'type': type, 'complete': done }))
 * // => Logs 'done saving!' after the two async saves have completed.
 */
function after(n, func) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  n = n || 0
  
  let f = function() {
    n = n - 1 
    console.log(n)
    if (n < 1) {
      f = function(...args) {
        return func.apply(this, args)
      }
    }
  }
  console.log(f)
  return f
}

// export default after


const saves = ['profile', 'settings']
const done = after(saves.length, () => console.log('done saving!'))

done()
done()
done()