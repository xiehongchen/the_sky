export const isToday = (time: Date | string, status?: number) => {
  if (!time) {
    return false
  }
  const today = new Date().toLocaleDateString()
  const finish = new Date(time).toLocaleDateString()
  // console.log('today', today)
  // console.log('finish', finish)
  if (status === 1) {
    if (today < finish) {
      return true
    }
    return false
  } else if (status === 2) {
    if (today !== finish) {
      return true
    }
    return false
  } else {
    if (today === finish) {
      return true
    }
    return false
  }
}

export const formDate = (time?: Date) => {
  if (!time) {
    return ''
  }
  const tmp = new Date(time).toLocaleDateString().replaceAll('/', '-')
  return tmp
}

export const formTime = (time: Date) => {
  const tmp = new Date(time).toLocaleTimeString()
  return tmp
}

export const toInteger = (value: string) => {
  if (value.split('')[0] === '0') {
    return value.split('')[1]
  }
  return value
}
