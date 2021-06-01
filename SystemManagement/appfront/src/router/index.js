import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/Home.vue'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { title: '首页' }
    },
    {
      path: '/patchimport',
      name: 'patchimport',
      component: () => import('../views/patchimport/PatchImport.vue'),
      // redirect: '/patchimort/create',
      meta: { title: 'patch更新' },
      children: [{
        path: 'create',
        component: () => import('../views/patchimport/Create.vue'),
        // name: 'usermanage',
        meta: { title: '提交更新' }
      }, {
        path: 'history',
        component: () => import('../views/patchimport/History.vue'),
        // name: 'mesmanage',
        meta: { title: '更新历史' }
      }]
    },
  ]
})

// 抛出路由实例, 在 main.js 中引用
export default router
