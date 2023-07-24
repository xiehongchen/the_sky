/**
 * 矩形
 * @param ctx canvas实例
 * @param x 坐标x
 * @param y 坐标y
 * @param width 宽度
 * @param height 高度
 * @param color 颜色
 */
export function drawRectangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}
/**
 * 圆角
 * @param ctx canvas实例
 * @param x 坐标x
 * @param y 坐标y
 * @param radius 圆角半径
 * @param color 颜色
 */
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}
/**
 * 文本
 * @param ctx canvas实例
 * @param text 文本
 * @param x 坐标x
 * @param y 坐标y
 * @param color 颜色
 * @param font 大小和字体
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  font = '16px Arial',
) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}
/**
 * canvas转换为图片
 * @param canvas canvas实例
 * @returns 图片
 */
export function canvasToImage(canvas: HTMLCanvasElement): HTMLImageElement {
  const img = new Image()
  img.src = canvas.toDataURL('image/png')
  return img
}
/**
 * 切割图片，生成新的canvas
 * @param img 图片
 * @param x 坐标x，左上角，相对于图片
 * @param y 坐标y，左上角，相对于图片
 * @param width 宽度
 * @param height 高度
 * @returns canvas实例
 */
export function cropImageToCanvas(
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    // 等待图片加载完成，不然会导致canvas绘制失败，只有空白图像
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height)
        resolve(canvas)
      } else {
        reject(new Error('canvas context is null'))
      }
    }
    img.onerror = (e) => {
      reject(e)
    }
  })
}
/**
 * 切割canvas，生成新的图片
 * @param canvas canvas实例
 * @param x 坐标x，左上角，相对于canvas
 * @param y 坐标y，左上角，相对于canvas
 * @param width 宽度
 * @param height 高度
 * @returns 图片
 */
export function cropCanvasToImage(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
): HTMLImageElement {
  // 创建一个新的Canvas来进行切割
  const croppedCanvas = document.createElement('canvas')
  const ctx = croppedCanvas.getContext('2d')

  if (ctx) {
    // 设置新Canvas的尺寸
    croppedCanvas.width = width
    croppedCanvas.height = height

    // 在新Canvas上绘制切割区域
    ctx.drawImage(canvas, x, y, width, height, 0, 0, width, height)
  }

  // 将切割后的Canvas转换成图片
  const img = new Image()
  img.src = croppedCanvas.toDataURL()

  return img
}
