<template>
  <div>
    <el-card style="margin:20px 0;">
      <CategorySelect :show="scene!==0" @getCategoryId="getCategoryId" @getCategoryId3="getCategory3Id" />
    </el-card>
    <el-card>
      <!-- 底部有三部分切换 -->
      <div v-show="scene===0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table border :data="records">
          <el-table-column width="80" label="序号" type="index" align="center" />
          <el-table-column label="SPU名称" prop="spuName" />
          <el-table-column label="SPU描述" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <hint-button title="添加SPU属性" type="success" icon="el-icon-plus" size="mini" @click="addSku(row)" />
              <hint-button title="修改Spu" type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" />
              <hint-button title="查看Spu" type="info" icon="el-icon-info" size="mini" @click="lookSku(row)" />
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row.id)">
                <hint-button slot="reference" title="删除Spu" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align:center;" :total="total" :current-page="page" :page-size="limit" :page-sizes="[3,5,10]" layout=" prev, pager, next, jumper, ->,total, sizes, slot" @size-change="sizeChange" @current-change="currentChange" />
      </div>

      <!-- 子组件 spu/sku form -->
      <SpuForm v-show="scene===1" ref="spu" @changeScene="changeScene" />
      <SpuInfo v-show="scene===2" ref="sku" @changeScene="changeScene" />
    </el-card>
    <el-dialog :before-close="handlerClose" :title="spu.spuName" :visible.sync="dialogTableVisible">
      <el-table v-loading="loading" :data="skuList" border>
        <el-table-column prop="skuName" label="名称" width="150" />
        <el-table-column property="price" label="价格" width="200" />
        <el-table-column property="weight" label="重量" />
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:90px;height:90px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import SpuForm from './SpuForm/index.vue'
import SpuInfo from './SpuInfo/index.vue'

export default {
  name: 'Spu',
  components: { SpuForm, SpuInfo },
  data() {
    return {
      dialogTableVisible: false,
      loading: true,
      skuList: [],
      spu: {},
      // 页码
      page: 1,
      // 每页数据
      limit: 3,
      // 总记录数
      total: 0,
      // 列表数据
      records: [],
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 0展示列表/1展示spu/2展示sku
      scene: 0
    }
  },
  methods: {
    // 更新三级id
    getCategory3Id(id) {
      this.category3Id = id
    },
    // 获取 1/2/3级 ID
    async getCategoryId(data) {
      this.category1Id = data.category1Id
      this.category2Id = data.category2Id
      this.category3Id = data.category3Id
      this.getSpuList()
    },
    // 获取信息
    async getSpuList() {
      const result = await this.$API.spu.getSpuList(
        this.page,
        this.limit,
        this.category3Id
      )
      if (result.code === 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    // 分页回调
    currentChange(page) {
      this.page = page
      this.getSpuList()
    },
    // 每页展示数据回调
    sizeChange(size) {
      this.limit = size
      this.getSpuList()
    },
    // 用户点击添加SPU按钮
    addSpu() {
      this.scene = 1
      this.$refs.spu.initSpuInfo(this.category3Id)
    },
    // 修改Spu
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuInfo(this.category3Id, row)
    },
    changeScene(i) {
      this.scene = i
      // 获取新数据
      this.getSpuList()
    },
    // 删除spu
    async deleteSpu(spuId) {
      const res = await this.$API.spu.deleteSpu(spuId)
      if (res.code === 200) {
        this.$message('删除成功')
        this.getSpuList()
      }
    },
    // 点击添加sku属性
    addSku(row) {
      this.scene = 2
      // 调用子组件方法获取数据
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    async lookSku(row) {
      this.spu = row
      this.dialogTableVisible = true
      const res = await this.$API.sku.reqSkuList(row.id)
      if (res.code === 200) {
        this.skuList = res.data
        this.loading = false
      }
    },
    // 关闭对话框回调
    handlerClose(done) {
      this.loading = true
      this.skuList = []
      done()
    }
  }
}
</script>

<style></style>
