export const isToday = (time: string) => {
  const today = new Date()
  const year = time.split('-')[0]
  const month = time.split('-')[1]
  const day = time.split('-')[2].split('T')[0]
  console.log(toInteger(day))
  console.log(today.getDate().toString())
  if (
    year === today.getFullYear().toString() &&
    toInteger(month) === today.getMonth().toString() &&
    toInteger(day) === today.getDate().toString()
  ) {
    return true
  }
  return false
}

export const dateAndTime = (time: Date) => {
  const tmp = time.toDateString()
  return tmp
}

export const toInteger = (value: string) => {
  if (value.split('')[0] === '0') {
    return value.split('')[1]
  }
  return value
}
