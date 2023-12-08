import { ref, onMounted, onUnmounted } from 'vue'

export function useLazyLoadImage(imageRef: Ref<HTMLImageElement>) {
  const isIntersecting = ref(false)

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    isIntersecting.value = entry.isIntersecting
    if (isIntersecting.value) {
      observer.unobserve(entry.target)
    }
  })

  onMounted(() => {
    observer.observe(imageRef.value)
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return { isIntersecting }
}
