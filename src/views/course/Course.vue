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
  },
  metaInfo () {
    return {
      title: '小鹿线_课程列表',
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
