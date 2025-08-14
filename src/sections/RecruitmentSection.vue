<template>
  <section id="recruit" class="section">
    <div class="inner">
      <RevealOnScroll>
        <h2 class="h-title">招新计划</h2>
        <span class="beside-span">RECRUITMENT COMPETITION</span>
        <p class="p-muted">欢迎对 网络安全 感兴趣的你加入。</p>
      </RevealOnScroll>

      <RevealOnScroll>
        <div  style="margin-top:18px">
          <MotionTabs :tabs="tabs"></MotionTabs>
<!--          <h3>如何加入</h3>-->
<!--          <ol>-->
<!--            <li>对网安有兴趣的大一新生（不限专业，能力强者不限年级）</li>-->
<!--            <li>CTF夺旗赛（个人赛，有神秘大奖哦：））我们将综合新生比赛期间比赛积极度和赛后排名，邀请新生加入。</li>-->
<!--            <li>同学校大部分社团招新时间，具体进新生群等待通知</li>-->
<!--            <li>加入招新比赛qq群（qq群号：<strong>749888459</strong>）</li>-->
<!--          </ol>-->
<!--          <div class="recruitment-poster">-->
<!--          <img class="poster" src="../assets/poster.png" alt="flag:NYSEC{Welcome_to_nyist.This_is_web_first_step}">-->
<!--          </div>-->
<!--          <div style="margin-top:12px">-->
<!--            <a class="card" href="https://gz.nysec.xyz" style="display:inline-block;padding:10px 12px;text-decoration:none">招新比赛入口</a>-->
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
import RevealOnScroll from '../components/RevealOnScroll.vue'
import MotionTabs from '../components/MotionTabs.vue'
const tabs = [
  {
    icon: "📋",
    label: "招新问题",
    type: "accordion",
    items: [
      { title: "Q: 招新对象和招新要求", content: "[*] 对网安有兴趣的大一新生（不限专业，能力强者不限年级）" },
      { title: "Q: 招新形式", content: "[*] CTF夺旗赛（个人赛，有神秘大奖哦：））\n" +
            "我们将综合新生比赛期间比赛积极度和赛后排名，邀请新生加入。" },
      { title: "Q: 招新时间", content: "[*] 同学校大部分社团招新时间，具体进新生群等待通知" },
      { title: "Q: 战队和社团有什么不同", content: "[*] NYSEC战队不属于南工大学生社团管理，具有自己独立的的管理方式、学习环境、成长体系。" },
    ]
  },
  {
    icon: "🖼️",
    label: "招新海报",
    type: "image",
    imageUrl: "./assets/poster.png",
  },
  {
    icon: "🔗",
    label: "招新比赛",
    type: "text",
    link: "https://gz.nysec.xyz/",
  }
]
</script>

<style scoped>
.recruitment-poster {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: left;
}
.poster {

  max-width: 40%;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
.poster:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}
</style>