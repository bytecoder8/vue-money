import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
      title: 'Главная',
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty',
      title: 'Вход',
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty',
      title: 'Регистрация',
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Категории',
    },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main',
      auth: true,
      title: 'История',
    },
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Планирование',
    },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Добавить запись',
    },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Страница записи',
    },
    component: () => import('../views/RecordDetail.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Профиль',
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      layout: 'main',
      title: 'О программе',
    },
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.matched.some(route => route.meta.auth)
  if (isAuthRequired) {
    const currentUser = firebase.auth().currentUser
    if (!currentUser) {
      next('/login?message=login')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  const appTitle = process.env.VUE_APP_TITLE
  const title = (to.meta && to.meta.title) || 'Страница'
  document.title = `${title} | ${appTitle}`
})

export default router
