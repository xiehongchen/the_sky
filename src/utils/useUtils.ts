let timer: ReturnType<typeof setTimeout> | null = null
/**
 * 防抖
 * 事件触发后，如果在指定的时间间隔内再次触发该事件，则重新计时。
 * 当事件停止触发后，等待指定的时间间隔后才会执行回调函数。
 * 目的是确保在事件触发后一段时间内，不会频繁地执行回调函数，只在事件停止触发后才执行一次。
 * 典型应用场景：搜索框输入联想，只在用户停止输入后才发起搜索请求，避免频繁请求接口。
 * @param callback 回调函数
 * @param delay 间隔时间
 */
export const debounce = (callback: () => void, delay: number) => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(callback, delay)
}

let throttleTimer: ReturnType<typeof setTimeout> | null = null
/**
 * 节流
 * 事件触发后，立即执行回调函数，并在指定的时间间隔内忽略其他触发事件。
 * 回调函数执行的频率受到限制，无论事件触发多频繁，都不会在指定的时间间隔内连续执行。
 * 目的是限制事件触发的频率，确保在一段时间内不会过于频繁地执行回调函数。
 * 典型应用场景：滚动事件，限制滚动时触发回调的频率，避免过多的计算和渲染。
 * @param callback 回调函数
 * @param delay 间隔时间
 */
export const throttle = (callback: () => void, delay: number) => {
  if (!throttleTimer) {
    throttleTimer = setTimeout(() => {
      callback()
      throttleTimer = null
    }, delay)
  }
}
