// 平台属性管理接口
import request from '@/utils/request.js'

// 获取一级分类
export function getCategory1() {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}

// 获取二级分类
export function getCategory2(category1Id) {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

// 获取三级分类
export function getCategory3(category2Id) {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

// 获取商品属性
export function getAttrInfoList({ category1Id, category2Id, category3Id }) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

// 添加属性与属性值
export function saveAttrInfo(data) {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
// 删除属性值
export function deleteAttr(attrId) {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
