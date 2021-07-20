import isObject from './isObject.js'
import root from './.internal/root.js'

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.
 * 可以通过cancel 取消函数的调用
 * 可以通过flush 立即执行函数
 * options 告诉 debounce函数应该在wait前执行还是wait之后执行
 * debounce调用最后一个参数作为作为func的执行参数
 * debounce的返回值是上一次调用func函数的返回值
 * 
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 * 如果leading和trailing同时为true，如果在wait时间内再次触发事件，那么trailing会被触发
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 * 如果wait 为0 并且 leading 为 false ,那么函数将会在下一个eventloop中执行
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 * 如果在带有 `requestAnimationFrame` 的环境中省略 `wait`，`func` 调用将被推迟到下一帧被绘制（通常大约 16 毫秒）。
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0]
 *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
 *  used (if available).
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }))
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * jQuery(source).on('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel)
 *
 * // Check for pending invocations.
 * const status = debounced.pending() ? "Pending..." : "Ready"
 */
function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    // 最大等待时间
    maxWait,
    result,
    timerId,
    lastCallTime

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  // 通过显式设置 `wait=0` 绕过 `requestAnimationFrame`
  const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    // maxWait 取 maxWait 和 wait的最大值
    // 如果maxWait小于wait，函数变成节流函数且wait失去意义
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  // 执行函数
  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  // 设置定时器
  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId)
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  // 取消定时器
  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  // leading执行
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    // 调用setTimeout时间和真正的wait时间存在误差
    // +4 -4
    const timeSinceLastCall = time - lastCallTime
    // 0
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      // 最大执行时间判断 
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    // 上次调用时间
    const timeSinceLastCall = time - lastCallTime
    // 上次执行时间
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    // 第一次执行
    // 上次调用时间大于等于等待时间 throttle
    //
    // 大于最大等待时间 debounce
    return (
      lastCallTime === undefined || 
      (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || 
      (maxing && timeSinceLastInvoke >= maxWait))
  }

  // wait时间为0时，执行
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  // 取消
  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  // 立即执行
  function flush() {
    // 当前无定时器任务 直接返回结果
    // 当前有定时器任务 
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  // 是否有进行中的定时器
  function pending() {
    return timerId !== undefined
  }

  function debounced(...args) {
    // 保存调用时间
    const time = Date.now()
    // 是否第一次执行
    // 是否到达最大等待时间
    // 是否达到wait时间
    // 当前时间小于上次触发时间
    const isInvoking = shouldInvoke(time)

    // 执行参数
    lastArgs = args
    // 执行上下文
    lastThis = this
    // 调用时间
    lastCallTime = time

    // 需要执行
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    // 当前无定时器
    if (timerId === undefined) {
      // 设置定时器
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  // 返回当前是否存在定时器任务
  debounced.pending = pending
  return debounced
}

function _debounce(fn, delay, {leading, trailing, maxwait}) {
  let t = null
  let now
  leading = leading || false
  trailing = trailing || true
  if (leading && trailing) {
    leading = false
    trailing = true
  }

  const flush = function() {
    clearTimeout(t)
    fn()
    if (maxwait) {
      now = Date.now()
    }
    t = setTimeout(() => {
      fn()
    }, delay)
  }

  const cancel = function() {
    clearTimeout(t)
    t= null
    if (maxwait) {
      now = void 0
    }
  }

  _debounce.flush = flush
  _debounce.cancel = cancel

  return function() {
    if (t) {
      clearTimeout(t)
      t = null
    }
    if (maxwait && !now) {
      now = Date.now()
    }
    if (!leading) {
      if (maxwait &&  currentTime - now >= maxwait) {
        leading = true
        now = currentTime
      }
    }
    if (leading) {
      leading = false
      fn()
      t = setTimeout(() => {
        leading = true
      }, timer)
    } else if (trailing) {
      const currentTime = Date.now()
      if (maxwait &&  currentTime - now >= maxwait) {
        fn()
        now = currentTime
      }
      t = setTimeout(() => {
        fn()
        t = null
      }, delay)
    }
  }
}

/**
 * 每n秒最多执行一次
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
function _throttle(fn, delay) {
  let preInvokeTime
  return function() {
    const currentTime = Date.now()
    if (!preInvokeTime) {
      preInvokeTime = currentTime
      fn()
      return
    }
    if (preInvokeTime && currentTime - preInvokeTime >= delay) {
      fn()
      preInvokeTime = currentTime
    } 

  }
}

function _throttleTimer(fn, interval) {
  let t
  let canInvoke
  return function() {
    if (canInvoke) {
      fn()
      canInvoke = false
    }
    if (!t) {
      t = setTimeout(() => {
        canInvoke = true
        t = null
      }, interval)
    }
  }
}

