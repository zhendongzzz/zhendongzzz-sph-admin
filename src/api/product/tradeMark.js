// 获取品牌管理的数据模块
import request from '@/utils/request'

// 获取品牌列表的接口
export function reqTradeMarkList(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

// 添加品牌
export function reqAddTradeMarkList(data) {
  return request({
    url: '/admin/product/baseTrademark/save',
    method: 'post',
    data
  })
}

// 修改品牌
export function reqUpdateTradeMarkList(data) {
  return request({
    url: '/admin/product/baseTrademark/update',
    method: 'put',
    data
  })
}

// 删除品牌
export function reqDeleteTradeMarkList(id) {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
