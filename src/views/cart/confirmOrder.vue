<template>
  <div>
    <Header></Header>
    <ConfirmOrder></ConfirmOrder>
    <Foot></Foot>
  </div>
</template>
<script> 
import Header from '@/components/common/Header'
import Foot from '@/components/common/Foot'
import ConfirmOrder from '@/components/cart/ConfirmOrder'

export default {
  components:{
    Header,
    Foot,
    ConfirmOrder
  }
}
</script>
