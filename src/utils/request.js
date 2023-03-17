// axios 二次封装
import axios from 'axios'
import store from '@/store'
// 1. 创建axios对象
// {
//   baseURL: process.env.VUE_APP_BASE_API
// }
const service = axios.create();

// 2.添加请求拦截器    ---前端给后端的东西，还没到后端
// token头封装携带过去 没必要每次写的时候 都写一下headers
service.interceptors.request.use(config => {
  let token = store.state.user.token;
  if(token){
    // 请求接口传递token给后端
    config.headers['Authorization'] = token;
  }
  // 在发送请求之前做些什么
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 3.添加响应拦截器    ---后端给前端的东西
// 判断code码
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default service