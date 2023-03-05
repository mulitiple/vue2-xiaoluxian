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
  }
}
</script>
