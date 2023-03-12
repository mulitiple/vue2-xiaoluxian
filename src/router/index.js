import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CoursePlay from '../views/course/CoursePlay'
import Cart from '../views/cart/Cart'
import confirmOrder from '../views/cart/confirmOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('../views/course/Course.vue')
  },
  {
    path:'/course-info/:courseId',
    name:'Course-info',
    component: () => import('../views/course/CourseInfo.vue'),
  },
  {
    path:'/course-play/:courseId/:chapterId',
    name:'Course-play',
    component: CoursePlay
  },
  {
    path:'/cart',
    name:'Cart',
    component: Cart,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/confirmOrder',
    name:'confirmOrder',
    component: confirmOrder,
    meta:{
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('token');
  if( to.matched.some(item => item.meta.requiresAuth)){
    // 需要进行拦截
    if( !token ){
      next('/');
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router