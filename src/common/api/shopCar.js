import request from '@/utils/request'

// 添加购物车
export function addShopCar(data,token){
  return request({
    url:'api/shopcar/addShopCar',
    method:'post',
    data,
    headers:{
      token
    }
  })
}

// 获取购物车商品数据
export function getShopCarList(){
  return request({
    url:'api/shopcar/getShopCarList',
    method:'get',
  })
}

// 删除购物车数据
export function deleteShopCar(params,token){
  return request({
    url:'api/shopcar/deleteShopCar',
    method:'get',
    params,
    headers:{
      token
    }
  })
}

// 去结算
export function settlement(data){
  return request({
    url:'api/order/settlement',
    method:'post',
    data
  })
}

// 微信结算
export function wxpay(data){
  return request({
    url:'api/pay/wxpay/createOrder',
    method:'post',
    data
  })
}

// 支付宝结算
export function alipay(data){
  return request({
    url:'api/alipay/createOrder',
    method:'post',
    data
  })
}