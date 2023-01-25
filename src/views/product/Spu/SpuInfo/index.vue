<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" type="number" placeholder=" 价格(元)" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" rows="3" placeholder="规格描述" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="item in attrInfoList" :key="item.id" :label="item.attrName">
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="j in item.attrValueList" :key="j.id" :label="j.valueName" :value="`${item.id}:${j.id}`" />
            </el-select>

          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form v-for="i in spuSaleAttrList" :key="i.id" inline label-width="80px">
          <el-form-item :label="i.saleAttrName">
            <el-select v-model="i.AttrIdAndValueId" placeholder="请选择">
              <el-option v-for="j in i.spuSaleAttrValueList" :key="j.id" :label="j.saleAttrValueName" :value="`${i.id}:${j.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="spuImageList" @selection-change="handlerSelect">
          <el-table-column type="selection" prop="prop" align="center" label="label" width="80px" />
          <el-table-column label="图片" width="200px">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:70px;height:70px">
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="{row}">
              {{ row.imgName }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault===0" type="primary" size="mini" @click="changeDefault(row)">设为默认</el-button>
              <el-button v-else size="mini">默认</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuInfo',
  data() {
    return {
      // 平台属性列表
      attrInfoList: [],
      // 图片信息列表
      spuImageList: [],
      // 销售属性列表
      spuSaleAttrList: [],
      skuInfo: {
        category3Id: 0,
        price: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // }
        ],
        skuDefaultImg: '',
        skuDesc: '',
        skuImageList: [
          // {
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          // }
        ],
        skuName: '',
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          // }
        ],
        spuId: 0,
        tmId: 0,
        weight: 0
      },
      spu: {
        spuName: ''
      },
      imageList: []
    }
  },
  methods: {
    // 获取数据
    async getData(category1Id, category2Id, row) {
      // 收集父组件数据
      this.spu.spuName = row.spuName
      this.skuInfo.spuId = row.id
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.tmId = row.tmId
      // 获取spuSaleAttrList数据
      const res1 = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if (res1.code === 200) {
        this.spuSaleAttrList = res1.data
      }
      // 获取SpuImageList数据
      const res2 = await this.$API.sku.reqSpuImageList(row.id)
      if (res2.code === 200) {
        const list = res2.data
        list.forEach(element => {
          element.isDefault = 0
        })
        this.spuImageList = list
      }
      // 获取AttrInfoList数据
      const res3 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        row.category3Id
      )
      if (res3.code === 200) this.attrInfoList = res3.data
    },
    // 点击勾选框的回调
    handlerSelect(data) {
      this.imageList = data
    },
    // 点击设为默认按钮
    changeDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 点击保存按钮
    async saveSkuInfo() {
      const { attrInfoList, spuSaleAttrList, skuInfo, imageList } = this
      // 整理skuAttrValueList参数 ： 方法1
      const arr = []
      attrInfoList.forEach(item => {
        if (item.attrIdAndValueId) {
          const [attrId, ValueId] = item.attrIdAndValueId.split(':')
          const obj = { ValueId, attrId }
          arr.push(obj)
        }
      })
      skuInfo.skuAttrValueList = arr
      // 整理spuSaleAttrList ： 方法2
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.AttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.AttrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发请求
      const res = await this.$API.sku.saveSkuInfo(skuInfo)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '添加SKU成功'
        })
        this.$emit('changeScene', 0)
      }
      this.skuInfo.skuDesc = ''
      this.skuInfo.weight = 0
      this.skuInfo.skuName = ''
      this.skuInfo.price = ''
    },
    // 点击取消
    cancel() {
      this.$emit('changeScene', 0)
      this.skuInfo.skuDesc = ''
      this.skuInfo.weight = 0
      this.skuInfo.skuName = ''
      this.skuInfo.price = ''
    }
  }
}
</script>

<style>
</style>
