import request from '../http/$http'

// 查询用户详细
// export function getUser(userId) {
//     return request({
//       url: '/cp/bus/system/user/' + praseStrEmpty(userId),
//       method: 'get',
//     })
//   }
  
// 注册用户
export function registerFn(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data,
    notNeedQS: true,
  })
}

// 注册用户
export function test(data) {
  return request({
    url: '/',
    method: 'get',
    data: data,
  })
}