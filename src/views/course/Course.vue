<template>
  <div>
    <Header></Header>
    <Coursemain></Coursemain>
    <Foot></Foot>
  </div>
</template>
<script> 
import Header from '@/components/common/Header'
import Foot from '@/components/common/Foot'
import Coursemain from '@/components/course/Coursemain'

export default {
  components:{
    Header,
    Foot,
    Coursemain
  }
}
</script>
