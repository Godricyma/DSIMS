import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import operator from '../views/signapk/Operator.vue'
import store from '@/store/index'
import storage from '@/store/storage'


// createRouter 创建路由实例
const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [{
      path: '/',
      redirect: '/home'
    },{
      path: '/home',
      name: 'home',
      component: home,
      meta: {title: '首页' }
    },{
      path: '/login',
      naem: 'login',
      component: () => import('../views/Login.vue'),
      meta: { title: '登录' }
    },{
      path: '/SignApk',
      name: 'operator',
      component: operator,
      meta: { title: 'SignApk' }
    },{
      path: '/patchimport',
      name: 'patchimport',
      component: () => import('../views/patchimport/PatchImport.vue'),
      redirect: '/patchimport/history',
      meta: { title: 'PatchImport' },
      children: [{
        path: 'history',
        component: () => import('../views/patchimport/History.vue'),
        // meta: { title: '历史' }
      },{
        path: 'create',
        component: () => import('../views/patchimport/Create.vue'),
        meta: { title: '创建' }
      }]
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
  } else {
    if (storage.get('token')) {
      store.commit('saveToken', storage.get('token'))
      next()
    } else {
      next('/login')
    }
  }
});

// 抛出路由实例, 在 main.js 中引用
export default router
