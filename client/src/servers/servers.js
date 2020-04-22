/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http"

//验证Ticket是否有效
export const getResultLit_servers = (postData) => {
  return HTTPREQUEST.post('/api/api-auth/', postData)
}

//用户认证
export const getResultData_servers = (postData) => {
  return HTTPREQUEST.post('/api/auth/', postData)
}

//用户认证
export const getUserId = (postData) => {
  return HTTPREQUEST.post('/api/users/{id}', postData)
}

//用户认证
export const getResultData_servers = (postData) => {
  return HTTPREQUEST.post('/api/auth/', postData)
}

//用户认证
export const getResultData_servers = (postData) => {
  return HTTPREQUEST.post('/api/auth/', postData)
}