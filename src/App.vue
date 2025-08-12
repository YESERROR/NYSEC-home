<template xmlns="http://www.w3.org/1999/html">
  <div id="app">
    <AnimatedNavbar />
    <transition name="route-fade" mode="out-in">
      <router-view />
    </transition>
    <footer class="fd-logo">
      <a href="#">
        <img :src="whiteLogo" alt="" style="width: 100px">
        <img :src="logo1" alt="" style="width: 60px;margin-left: -25px; margin-top: -10px">
      </a>
      <p>站长(QQ): 1545869750</p>
      <p>NYSEC Team © 2025 All Rights Reserved.</p>
      <p>
        <a style="text-decoration: none;" href="https://beian.miit.gov.cn/">[闽ICP备2024080587号]</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AnimatedNavbar from './components/AnimatedNavbar.vue'
import whiteLogo from './assets/white_logo.png'
import logo1 from './assets/logo1.png'
</script>

<style>
footer{padding:32px;text-align:center;color:var(--muted);position:relative;z-index:10}
.route-fade-enter-active, .route-fade-leave-active {
  transition: opacity 420ms cubic-bezier(.2,.9,.3,1), transform 420ms cubic-bezier(.2,.9,.3,1);
}
.fd-logo {
  margin-bottom: 20px;
}

.fd-logo a {
  display: inline-flex;
  align-items: center;
  margin: 10px 20px 10px 40px; /* 上、右、下、左 */
}

.fd-logo img {
  height: 50px;
}
.route-fade-enter-from { opacity: 0; transform: translateY(14px) scale(0.995) }
.route-fade-enter-to { opacity: 1; transform: translateY(0) scale(1) }
.route-fade-leave-from { opacity: 1; transform: none }
.route-fade-leave-to { opacity: 0; transform: translateY(-8px) scale(0.998) }
</style>
