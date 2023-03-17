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
  },
  metaInfo () {
    return {
      title: '视频播放',
      meta:[{
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        }]
    }	
  }
};
</script>
