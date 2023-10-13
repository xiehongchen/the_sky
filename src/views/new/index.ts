type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: ThrottleOptions = {},
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null
  let previous = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()

    if (!previous && options.leading === false) {
      previous = now
    }

    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      func.apply(this, args)
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}
