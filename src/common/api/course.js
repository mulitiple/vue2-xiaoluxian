// 所有请求都是关于课程的
import request from '@/utils/request'

// 查询最新课程
export function getMostNew( params ){
  return request({
    url:'/api/course/mostNew',
    method:'post',
    data: params
  })
}

// 获取一级分类
export function getFirstCategorys(){
  return request({
    url:'/api/course/category/getFirstCategorys',
  })
}

// 获取二级分类
export function getSecondCategorys( params ){
  return request({
    url:'/api/course/category/getSecondCategorys',
    method:'get',
    params
  })
}

// 查询课程标签
export function getCourseTag( params ){
  return request({
    url:'/api/course/tags/list',
    method:'post',
    data: params
  })
}

// 查询课程
export function courseSearch( params ){
  return request({
    url:'/api/course/search',
    method:'post',
    data: params
  })
}

// 课程详情
export function getCourseDetail( params ){
  return request({
    url:'/api/course/getDetail',
    method:'GET',
    params
  })
}

// 下载课程资料
export function downloadAttachment( params ){
  return request({
    url:'/api/course/downloadAttachment',
    method:'GET',
    params,
    responseType: 'blob',
  })
}

// 播放课程
export function playerPlay( params ){
  return request({
    url:'/api/player/play',
    method:'GET',
    params,
  })
}