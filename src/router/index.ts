import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeSection from '../sections/HomeSection.vue'
import MembersSection from '../sections/MembersSection.vue'
import HonorsSection from '../sections/HonorsSection.vue'
import RecruitmentSection from '../sections/RecruitmentSection.vue'
import AboutSection from '../sections/AboutSection.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: HomeSection },
    { path: '/members', name: 'Members', component: MembersSection },
    { path: '/honors', name: 'Honors', component: HonorsSection },
    { path: '/recruit', name: 'Recruit', component: RecruitmentSection },
    { path: '/about', name: 'About', component: AboutSection },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // 平滑滚动到顶部（路由切换时）
        return { top: 0, behavior: 'smooth' }
    }
})

export default router
