import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import error from '../views/error.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: '洋芋田字体库'
    }
  },
  {
    path: '*',
    name: 'error',
    component: error,
    meta: {
      title: '洋芋田字体库'
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
