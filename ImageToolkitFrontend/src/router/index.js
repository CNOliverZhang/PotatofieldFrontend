import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import error from '../views/error.vue'
import history from '../views/history.vue'
import about from '../views/about.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: '洋芋田图像工具箱'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: history,
    meta: {
      title: '洋芋田图像工具箱 - 历史版本'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: about,
    meta: {
      title: '洋芋田图像工具箱 - 关于'
    }
  },
  {
    path: '/404',
    name: 'error',
    component: error,
    meta: {
      title: '洋芋田图像工具箱 找不到网页'
    }
  },
  {
    path: '*',
    redirect: {
      name: 'error'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
