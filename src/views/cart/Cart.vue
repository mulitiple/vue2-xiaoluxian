<template>
  <div>
    <Header></Header>
    <CartMain></CartMain>
    <Foot></Foot>
  </div>
</template>
<script> 
import Header from '@/components/common/Header'
import Foot from '@/components/common/Foot'
import CartMain from '@/components/cart/CartMain'

export default {
  components:{
    Header,
    Foot,
    CartMain
  }
}
</script>
