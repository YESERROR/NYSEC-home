<template>
  <section id="members" class="section">
    <div class="inner">
      <RevealOnScroll>
        <h2 class="h-title">主要成员</h2>
        <span class="beside-span">leading member</span>
        <p class="p-muted">由经验丰富的选手与新手组成，互相学习，共同进步。</p>
      </RevealOnScroll>

      <div v-for="group in groups" :key="group.year" class="year-group">
        <h3 class="year-title">{{ group.year }}级</h3>
        <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:10px"
        >
          <RevealOnScroll
              v-for="(m, idx) in group.members"
              :key="m.name"
              :delay="idx * 80"
          >
            <div
                class="card"
                style="display:flex;gap:12px;align-items:center;cursor:pointer;"
                @click="openMember(m)"
            >
              <div
                  style="width:64px;height:64px;border-radius:8px;background:#0b1220;overflow:hidden;display:grid;place-items:center;"
              >
                <img
                    :src="m.avatar"
                    :alt="m.name"
                    style="width:100%;height:100%;object-fit:cover;"
                />
              </div>
              <div>
                <div style="font-weight:700">{{ m.name }}</div>
                <div class="p-muted" style="margin-top:6px">{{ m.skill }}</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <transition name="fade-zoom">
      <div v-if="selectedMember" class="modal-overlay" @click="closeMember">
        <div class="modal-content" @click.stop>
          <img
              :src="selectedMember.avatar"
              :alt="selectedMember.name"
              style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:10px;"
          />
          <h2>{{ selectedMember.name }}</h2>
          <p class="p-muted" style="margin-bottom:10px">{{ selectedMember.skill }}</p>
          <p style="text-align:center;">{{ selectedMember.description }}</p>
          <button class="close-btn" @click="closeMember">关闭</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'

const groups = [
  {
    year: 21,
    members: [
      {
        name: '王曦',
        skill: '渗透神中神,超级神的那种',
        avatar: new URL('../assets/Members/王总.png', import.meta.url).href,
        description: '王总yyds，保时捷富哥，月入100w。'
      },
      {
        name: 'p001water',
        skill: 'web,内网研究，开发大佬',
        avatar: new URL('../assets/Members/p001water.jpg', import.meta.url).href,
        description: '博客：https://p001water.github.io/'
      },
      {
        name: '12edamancy',
        skill: 'web，漂亮学姐',
        avatar: new URL('../assets/Members/12edamancy.jpg', import.meta.url).href,
        description: '某音知名博主&nbsp;&nbsp;&nbsp;'
      },
    ]
  },
  {
    year: 22,
    members: [
      {
        name: 'ix221',
        skill: 'Reverse',
        avatar: new URL('../assets/Members/ix221.png', import.meta.url).href,
        description: '逆向大佬，博客：https://ix221.github.io'
      },
      {
        name: 'Ba0',
        skill: 'Reverse',
        avatar: new URL('../assets/Members/Ba0.jpg', import.meta.url).href,
        description: '全栈大佬，博客：https://https://wmba0.github.io'
      },
      {
        name: 'NeverCat',
        skill: 'web，渗透神',
        avatar: new URL('../assets/Members/NeverCat.jpg', import.meta.url).href,
        description: '重生之我在南阳理工讲渗透'
      },
      {
        name: 'FightnvrGP',
        skill: '开发大佬，运维大哥',
        avatar: new URL('../assets/Members/FightnvrGP.jpg', import.meta.url).href,
        description: '。。。。。。'
      },
      {
        name: 'Raining',
        skill: '掌管cve的神，pwn佬，iot',
        avatar: new URL('../assets/Members/Raining.jpg', import.meta.url).href,
        description: '小伙子，你想要cve吗？我教你：微信公众号：Raining101'
      },
    ]
  },
  {
    year: 23,
    members: [
      {
        name: 'lpp',
        skill: 'Pwn / 漏洞利用',
        avatar: new URL('../assets/Members/lpp.jpg', import.meta.url).href,
        description: '精通内存漏洞利用与系统调试。'
      },
      {
        name: 'Sygsdsg',
        skill: 'Web / 应急响应',
        avatar: new URL("../assets/Members/Sygsdsg.jpg", import.meta.url).href,
        description: '大帅哥。看我别看太久，不然你的电脑就要沦陷了'
      },
      {
        name: '雪落无痕',
        skill: 'Crypto / 算法',
        avatar: new URL('../assets/Members/雪落无痕.jpg', import.meta.url).href,
        description: '掌管flag的神'
      },
      {
        name: 'Obito',
        skill: 'Web / 内网渗透',
        avatar: new URL('../assets/Members/Obito.jpg', import.meta.url).href,
        description: 'pip install iscc-flag：一键获得flag'
      },
      {
        name: 'Aotem',
        skill: 'Reverse / C++高端开发攻城狮',
        avatar: new URL('../assets/Members/Aotem.jpg', import.meta.url).href,
        description: '逆的了程序，却逆不了你的心'
      },
      {
        name: '是天天天天谷音',
        skill: 'Web / 云音科技CEO',
        avatar: new URL('../assets/Members/汉武帝.jpg', import.meta.url).href,
        description: '云音科技，伴你相随。股票代码：000001'
      },
      {
        name: '十二',
        skill: 'Web / 渗透 / 应急',
        avatar: new URL('../assets/Members/十二.jpg', import.meta.url).href,
        description: '一只Web狗，爬在外网口，眼睛黑黝黝，想要shell头,唯求内网心'
      }
    ]
  },
  {
    year: 24,
    members: [
      {
        name: '千秋霸业',
        skill: '歪脖',
        avatar: new URL('../assets/Members/千秋霸业.jpg', import.meta.url).href,
        description: 'web高手，新生不会的可以来问'
      },
      {
        name: '十万伏特',
        skill: '一只Web狗',
        avatar: new URL('../assets/Members/十万伏特.jpg', import.meta.url).href,
        description: '别眨眼，我要跑路了'
      },
      {
        name: '假设的人',
        skill: '核动力驴 / 运维狗',
        avatar: new URL('../assets/Members/me.png', import.meta.url).href,
        description: '平台坏了别找我'
      },
      {
        name: '白恩',
        skill: 'Reverse ',
        avatar: new URL('../assets/Members/白恩.jpg', import.meta.url).href,
        description: '出题高手，新生做出来不要来锤我'
      }
    ]
  }
]
const selectedMember = ref<any>(null)

function openMember(member: any) {
  selectedMember.value = member
}

function closeMember() {
  selectedMember.value = null
}
</script>

<style scoped>
.year-group {
  margin-top: 30px;
}
.year-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  border-left: 4px solid #026745;
  padding-left: 8px;
}
/* 弹窗遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

/* 弹窗内容 */
.modal-content {
  background: #026745;
  padding: 20px 25px;
  border-radius: 10px;
  min-width: 320px;
  text-align: center;
  animation: popIn 0.3s ease;
}

.close-btn {
  margin-top: 10px;
  padding: 6px 14px;
  background: #0b1220;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 弹出动画 */
@keyframes popIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

.fade-zoom-enter-active, .fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from, .fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
