import arrayLikeKeys from './.internal/arrayLikeKeys.js'
import isArrayLike from './isArrayLike.js'

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @see values, valuesIn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo)
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * keys('hi')
 * // => ['0', '1']
 */
function keys(object) {
  // 类数组对象 不是一个函数 并且 包含一个length属性 最小值为0 最大值为Number.MAX_SAFE_INTEGER
  return isArrayLike(object)
    // 默认不获取原型链上的属性
    ? arrayLikeKeys(object)
    // 调用Object.keys 返回自身可枚举属性
    : Object.keys(Object(object))
}

// export default keys

// function useState(initState) {
//   let _val = initState
//   const setVal = (newVal) => {
//     _val = newVal
//   }
//   return [_val, setVal]
// }


// const [val, setVal] = useState(1)
// setVal(2)
// console.log(val)


const React= (function() {
  let _val;
  return {
    useState: function(initValue) {
      _val = _val || initValue
      function setVal(newVal) {
        _val = newVal
      }
      return [_val, setVal]
    }
  }
})()

const [val, setVal] = React.useState(1)
setVal(2)
console.log(val)

const MyReact = (function() {
  let _val // hold our state in module scope
  return {
    render(Component) {
      const Comp = Component()
      Comp.render()
      return Comp
    },
    useState(initialValue) {
      _val = _val || initialValue // assign anew every run
      function setState(newVal) {
        _val = newVal
      }
      return [_val, setState]
    },
  }
})()

function Counter() {
  const [count, setCount] = MyReact.useState(0)
  return {
    click: () => setCount(count + 1),
    render: () => console.log('render:', { count }),
  }
}
let App
App = MyReact.render(Counter) // render: { count: 0 }
App.click()
App = MyReact.render(Counter) // render: { count: 1 }
