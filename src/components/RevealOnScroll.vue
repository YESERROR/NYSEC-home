<template>
  <div ref="root" :class="['reveal', { 'in-view': inView }]" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
const props = defineProps<{ delay?: number }>()
const inView = ref(false)
const root = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

const style = computed(() => ({ transitionDelay: `${props.delay ?? 0}ms` }))

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        inView.value = true
      }
    })
  }, { threshold: 0.15 })
  if (root.value && io) io.observe(root.value)
})

onBeforeUnmount(() => { if (io && root.value) io.unobserve(root.value) })
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.reveal.in-view {
  opacity: 1;
  transform: translateX(0);
}
</style>
