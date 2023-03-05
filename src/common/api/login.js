import request from '@/utils/request'

// 用户名和密码登录
export function loginByJson(params){
  return request({
    url:'/api/u/loginByJson',
    method: 'post',
    data:params
  })
}

// 获取个人信息
export function getInfo(){
  return request({
    url:'/api/member/getInfo',
    method: 'get',
  })
}

// 发送登录/注册验证码
export function sendCaptcha(params){
  return request({
    url:'/api/sms/sendRegisterOrLoginCaptcha',
    method: 'get',
    params
  })
}

// 手机验证码登录
export function loginByMobile(data){
  return request({
    url:'/api/u/loginByMobile',
    method: 'post',
    data
  })
}