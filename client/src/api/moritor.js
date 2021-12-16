import { getToken } from "@/utils/auth"
import request from '@/utils/request'

//查看日誌列表

export function getlogList(query) {
  return request({
    url: '/monitor/log/',
    method: 'get',
    params: query
  })
}
//查看日誌詳情
export function getLog(name) {
  return request({
    url: `/monitor/log/${name}/`,
    method: 'get'
  })
}
//獲取服務器狀態信息
export function getServerList() {
  return request({
    url: '/monitor/server/',
    method: 'get'
  })
}