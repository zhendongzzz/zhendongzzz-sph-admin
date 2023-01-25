<template>
  <div>
    <el-table border :data="records">
      <el-table-column align="center" type="index" label="序号" width="80" />
      <el-table-column prop="skuName" label="名称" width="150" />
      <el-table-column prop="skuDesc" label="描述" width="350" />
      <el-table-column label="默认图片" width="150">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80" />
      <el-table-column prop="price" label="价格(元)" width="100" />
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button v-if="row.isSale===0" type="success" icon="el-icon-sort-down" size="mini" @click="cancelSale(row)" />
          <el-button v-else type="success" icon="el-icon-sort-up" size="mini" @click="onSale(row)" />
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message('正在开发中')" />
          <el-button type="info" icon="el-icon-info" size="mini" @click="lookSku(row)" />
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteSku(row.id)">
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:center;" :total="total" :current-page="page" :page-sizes="[3,5,10]" :page-size="limit" layout="prev, pager, next, jumper, ->,sizes, total" @current-change="getData" @size-change="handelSizeChange" />
    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="40%">
      <el-row>
        <el-col style="margin: 6px;height: 40px; font-size: 18px; font-weight: bold;" push="3" :span="6">名称</el-col>
        <el-col style="margin: 6px;font-size: 16px;" :span="15">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col style="margin: 6px; height: 70px;font-size: 18px; font-weight: bold;" push="3" :span="6">描述</el-col>
        <el-col style="margin: 6px;font-size: 16px; height: 90px;" :span="15">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col style="margin: 6px;height: 40px;font-size: 18px; font-weight: bold;" push="3" :span="6">名称</el-col>
        <el-col style="margin: 6px;font-size: 16px;" :span="15">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col style="margin: 6px;height: 40px;font-size: 18px; font-weight: bold;" push="3" :span="6">平台属性</el-col>
        <el-col style="margin: 6px;height: 80px;font-size: 16px;" :span="15">
          <el-tag v-for="i in skuInfo.skuAttrValueList" :key="i.id" size="mini" type="success" style="margin-left:6px;">{{ i.attrName }}-{{ i.valueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="margin: 6px;height: 40px;font-size: 18px; font-weight: bold;" push="3" :span="6">商品图片</el-col>
        <el-col style="margin: 6px;font-size: 16px;" :span="15">
          <el-carousel trigger="click" height="260px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="width: 384px; height:300px;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      // 页码
      page: 1,
      // 每页数量
      limit: 5,
      // 总记录数
      total: 0,
      records: [],
      skuInfo: {},
      drawer: false
    }
  },
  async mounted() {
    this.getData()
  },
  methods: {
    async getData(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const res = await this.$API.sku.reqList(page, limit)
      if (res.code === 200) {
        // console.log(res)
        this.total = res.data.total
        this.records = res.data.records
      }
    },
    handelSizeChange(limit) {
      this.limit = limit
      this.getData()
    },
    // 商品上架
    async onSale(row) {
      const res = await this.$API.sku.onSale(row.id)
      if (res.code === 200) {
        row.isSale--
        this.$message({ type: 'success', message: '上架成功' })
      }
    },
    // 商品下架
    async cancelSale(row) {
      const res = await this.$API.sku.cancelSale(row.id)
      if (res.code === 200) {
        row.isSale++
        this.$message({ type: 'success', message: '下架成功' })
      }
    },
    // 查看 sku 详情
    async lookSku(row) {
      this.drawer = true
      const res = await this.$API.sku.getSkuById(row.id)
      if (res.code === 200) {
        this.skuInfo = res.data
      }
    },
    // 删除sku
    async deleteSku(skuId) {
      const res = await this.$API.sku.deleteSku(skuId)
      if (res.code === 200) {
        this.$message('删除成功')
        this.getData(this.page)
      }
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  background: #dec97d;
  border-radius: 50%;
}
</style>
