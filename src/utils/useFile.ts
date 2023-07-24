/**
 * 文件转换为 Base64 编码
 * @param file 文件
 * @returns base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64String = reader.result as string
      resolve(base64String)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}
/**
 * Base64 编码转换为文件
 * @param base64String base64
 * @param filename 文件名
 * @returns 文件
 */
export function base64ToFile(base64String: string, filename: string): File {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
/**
 * 文件下载，使用a标签
 * 要求同源，不允许跨域下载
 * @param fileUrl 文件url
 * @param filename 文件名
 */
export function downloadFile(fileUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
