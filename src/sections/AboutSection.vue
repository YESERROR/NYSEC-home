<script setup lang="ts">
import RevealOnScroll from "../components/RevealOnScroll.vue";
import {reactive,ref} from "vue";
import type{Terminal, DragConfig, SuccessFunc, FailedFunc, Message } from "vue-web-terminal";
import {TerminalApi} from "vue-web-terminal";

const dragConf = reactive<DragConfig>({
  width: "90%",
  height: "60%",
  zIndex: 1,
  init: {
    x: 100,
    y: 300
  },
  pinned: true
})

const message=reactive<Message>({
  "type": "html",
  content: `
    <style>
      .typing-container {
        font-family: monospace;
        line-height: 1.5;
      }
      .typing-line {
        color: #00ffaa;
        white-space: nowrap;
        overflow: hidden;
        border-right: 3px solid;
        width: 0;
        display: block;
        margin-bottom: 0.5em;
      }
      .line0 {
        animation: typing 3s steps(40, end) forwards,
                  blink-caret 0.75s step-end 4;
      }
      .line1 {
        animation: typing 3s steps(40, end) 3s forwards,
                  blink-caret 0.75s step-end 3s 4;
      }
      .line2 {
        animation: typing 3s steps(40, end) 6s forwards,
                  blink-caret 0.75s step-end 6s 4;
      }
      .line3 {
        animation: typing 3s steps(40, end) 8s forwards,
                  blink-caret 0.75s step-end 8s 4;
      }
      @keyframes typing {
        to { width: 100%; }
      }
      @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: #000; }
      }
    </style>
    <div class="typing-container">
      <span class="typing-line line0">Terminal initializing......</span>
      <span class="typing-line line1">nysec战队是由南阳理工学院计算机与软件学院中热爱网络安全的师生组成的网络安全战队。我们致力于攻防渗透，CTF网络安全竞赛的学习研究。</span>
      <span class="typing-line line2">战队成员代表学院参加网络安全攻防竞赛、攻防演练，并获得诸多优异成绩。</span>
      <span class="typing-line line3">我们的目标是培养更多网络安全人才，提高学生的网络安全意识和技能，为国家网络安全事业做出贡献</span>
    </div>
  `
})

const hiddenFiles: { name: string; type: 'dir' | 'file'; content?: string }[] = [
  { name: '.yht_secret', type: 'file', content:"额。。。还没想好" },
  { name: '.FLAG2', type: 'file', content:"_It_is_the_first_step_in_learning_about_web_safety}" },
]

const fs:Record<string, { name: string; type: 'dir' | 'file'; content?: string }[]> = {
  '/': [{
    name: 'home',
    type: 'dir',
    },
    {
      name: 'var',
      type: 'dir',
    },
    {
      name: 'etc',
      type: 'dir',
    }],
  '/home': [{
    name: 'nysec',
    type: 'dir',
  }],
  '/home/nysec': [
    {
      name:'myfile',
      type:'file',
      content:'my bolg https://www.nysec.xyz'
    },
    {
      name:'download',
      type:'dir'
    }],
  '/var': [{
    name:'log',
    type:'dir'
  }],
  '/etc': []
}

// 当前目录
const currentDir = ref<string>('/home/nysec')

const onExecCmd = (
    key: string,
    command: string,
    success: SuccessFunc,
    failed: FailedFunc
) => {
  if (key === 'cd') {
    const args = command.trim().split(/\s+/).slice(1) // 获取参数
    if (args.length === 0) {
      currentDir.value = '/'
      success({
        type: 'normal',
        content: `已回到根目录: ${currentDir.value}`
      })
      return
    }

    let target = args[0]
    // 规范化路径（去掉多余的 /）
    target = target.replace(/\/+/g, '/').replace(/\/$/, '') || '/'

    if (!target.startsWith('/')) {
      if (currentDir.value.length === 1) {
        target = '/'+target
      }
      else {
        target = currentDir.value+'/'+target
      }
    }else if(target.startsWith('./')){
      target = currentDir.value+target.replace('./','/')
    }


    if (fs[target as keyof typeof fs]) {
      currentDir.value = target
      success({
        type: 'normal',
        content: `当前目录: ${currentDir.value}`
      })
    } else {
      failed(`cd: 没有这样的目录: ${args[0]}`)
    }
  } else if (key === 'ls') {
    const args = command.trim().split(/\s+/).slice(1)
    const showAll = args.includes('-a')
    const currentFiles  = fs[currentDir.value as keyof typeof fs]
    const list = showAll ? [...currentFiles, ...hiddenFiles] : currentFiles
    const html=`<ul class="custom-content">
    ${list.map(item => `<li class="${item.type === 'dir' ? 't-dir' : 't-file'}">${item.name}</li>`).join('')}
  </ul><style>
.t-dir {
  color: cornflowerblue;
}
.t-file {
  color: greenyellow;
}
</style>`
    success({
      type: 'html',
      content: html
    })
  } else if (key === 'pwd') {
    success({
      type: 'normal',
      content: currentDir.value
    })
  } else if (key === 'env') {
    success({
      type: 'html',
      content: `<p>USER=nysec</p>
                <p>HOME=/home/nysec</p>
                <p>PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin</p>
                <p>FLAG1=NYSEC{linux_terminal</p>`
    })
  }else if (key === 'cat') {
    const args = command.trim().split(/\s+/).slice(1)
    if (args.length === 0) {
      failed('cat: 缺少文件参数')
      return
    }

    const fileName = args[0]
    const currentFiles = fs[currentDir.value as keyof typeof fs] || []
    const file = [...currentFiles, ...hiddenFiles].find(
        (f) => f.name === fileName && f.type === 'file'
    )

    if (file && file.content) {
      success({ type: 'normal', content: file.content })
    } else {
      failed(`cat: 文件不存在: ${fileName}`)
    }
  }else if (key === 'clear') {
    TerminalApi.clearLog('my-terminal')
    success()
  }
 else{
    failed(`未知命令：${key}`)
  }
}

</script>

<template>
  <section id="recruit" class="section">
    <div class="inner">
      <RevealOnScroll>
        <h1 class="h-title">关于我们</h1>
        <span class="beside-span">About Us</span>
        <p class="p-muted">WHOAMI!</p>
      </RevealOnScroll>
      <div class="card" style="height: 350px" >
        <terminal name="my-terminal"
                  theme='dark'
                  title="nysec终端"
                  :enable-input-tips="false"
                  :boolean="false"
                  :enable-default-command="false"
                  :context="currentDir"
                  :drag-conf="dragConf"
                  :init-log="[message]"
                  @exec-cmd="onExecCmd"
        ></terminal>
      </div>


    </div>
  </section>

</template>

<style scoped>
.about-section {
  font-size: 18px;
  line-height: 1.8;
  color: #0ff;
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background-color: #000;
  font-family: 'Courier New', monospace;
}

.hack-text {
  margin-bottom: 20px;
  text-shadow: 0 0 5px #0ff, 0 0 10px #00f;
  white-space: pre-wrap;
}
.typing-effect {
  font-family: monospace; /* 等宽字体效果更好 */
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  border-right: 3px solid; /* 光标效果 */
  width: fit-content; /* 宽度适应内容 */

  /* 动画效果 */
  animation:
      typing 3.5s steps(40, end),
      blink-caret 0.75s step-end infinite;
}
/* 打字动画 */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* 光标闪烁动画 */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #000; }
}
</style>