<template>
  <div>
    <Header></Header>
    <CourseInfoContainer></CourseInfoContainer>
    <Foot></Foot>
  </div>
</template>
<script> 
import Header from '@/components/common/Header'
import Foot from '@/components/common/Foot'
import CourseInfoContainer from '@/components/course/CourseInfoContainer.vue';

export default {
  components:{
    Header,
    Foot,
    CourseInfoContainer
  },
  metaInfo () {
    return {
      title: '小鹿线_课程详情',
      meta:[{
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        }]
    }	
  }
}
</script>
