interface FormatDate {
  year: number,
  month: number,
  day: number,
  hours: string,
  minutes: string,
  seconds: string
}

const date = ref(new Date())
const startDate = ref('')
const endDate = ref('')

/**
 * 
  这是一个 TypeScript 函数的声明，它使用了函数重载。该函数名为 formatDate，它包含了三个参数:
  date：一个 Date 类型的参数，是要格式化的日期对象。
  format：一个字符串，是日期的格式。这是可选参数，不传递默认为空。
  该函数返回一个字符串，表示格式化后的日期。但是，第一个函数声明只是一个类型声明，并没有真正的实现，而后面两个函数声明才是真正的函数实现。

  第二个函数实现是一个函数的重载，它接收一个可选的 Date 参数，但是不传递 format 参数时，该函数返回一个带有 format 参数的函数。
  第三个函数实现是用来处理真正的日期格式化逻辑的，它接收 date 和 format 两个参数。
 */
export default function getDate() {
  function formatDate(date: Date, format: string): string;
  function formatDate(d?: Date): FormatDate;
  function formatDate(d = date.value, format?: string) {
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hours = d.getHours().toString().padStart(2, '0')
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const seconds = d.getSeconds().toString().padStart(2, '0')

    if (format === 'y-m-d') {
      const m = month.toString().padStart(2, '0')
      const d = day.toString().padStart(2, '0')
      return `${year}-${m}-${d}`
    } else if (format === 'y/m/d') {
      const m = month.toString().padStart(2, '0')
      const d = day.toString().padStart(2, '0')
      return `${year}/${m}/${d}`
    } else {
      return { year, month, day, hours, minutes, seconds }
    }
  }

  const laterDay = (date: Date,num: number) => {
    const dateStamp = date.getTime()
    const dayStamp = num*24*60*60*1000
    const newDate = new Date(dateStamp + dayStamp)
    return newDate
  }
  return {
    date,
    formatDate,
    startDate,
    endDate,
    laterDay
  }
}