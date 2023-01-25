import request from '@/utils/request.js'

// 获取商品attrInfoList
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

// 获取imageList GET
export const reqSpuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

// 获取spuSaleAttrList
export const reqSpuSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

// 保存 sku   /admin/product/saveSkuInfo
export const saveSkuInfo = (skuInfo) => {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
  })
}

// 请求 sku 列表 /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}

// 获取 sku 列表数据 /admin/product/list/{page}/{limit}
export const reqList = (page, limit) => {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}
// 商品上架 /admin/product/onSale/{skuId}
export const onSale = (skuId) => {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}
// 下架 /admin/product/cancelSale/{skuId}
export const cancelSale = (skuId) => {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}
// 获取 sku 详情 /admin/product/getSkuById/{skuId}
export const getSkuById = (skuId) => {
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
  })
}
// 删除 sku /admin/product/deleteSku/{skuId}
export const deleteSku = (skuId) => {
  return request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
}
