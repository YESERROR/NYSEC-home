<script setup lang="ts">
import {ref} from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import Accordion from './Accordion.vue'

// 定义类型
interface TabBase {
  icon: string
  label: string
}

interface TextTab extends TabBase {
  type: 'text'
  link: string
  items?: never
  imageUrl?: never
}

interface AccordionTab extends TabBase {
  type: 'accordion'
  items: Array<{ title: string; content: string }>
  content?: never
  imageUrl?: never
}

interface ImageTab extends TabBase {
  type: 'image'
  imageUrl: string
  content?: never
  items?: never
}

type Tab = TextTab | AccordionTab | ImageTab

const props = defineProps<{
  tabs: Tab[]
}>()

const selectedTab = ref(props.tabs[0])

</script>

<template>
  <div class="container">
    <nav class="nav">
      <ul class="tabs-container">
        <motion.li
            v-for="item in tabs"
            :key="item.label"
            class="tab"
            :initial="false"
            :animate="{
            backgroundColor: item.label === selectedTab.label ? '#081622' : '#eee0'
          }"
            @click="selectedTab = item"
        >
          {{ `${item.icon} ${item.label}` }}
          <motion.div
              v-if="item.label === selectedTab.label"
              class="underline"
              layout-id="underline"
          />
        </motion.li>
      </ul>
    </nav>
    <main>
      <AnimatePresence mode="wait">
        <motion.div
            :key="selectedTab.label"
            :initial="{ y: 10, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: -10, opacity: 0 }"
            :transition="{ duration: 0.2 }"
            class="content-container"
        >
          <!-- 文本内容 -->
          <div v-if="selectedTab.type === 'text' || !selectedTab.type" style="color: white">
            <p>招新平台链接：{{selectedTab.link}}</p>
            <div style="margin-top:12px">
              <a class="card" :href="selectedTab.link" style="display:inline-block;padding:10px 12px;text-decoration:none">点我进入平台</a>
            </div>
          </div>

          <!-- 手风琴内容 -->
          <Accordion
              v-else-if="selectedTab.type === 'accordion'"
              :items="selectedTab.items || []"
          >
            <template #content="{ item }">
              <p>{{ item.content }}</p>
            </template>
          </Accordion>

          <!-- 图片内容 -->
          <div v-else-if="selectedTab.type === 'image'" class="image-content">
            <img src="../assets/poster.png" alt="Tab image">
          </div>

        </motion.div>
      </AnimatePresence>
    </main>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  max-height: 2000px;
  border-radius: 10px;
  background: #061223;
  overflow: hidden;
  box-shadow:
      0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075);
  display: flex;
  flex-direction: column;
}

.nav {
  background: #0b1f3a;
  padding: 5px 5px 0;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  /* 移除原有边框 */
  border-bottom: none;
  height: 44px;
  /* 为伪元素定位做准备 */
  position: relative;
}

.nav::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.tabs-container {
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  width: 100%;
}

.tab {
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  padding: 10px 15px;
  position: relative;
  background: #0b1e39;
  cursor: pointer;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0;
  user-select: none;
  color: #fefefe;
}

.underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #0f1115;
}

.content-container {
  padding: 20px;
}

.image-content img {
  max-width: 100%;
  border-radius: 8px;
}
</style>
