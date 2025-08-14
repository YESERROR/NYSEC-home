<script setup>
import { motion } from 'motion-v'
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const openStates = ref(props.items.map(() => false))

const toggle = (index) => {
  openStates.value[index] = !openStates.value[index]
}
</script>

<template>
  <div class="accordion">
    <div
        v-for="(item, index) in items"
        :key="index"
        class="accordion-item"
    >
      <div class="accordion-header" @click="toggle(index)">
        <span>{{ item.title }}</span>
        <motion.span
            :initial="{ rotate: 0 }"
            :animate="openStates[index] ? { rotate: 180 } : { rotate: 0 }"
            :transition="{ duration: 0.3, ease: 'easeInOut' }"
            style="display: inline-block;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="will-change: transform; transform: rotate(0deg);"><path d="m6 9 6 6 6-6"></path></svg>
        </motion.span>
      </div>

      <motion.div
          class="accordion-content-wrapper"
          :initial="{ height: 0, opacity: 0, y: -10 }"
          :animate="openStates[index]
          ? { height: 'auto', opacity: 1, y: 0 }
          : { height: 0, opacity: 0, y: -10 }"
          :transition="{ duration: 0.4, ease: 'easeInOut' }"
          style="overflow: hidden;"
      >
        <div class="accordion-content">
          <!-- 支持插槽或直接内容 -->
          <slot name="content" :item="item" :index="index">
            <p>{{ item.content }}</p>
          </slot>
        </div>
      </motion.div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  max-width: 600px;
  margin: 10px;
  color: #fff;
  font-family: sans-serif;
  text-align: left;
}

.accordion-item {
  border: 1px solid #444;
  border-radius: 6px;
  margin-bottom: 10px;
  background: #222;
}

.accordion-header {
  padding: 12px 16px;
  background: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.accordion-header:hover {
  background: #444;
}

.accordion-content {
  padding: 0 16px;
  background: #222;
}

.accordion-content p {
  margin: 10px 0;
}
</style>
