<template>
  <div>
	  <router-view></router-view>
    <CoursePlayMain></CoursePlayMain>
    <Foot></Foot>
  </div>
</template>
<script>
import CoursePlayMain from '@/components/course/CoursePlayMain.vue'
import Foot from '@/components/common/Foot'
export default {
  name: "Home",
  components:{
  	CoursePlayMain,
  	Foot
  }
};
</script>
