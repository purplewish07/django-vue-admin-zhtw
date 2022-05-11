import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/system/permission/',
    method: 'get'
  })
}

export function getAll_Batch_list() {
  return request({
    url: '/warehouse_management/storage_list/',
    method: 'get'
  })
}

export function create_Batch_list(data) {
  return request({
    url: '/warehouse_management/storage_list/',
    method: 'post',
    data
  })
}

export function update_Batch_list(id, data) {
  return request({
    url: `/warehouse_management/storage_list/${id}/`,
    method: 'put',
    data
  })
}


export function delete_Batch_list(id) {
  return request({
    url: `/warehouse_management/storage_list/${id}/`,
    method: 'delete'
  })
}
