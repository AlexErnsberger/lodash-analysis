/** Detect free variable `global` from Node.js. */
// global
const freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global

export default freeGlobal

console.log(globalThis.Object)