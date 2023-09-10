export const isToday = (time: Date) => {
  const today = new Date().toLocaleDateString()
  const finish = new Date(time).toLocaleDateString()
  if (today === finish) {
    return true
  }
  return false
}

export const formDate = (time: Date) => {
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
