export default {
  state:{
    shopList:[], //购物车数据
    selectedProducts: [], // 选中的数据
  },
  getters:{
    isChecked(state){
      return state.shopList.length === state.selectedProducts.length;
    },
    total(state){
      let total = {
        price:0,
        number:0
      };
      state.shopList.forEach(item => {
        if(state.selectedProducts.indexOf(item.courseId) !== -1){
          // 选中
          total.price += item.discountPrice * item.counter;
          total.number = state.selectedProducts.length;
          // total.number += item.counter;
        }
      })
      total.price = total.price.toFixed(2);
      return total;
    }
  },
  mutations:{
    // 设置购物车数据
    setShopCar(state,list){
      // 再次获取的时候需要先清空数据
      state.shopList = [];
      state.selectedProducts = [];

      list.forEach(item => {
        item['check'] = true;
        state.selectedProducts.push(item.courseId);
      })

      state.shopList = list;

    },
    // 全选
    checkAll(state){
      state.selectedProducts = state.shopList.map(item =>{
        item['check'] = true;
        return item.courseId;
      })
    },
    // 全不选
    uncheckAll(state){
      state.shopList.forEach(item =>{
        item['check'] = false;
      })
      state.selectedProducts = [];
    },
    // 单选
    checkItem(state,index){
      // state.shopList[index].check = !state.shopList[index].check;
      // 当前点击的课程的id
      let id = state.shopList[index].courseId;
      // 当前点击的数据 在已选数组中是否存在
      let idx = state.selectedProducts.indexOf(id);
      // 如果选中
      if(idx > -1){
        state.shopList[index].check = false;
        state.selectedProducts.splice(idx,1);
      }else{
        state.shopList[index].check = true;
        state.selectedProducts.push(id);
      }
    }
  },
  actions:{
    allCheckFn({commit,getters}){
      getters.isChecked?commit("uncheckAll"):commit("checkAll")
    }
  }
}