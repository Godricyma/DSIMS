import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import operator from '../views/signapk/Operator.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
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
      path: '/SignApk',
      name: 'operator',
      component: operator,
      meta: { title: 'SignApk' }
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
    }
  ]
})

// 抛出路由实例, 在 main.js 中引用
export default router
