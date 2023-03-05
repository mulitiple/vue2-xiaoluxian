import request from '@/utils/request'

export function createToken( ){
  return request({
    url:'/api/token/createToken',
  })
}