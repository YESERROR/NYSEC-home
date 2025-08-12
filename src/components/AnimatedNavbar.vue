<template>
  <nav class="navbar" ref="navRoot">
    <div class="nav-inner container">
      <div class="brand" @click="goHome">
        <img src="../assets/white_logo.png" class="logo" :class="{ animate: logoAnimate }" @animationend="logoAnimate = false">
<!--        <span class="title"></span>-->
      </div>

      <ul class="links" ref="linksRoot">
        <li v-for="(link, idx) in links" :key="link.path" class="link-item">
          <router-link
              :to="link.path"
              class="nav-link"
              :class="{ active: currentPath === link.path }"
              @click.native.prevent="handleNav(idx)"
          >
            <span class="nav-icon" aria-hidden="true">{{ link.icon }}</span>
            <span class="nav-text">{{ link.name }}</span>
          </router-link>
        </li>
        <div class="indicator" :style="indicatorStyle"></div>
      </ul>

      <button class="burger" @click="isOpen = !isOpen" aria-label="menu">
        <span :class="{ open: isOpen }"></span>
      </button>
    </div>

    <transition name="mobile-menu">
      <div v-if="isOpen" class="mobile-panel container">
        <router-link v-for="l in links" :key="l.path+'-m'" :to="l.path" class="mobile-link" @click.native="isOpen = false">
          <span class="nav-icon">{{ l.icon }}</span> {{ l.name }}
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { CSSProperties } from 'vue'

const router = useRouter()
const route = useRoute()

const links = [
  { name: '首页', path: '/', icon: '' },
  { name: '主要成员', path: '/members', icon: '' },
  { name: '荣誉历程', path: '/honors', icon: '' },
  { name: '招新计划', path: '/recruit', icon: '' },
  { name: '关于我们', path: '/about', icon: '' }
]

const active = ref<number>(0)
const isOpen = ref<boolean>(false)
const logoAnimate = ref<boolean>(false)

const navRoot = ref<HTMLElement | null>(null)
const linksRoot = ref<HTMLElement | null>(null)
const indicatorStyle = ref<CSSProperties>({ width: '0px', transform: 'translateX(0px)' })

const currentPath = ref(route.path)

function updateIndicator(idx = active.value) {
  if (!linksRoot.value) return
  const anchors = linksRoot.value.querySelectorAll('a.nav-link')
  if (anchors.length === 0) return
  const el = anchors[idx] as HTMLElement | undefined
  if (!el) return
  const containerRect = linksRoot.value.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  const left = r.left - containerRect.left
  indicatorStyle.value = {
    width: `${r.width}px`,
    transform: `translateX(${left}px)`,
    transition: 'transform 320ms cubic-bezier(.2,.9,.3,1), width 320ms cubic-bezier(.2,.9,.3,1)'
  }
}

function navIndexForPath(p: string) {
  return links.findIndex(l => l.path === p) || 0
}

function handleNav(idx: number) {
  const target = links[idx]
  logoAnimate.value = true
  router.push(target.path)
  isOpen.value = false
}

function goHome() { handleNav(0) }

onMounted(async () => {
  await nextTick()
  // set initial active index by route
  active.value = navIndexForPath(route.path)
  currentPath.value = route.path
  updateIndicator(active.value)
  const handler = () => updateIndicator(active.value)
  window.addEventListener('resize', handler)
  ;(window as any).__ctf_resize_handler = handler
})

watch(() => route.path, (p) => {
  currentPath.value = p
  const idx = navIndexForPath(p)
  active.value = idx
  // slight delay so DOM update happens
  setTimeout(() => updateIndicator(idx), 50)
})

onBeforeUnmount(() => {
  const h = (window as any).__ctf_resize_handler
  if (h) window.removeEventListener('resize', h)
})
</script>

<style scoped>
/* keep concise; main rules in global CSS */
.links { display:flex; gap:18px; align-items:center; position:relative; list-style:none; margin:0; padding:0; flex:1; justify-content:flex-end; }
.nav-link { display:flex; align-items:center; gap:8px; padding:8px 6px; color:var(--muted); text-decoration:none; font-weight:700; transition: all 220ms ease; border-radius:6px; }
.nav-link .nav-icon { opacity:0.85; font-size:16px; }
.nav-link:hover { color:#fff; transform:translateY(-3px) scale(1.02); text-shadow:0 4px 18px rgba(124,58,237,0.35); }
.nav-link.active { color: #fff; box-shadow: 0 6px 22px rgba(6,182,212,0.08), inset 0 -2px 18px rgba(124,58,237,0.06); }
.indicator { height:3px; bottom:-6px; left:0; position:absolute; background:linear-gradient(90deg,var(--accent1),var(--accent2)); border-radius:999px; will-change:transform,width; }

/* burger and mobile styles kept */
</style>
