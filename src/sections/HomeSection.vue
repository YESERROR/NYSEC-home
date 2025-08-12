<template>
  <ParallaxSection id="home" :src="videoSrc" :speed="0.12">
    <div class="inner">
      <div class="center-container">
        <RevealOnScroll :delay="200">
          <h1 class="h-title ">NYSEC TEAM</h1>
          <p class="p-muted typing">南阳理工学院网络安全战队，致力于攻防渗透，CTF网络安全竞赛的学习研究</p>
        </RevealOnScroll>
        <RevealOnScroll>
          <div style="margin-top:18px">
            <a class="hero-btn" style="--delay: 4s"
               href="/recruit">加入我们</a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </ParallaxSection>
</template>

<script setup lang="ts">
import ParallaxSection from '../components/ParallaxSection.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import videoSrcFile from '../assets/nysec.mp4'

const videoSrc = videoSrcFile
</script>
<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 全屏居中 */
  text-align: center;
}

/* 打字机基础效果 */
.typing {
  overflow: hidden;
  white-space: nowrap;
  border-right: .15em solid #f4f3f3; /* 光标效果 */
  animation:
      typing 3s steps(30, end) forwards,
      blink-caret .75s step-end infinite;
  animation-delay: var(--delay, 0s);
}

/* 打字动画 */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* 光标闪烁 */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--primary); }
}

</style>