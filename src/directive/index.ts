import { DirectiveBinding } from 'vue'

export const resize = {
  inserted: function (el: HTMLElement, binding: DirectiveBinding) {
    console.log(binding)
    let position = '',
      resizing = false
    el.addEventListener('pointermove', (e: any) => {
      if (resizing) return
      const { left, right } = el.getBoundingClientRect()
      const { clientX } = e
      if (right - clientX < 8) {
        position = 'right' // 此时表明右拉伸
        el.style.cursor = 'col-resize'
      } else if (clientX - left < 8) {
        position = 'left' // 此时表明左拉伸
        el.style.cursor = 'col-resize'
      } else {
        position = ''
        el.style.cursor = ''
      }
    })

    const MIN_WIDTH = 10

    el.addEventListener('pointerdown', (e: any) => {
      if (position === '') return
      const sibling =
        position === 'right' ? el.nextElementSibling : el.previousElementSibling // 获取相邻节点
      const startX = e.clientX // 获取当前点击坐标

      const { width } = el.getBoundingClientRect() // 获取当前节点宽度
      const { width: siblingWidth } = sibling!.getBoundingClientRect() // 获取右节点宽度
      el.setPointerCapture(e.pointerId) // HTML5 的 API 自行百度~

      const onDocumentMouseMove = (e: any) => {
        resizing = true
        if (position === '') return
        const offsetX = e.clientX - startX
        const _elWidth =
          position === 'right' ? width + offsetX : width - offsetX //判断左右拉伸 所影响的当前节点宽度

        const _siblingWidth =
          position === 'right' ? siblingWidth - offsetX : siblingWidth + offsetX //判断左右拉伸 所影响的相邻节点宽度
        if (_elWidth <= MIN_WIDTH || _siblingWidth <= MIN_WIDTH) return

        // 更新左右节点宽度
        el.style.width = _elWidth + 'px'
        sibling.style.width = _siblingWidth + 'px'
      }

      document.addEventListener('mousemove', onDocumentMouseMove)

      el.addEventListener('pointerup', (e: any) => {
        position = ''
        resizing = false
        el.releasePointerCapture(e.pointerId)
        document.removeEventListener('mousemove', onDocumentMouseMove)
      })
    })
  },
}
