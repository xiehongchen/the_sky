/**
 * fileToBase64：文件转换为 Base64 编码
 * base64ToFile：Base64 编码转换为文件
 * downloadFile：将图片下载到本地
 * urlToImage：通过一个图片的url加载所需要的image对象
 * urlToBlob：通过一个图片的url加载所需要的File（Blob）对象
 * imageToCanvas：将一个image对象转变为一个canvas对象
 * canvasToFile：将一个canvas对象转变为一个File（Blob）对象，该方法可以做压缩处理
 * canvasToDataURL：将一个Canvas对象转变为一个dataURL字符串，该方法可以做压缩处理
 * fileToDataURL：将File（Blob）对象转变为一个dataURL字符串
 * dataURLToImage：将dataURL字符串转变为image对象
 * dataURLToFile：将一个dataURL字符串转变为一个File（Blob）对象
 * compress：压缩File（Blob）对象
 * compressAccurately：根据体积压缩File（Blob）对象
 * checkImageType：判断是否支持该图片类型
 */

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
 * 将图片下载到本地
 * @param fileUrl file对象
 * @param filename 文件名
 */
export function downloadFile(file: File, fileName: string): void {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(file)
  link.download = fileName || Date.now().toString(36)
  document.body.appendChild(link)
  const evt = document.createEvent('MouseEvents')
  evt.initEvent('click', false, false)
  link.dispatchEvent(evt)
  document.body.removeChild(link)
}

/**
 * 通过一个图片的url加载所需要的image对象
 * @param url 图片地址
 * @returns {Promise(Image)}
 */
export function urlToImage(url: string): Promise<Node> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片加载失败，请检查图片地址'))
    img.src = url
  })
}

/**
 * 通过一个图片的url加载所需要的File（Blob）对象
 * @param url 图片地址
 * @returns {Promise<Blob>}
 */
export async function urlToBlob(url: string): Promise<Blob> {
  const response = await fetch(url)
  return await response.blob()
}

interface configType {
  width: number
  height: number
  scale: number
  orientation: number
}
/**
 * 将一个image对象转变为一个canvas对象
 * @param image  图片
 * @param config 转变为canvas时的一些参数配置
 * @returns HTMLCanvasElement
 */
export function imageToCanvas(
  image: HTMLImageElement,
  config: configType,
): HTMLCanvasElement {
  const cvs = document.createElement('canvas') as HTMLCanvasElement
  const ctx = cvs.getContext('2d')!
  let width
  let height
  // for (const i in config) {
  //   if (Object.prototype.hasOwnProperty.call(config, i)) {
  //     config[i] = Number(config[i])
  //   }
  // }
  if (!config.scale) {
    width =
      config.width ||
      (config.height * image.width) / image.height ||
      image.width
    height =
      config.height ||
      (config.width * image.height) / image.width ||
      image.height
  } else {
    // 缩放比例0-10，不在此范围则保持原来图像大小
    const scale = config.scale > 0 && config.scale < 10 ? config.scale : 1
    width = image.width * scale
    height = image.height * scale
  }
  // 当顺时针或者逆时针旋转90时，需要交换canvas的宽高
  if ([5, 6, 7, 8].some((i) => i === config.orientation)) {
    cvs.height = width
    cvs.width = height
  } else {
    cvs.height = height
    cvs.width = width
  }
  // 设置方向
  switch (config.orientation) {
    case 3:
      ctx.rotate((180 * Math.PI) / 180)
      ctx.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height)
      break
    case 6:
      ctx.rotate((90 * Math.PI) / 180)
      ctx.drawImage(image, 0, -cvs.width, cvs.height, cvs.width)
      break
    case 8:
      ctx.rotate((270 * Math.PI) / 180)
      ctx.drawImage(image, -cvs.height, 0, cvs.height, cvs.width)
      break

    case 2:
      ctx.translate(cvs.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
      break
    case 4:
      ctx.translate(cvs.width, 0)
      ctx.scale(-1, 1)
      ctx.rotate((180 * Math.PI) / 180)
      ctx.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height)
      break
    case 5:
      ctx.translate(cvs.width, 0)
      ctx.scale(-1, 1)
      ctx.rotate((90 * Math.PI) / 180)
      ctx.drawImage(image, 0, -cvs.width, cvs.height, cvs.width)
      break
    case 7:
      ctx.translate(cvs.width, 0)
      ctx.scale(-1, 1)
      ctx.rotate((270 * Math.PI) / 180)
      ctx.drawImage(image, -cvs.height, 0, cvs.height, cvs.width)
      break
    default:
      ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
  }
  return cvs
}

/**
 * 将一个canvas对象转变为一个File（Blob）对象，该方法可以做压缩处理
 * @param canvas canvs对象
 * @param quality 范围0-1，表示图片压缩质量
 * @param type 确认转换后的图片类型
 * @returns blob对象
 */
export function canvasToFile(
  canvas: HTMLCanvasElement,
  quality: number,
  type = 'image/jpeg',
): Promise<Blob> {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), type, quality),
  )
}

/**
 * 将一个Canvas对象转变为一个dataURL字符串，该方法可以做压缩处理
 * @param canvas canvs对象
 * @param quality 范围0-1，表示图片压缩质量
 * @param type 确认转换后的图片类型
 * @returns dataURL
 */
export function canvasToDataURL(
  canvas: HTMLCanvasElement,
  quality: number,
  type = 'image/jpeg',
): string {
  if (!checkImageType(type)) {
    type = 'image/jpeg'
  }
  return canvas.toDataURL(type, quality)
}

/**
 * 将File（Blob）对象转变为一个dataURL字符串
 * @param file file
 * @returns dataURL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (e) => resolve(e.target?.result as string)
    reader.readAsDataURL(file)
  })
}

/**
 * 将dataURL字符串转变为image对象
 * @param dataURL dataURL字符串
 * @returns image对象
 */
export function dataURLToImage(dataURL: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片加载失败，请检查图片地址'))
    img.src = dataURL
  })
}

/**
 * 将一个dataURL字符串转变为一个File（Blob）对象
 * @param dataURL dataURL字符串
 * @param type 确认转换后的图片类型
 * @returns blob对象
 */
export function dataURLToFile(dataURL: string, type: string): Blob {
  const arr = dataURL.split(',')
  let mime = arr[0].match(/:(.?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  if (checkImageType(type)) {
    mime = type
  }
  return new Blob([u8arr], {
    type: mime,
  })
}
interface compressConfig {
  quality: number
  type: string
  width: number
  height: number
  scale: number
  orientation: number
}
/**
 * 压缩File（Blob）对象
 * @param file file对象
 * @param config 配置
 * @returns blob对象
 */
export async function compress(
  file: File,
  config: compressConfig,
): Promise<Blob> {
  const dataURL = await fileToDataURL(file)
  let originalMime = dataURL.split(',')[0].match(/:(.*?);/)![1] // 原始图像图片类型
  let mime = 'image/jpeg' // 默认压缩类型
  if (checkImageType(config.type)) {
    mime = config.type
    originalMime = config.type
  }
  const image = await dataURLToImage(dataURL)
  const canvas = imageToCanvas(image, Object.assign({}, config))
  const compressDataURL = canvasToDataURL(canvas, config.quality, mime)
  const compressFile = dataURLToFile(compressDataURL, originalMime)
  return compressFile
}
interface compressAccuratelyConfig {
  size: number
  accuracy: number
  type: string
  width: number
  height: number
  scale: number
  orientation: number
}
/**
 * 根据体积压缩File（Blob）对象
 * @param file file对象
 * @param config 配置
 * @returns blob对象
 */
export async function compressAccurately(
  file: File,
  config: compressAccuratelyConfig,
): Promise<Blob> {
  // 如果指定体积不是数字或者数字字符串，则不做处理
  if (Number.isNaN(config.size)) {
    return file
  }
  // 如果指定体积大于原文件体积，则不做处理
  if (config.size * 1024 > file.size) {
    return file
  }
  if (!config.accuracy || config.accuracy < 0.8 || config.accuracy > 0.99) {
    config.accuracy = 0.95 // 默认精度0.95
  }
  const resultSize = {
    max: config.size * (2 - config.accuracy) * 1024,
    accurate: config.size * 1024,
    min: config.size * config.accuracy * 1024,
  }
  const dataURL = await fileToDataURL(file)
  let originalMime = dataURL.split(',')[0].match(/:(.*?);/)![1] // 原始图像图片类型
  let mime = 'image/jpeg'
  if (checkImageType(config.type)) {
    mime = config.type
    originalMime = config.type
  }
  const image = await dataURLToImage(dataURL)
  const canvas = imageToCanvas(image, Object.assign({}, config))
  const proportion = 0.75
  let imageQuality = 0.5
  let compressDataURL
  const tempDataURLs = ['', '']
  /**
   * HTMLCanvasElement.toBlob()以及HTMLCanvasElement.toDataURL()压缩参数
   * 的最小细粒度为0.01，而2的7次方为128，即只要循环7次，则会覆盖所有可能性
   */
  for (let x = 1; x <= 7; x++) {
    // console.group();
    // console.log("循环次数：", x);
    // console.log("当前图片质量", imageQuality);
    compressDataURL = canvasToDataURL(canvas, imageQuality, mime)
    const CalculationSize = compressDataURL.length * proportion
    // console.log("当前图片尺寸", CalculationSize);
    // console.log("当前压缩率", CalculationSize / originalSize);
    // console.log("与目标体积偏差", CalculationSize / (config.size * 1024) - 1);
    // console.groupEnd();
    // 如果到循环第七次还没有达到精确度的值，那说明该图片不能达到到此精确度要求
    // 这时候最后一次循环出来的dataURL可能不是最精确的，需要取其周边两个dataURL三者比较来选出最精确的；
    if (x === 7) {
      if (
        resultSize.max < CalculationSize ||
        resultSize.min > CalculationSize
      ) {
        compressDataURL = [compressDataURL, ...tempDataURLs]
          .filter((i) => i) // 去除null
          .sort(
            (a, b) =>
              Math.abs(a!.length * proportion - resultSize.accurate) -
              Math.abs(b!.length * proportion - resultSize.accurate),
          )[0]
      }
      break
    }
    if (resultSize.max < CalculationSize) {
      tempDataURLs[1] = compressDataURL
      imageQuality -= 0.5 ** (x + 1)
    } else if (resultSize.min > CalculationSize) {
      tempDataURLs[0] = compressDataURL
      imageQuality += 0.5 ** (x + 1)
    } else {
      break
    }
  }
  const compressFile = dataURLToFile(compressDataURL as string, originalMime)
  // console.log("最终图片大小：", compressFile.size);
  // 如果压缩后体积大于原文件体积，则返回源文件；
  if (compressFile.size > file.size) {
    return file
  }
  return compressFile
}
/**
 * 判断是否支持该图片类型
 * @param type 图片类型
 * @returns boolean
 */
function checkImageType(type: string): boolean {
  return ['image/png', 'image/jpeg', 'image/gif'].some((i) => i === type)
}
