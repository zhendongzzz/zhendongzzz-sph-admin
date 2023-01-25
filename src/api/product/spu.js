import request from '@/utils/request.js'

// 获取 SPU 信息列表GET
export function getSpuList(page, limit, category3Id) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })
}

// 获取Spu信息 /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}
// 获取品牌信息 /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}
// 获取 Spu 图标 GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
// 获取销售属性 限制：3个 /admin/product/baseSaleAttrList
export const reqSaleAttrList = () => {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}

// 添加或修改 spu /admin/product/updateSpuInfo  /admin/product/saveSpuInfo
export const addOrUpdate = (spuInfo) => {
  if (spuInfo.id === 0) {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo
    })
  } else {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo
    })
  }
}

// 删除spu /admin/product/deleteSpu/{spuId}
export const deleteSpu = (spuId) => {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}
