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
  }
}
</script>
