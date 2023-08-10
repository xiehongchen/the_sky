/**
 * 非空验证：检查数据是否为空，例如空字符串、null、undefined
 * @param value 输入值
 * @returns 返回值，true或false
 */
export function isNotEmpty(value: any): boolean {
  return value !== '' && value !== null && value !== undefined
}
/**
 * 数字验证：检查数据是否为数字
 * @param value 输入值
 * @returns 返回值，true或false
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 整数验证：检查数据是否为整数
 * @param value 输入值
 * @returns 返回值，true或false
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(value)
}
/**
 * 数组验证：检查数据是否为数组
 * @param value 输入值
 * @returns 返回值，true或false
 */
export function isArray(value: any): boolean {
  return Array.isArray(value)
}
/**
 * 邮箱格式验证：检查数据是否为有效的邮箱格式
 * @param value 输入值
 * @returns 返回值，true或false
 */
export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}
/**
 * 手机号格式验证：检查数据是否为有效的手机号格式
 * @param value 输入值
 * @returns 返回值，true或false
 */
export function isValidPhoneNumber(value: string): boolean {
  const phoneRegex = /^1[0-9]{10}$/
  return phoneRegex.test(value)
}
/**
 * 最小长度验证：检查数据的长度是否大于等于指定的最小长度
 * @param value 输入值
 * @param minLength 长度
 * @returns 返回值，true或false
 */
export function isMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength
}
/**
 * 最大长度验证：检查数据的长度是否小于等于指定的最大长度
 * @param value 输入值
 * @param maxLength 长度
 * @returns 返回值，true或false
 */
export function isMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength
}
