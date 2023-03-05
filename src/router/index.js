import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CoursePlay from '../views/course/CoursePlay'

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
    name:'course-info',
    component: () => import('../views/course/CourseInfo.vue'),
  },
  {
    path:'/course-play/:courseId/:chapterId',
    name:'course-play',
    component: CoursePlay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
