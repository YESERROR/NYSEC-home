<template>
  <div class="section" :id="id">
    <div class="media">
      <video v-if="isVideo" autoplay muted loop playsinline :style="imgStyle">
        <source :src="src" type="video/mp4" />
      </video>
      <img v-else :src="src" alt="" :style="imgStyle" />
    </div>
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount , computed } from 'vue'
interface Props { id?: string; src: string; speed?: number }
const props = defineProps<Props>()
const isVideo = computed(() => props.src?.endsWith('.mp4'))
const imgStyle = ref({ transform: 'translateY(0px)' })

let raf = 0
function onScroll(): void {
  const root = props.id ? document.getElementById(props.id) : null
  if (!root) return
  const rect = root.getBoundingClientRect()
  const winH = window.innerHeight
  const center = rect.top + rect.height / 2 - winH / 2
  const speed = props.speed ?? 0.25
  imgStyle.value.transform = `translateY(${ -center * speed }px)`
}

function tick() { onScroll(); raf = requestAnimationFrame(tick) }

onMounted(() => { tick(); window.addEventListener('resize', onScroll) })
onBeforeUnmount(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', onScroll) })
</script>

<style scoped>
.media {
  position: absolute;
  width: 100%;
  height: 80%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.media video,
.media img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
