<template>
  <section id="honors" class="section">
    <div class="inner">
      <RevealOnScroll>
        <h2 class="h-title">荣誉历程</h2>
        <span class="beside-span">Honor Course</span>
        <p class="p-muted">历年比赛成绩与重要里程碑。</p>
      </RevealOnScroll>

      <div class="honor-grid" style="margin-top:18px">
        <RevealOnScroll v-for="(yearGroup, year, index) in groupedHonors" :key="year" :delay="index*90">
          <div class="year-card">
            <div class="year-header">{{ year }}年</div>
            <div class="year-honors">
              <div v-for="(h, i) in yearGroup" :key="i" class="honor-item">
                <!-- 只对存在图片的项添加点击功能 -->
                <img
                    v-if="h.img"
                    :src="h.img"
                    alt=""
                    class="honor-image"
                    @click="openPreview(h.img)"
                    :class="{ 'clickable-image': h.img }"
                />
                <div class="honor-details">
                  <strong>{{ h.title }}</strong>
                  <div class="p-muted2">{{ h.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <!-- 图片预览模态 -->
      <ImagePreviewModal
          :visible="previewVisible"
          :imageUrl="previewImageUrl"
          @close="closePreview"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import ImagePreviewModal from '../components/ImagePreviewModal.vue'

interface HonorItem {
  title: string
  desc: string
  year: string
  img?: string
}

const honors: HonorItem[] = [
  {title:'第十八届全国大学生信息安全竞赛（创新实践赛）暨第二届“长城杯”铁人三项半决赛',desc:'一等奖','year':'2024前半'},
  { title: '"骇极杯"上海市大学生全国邀请赛', desc: '特等奖', year: '2018' },
  { title: '"湖湘杯"网络安全技能大赛', desc: '特等奖', year: '2019', img: new URL('../assets/history/2019-huxiang.png', import.meta.url).href },
  { title: '全国大学生信息安全竞赛（创新能力实践赛）', desc: '一等奖', year: '2019' },
  { title: '第二届"网鼎杯"网络安全大赛', desc: '三等奖', year: '2020', img: new URL('../assets/history/2020-wangding.jpg', import.meta.url).href },
  {title: '第五届"河南省高等学校信息安全对抗大赛"', desc: '一等奖1项，二等奖2项，三等奖1项', year: '2021',img:new URL('../assets/history/2021-xinxi.jpg', import.meta.url).href },
  {title:'第七届"湖湘杯"网络安全技能大赛',desc:'二等奖',year:'2021',img:new URL('../assets/history/2021-huxiang.jpg', import.meta.url).href},
  {title:'河南省"金盾信安杯"等',desc:'多项奖项','year':'2021'},
  {title:'第六届"河南省高等学校信息安全对抗大赛"',desc:'一等奖1项，二等奖2项','year':'2022'},
  {title:'河南省第四届"金盾信安杯"网络安全大赛',desc:'多项奖项','year':'2022'},
  {title:'全国大学生信息安全竞赛等',desc:'三等奖','year':'2022'},
  {title:'第七届"御网杯网络安全大赛网"',desc:'一等奖3项','year':'2023'},
  {title:'上海市大学生全国邀请赛暨磐石行动',desc:'三等奖','year':'2023'},
  {title:'第四届"长城杯"信息安全铁人三项总决赛',desc:'二等奖','year':'2023'},
  {title:'全国大学生信息安全与对抗技术竞赛',desc:'一等奖多项奖项','year':'2023'},
  {title:'河南省第五届"金盾信安杯"网络安全大赛',desc:'多项奖项','year':'2023'},
  {title:'第十七届全国大学生信息安全竞赛总决赛',desc:'一等奖','year':'2024后半'},
  {title:'数字中国创新大赛卫星应用数据安全赛道暨第四届"红明谷"杯大赛',desc:'三等奖','year':'2024前半'},
  {title:'"长城杯"信息安全铁人三项赛半决赛',desc:'一等奖','year':'2024前半'},
  {title:'"长城杯"信息安全铁人三项赛总决赛',desc:'三等奖','year':'2024前半'},
  {title:'首届教育信息技术应用创新大赛总决赛',desc:'全国特等奖','year':'2024后半'},
  {title:'第八届“御网杯”信息安全大赛',desc:'线下一等奖证书15个','year':'2024后半'},
  {title:'河南省第六届“金盾信安杯”网络与数据安全大赛',desc:'亚军','year':'2024后半'},

]

// 按年份分组
const groupedHonors = computed(() => {
  return honors.reduce((acc, honor) => {
    const year = honor.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(honor)
    return acc
  }, {} as Record<string, HonorItem[]>)
})

// 图片预览相关逻辑
const previewVisible = ref(false)
const previewImageUrl = ref('')

const openPreview = (imgUrl: string) => {
  previewImageUrl.value = imgUrl
  previewVisible.value = true
  document.body.style.overflow = 'hidden'
}

const closePreview = () => {
  previewVisible.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.honor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.year-card {
  background: #081524;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.year-header {
  padding: 12px 16px;
  background: var(--primary);
  color: #083e34;
  font-weight: bold;
}

.year-honors {
  padding: 16px;
}

.honor-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #083e34;
}

.honor-item:last-child {
  border-bottom: none;
}

.honor-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

/* 只有有图片的才添加点击效果 */
.clickable-image {
  cursor: zoom-in;
  transition: transform 0.2s;
}

.clickable-image:hover {
  transform: scale(1.02);
}

.honor-details {
  flex-grow: 1;
}
.p-muted2 {
  color: #666;
  font-size: 1em;
  margin-top: 4px;
}
</style>
