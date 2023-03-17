<template>
  <div class="home">
    <Header></Header>
    <NavSwiper></NavSwiper>
    <NewGood></NewGood>
    <Foot></Foot>
  </div>
</template>
<script> 
import Header from '@/components/common/Header'
import Foot from '@/components/common/Foot'
import NavSwiper from '@/components/index/NavSwiper'
import NewGood from '@/components/index/NewGood'

export default {
  name: 'Home',
  components:{
    Header,
    Foot,
    NavSwiper,
    NewGood
  },
  metaInfo () {
    return {
      title: '小鹿线主页',
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
