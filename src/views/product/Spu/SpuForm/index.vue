<template>
  <div>
    <el-form label-width="80px" :model="SpuInfo">
      <el-form-item label="Spu名称">
        <el-input v-model="SpuInfo.spuName" placeholder="Spu名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="SpuInfo.tmId" placeholder="请选择品牌">
          <el-option v-for="item in tradeMarkList " :key="item.id" :value="item.id" :label="item.tmName" />
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input v-model="SpuInfo.description" type="textarea" rows="4" placeholder="Spu描述" />
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload action="/dev-api/admin/product/upload" :file-list="SpuImageList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="unSelectIdAndName" :placeholder="`还有${noSelect.length}个未选择`">
          <el-option v-for="item in noSelect" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!unSelectIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border :data="SpuInfo.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="70" align="center" />
          <el-table-column label="属性名" width="120" prop="saleAttrName" />
          <el-table-column label="属性值列表">
            <template slot-scope="{row}">
              <el-tag v-for="tag in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(row,tag)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input v-if="row.inputVisible" ref="saveTagInput" v-model="row.inputValue" class="input-new-tag" size="small" @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)" />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加标签</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="SpuInfo.spuSaleAttrList.splice($index,1)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdate">保存</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-form-item />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      // 收集的照片墙列表数据
      spuImageList: [],
      // 未选择属性的 id / name
      unSelectIdAndName: '',
      // spu 信息数据
      SpuInfo: {
        category3Id: 0,
        description: '',
        id: 0,
        spuName: '',
        tmId: '',
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: '',
          //   imgUrl: '',
          //   spuId: 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: '',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: '',
          //       saleAttrName: '',
          //       saleAttrValueName: '',
          //       spuId: 0
          //     }
          //   ]
          // }
        ]
      },
      // 品牌信息列表
      tradeMarkList: [],
      // Spu 图标
      SpuImageList: [],
      // 销售属性列表
      SaleAttrList: [],
      // 预览照片墙图片的地址
      dialogImageUrl: '',
      // 控制预览显示/隐藏
      dialogVisible: false
    }
  },
  computed: {
    // 计算未选择的属性
    noSelect() {
      return this.SaleAttrList.filter(item => {
        return this.SpuInfo.spuSaleAttrList.every(i => {
          return item.name !== i.saleAttrName
        })
      })
    }
  },
  methods: {
    // 初始化数据
    async initSpuInfo(category3Id, row) {
      this.SpuInfo.category3Id = category3Id
      // 获取 spu 信息数据
      if (row) {
        const res = await this.$API.spu.reqSpu(row.id)
        if (res.code === 200) {
          this.SpuInfo = res.data
        }
      }
      // 获取品牌信息列表
      const tradeMarkList = await this.$API.spu.reqTrademarkList()
      if (tradeMarkList.code === 200) {
        this.tradeMarkList = tradeMarkList.data
      }
      // 获取 spu 图标列表
      if (row) {
        const SpuImageList = await this.$API.spu.reqSpuImageList(row.id)
        if (SpuImageList.code === 200) {
          const listImg = SpuImageList.data
          listImg.forEach(element => {
            element.url = element.imgUrl
            element.name = element.imgName
          })
          this.SpuImageList = listImg
        }
      }
      // 获取销售属性列表
      const SaleAttrList = await this.$API.spu.reqSaleAttrList()
      if (SaleAttrList.code === 200) {
        this.SaleAttrList = SaleAttrList.data
      }
    },
    // 照片墙删除回调
    handleRemove(file, fileList) {
      // file时删除的图片，fileList 代表剩余图片列表
      this.spuImageList = fileList
    },
    // 照片墙上传成功回调
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    // 照片墙预览回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 将已经收集的销售属性信息整理
      const [baseSaleAttrId, saleAttrName] = this.unSelectIdAndName.split(':')
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.SpuInfo.spuSaleAttrList.push(newSaleAttr)
      this.unSelectIdAndName = ''
    },
    // tag 标签 回调
    handleClose(row, tag) {
      row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1)
    },
    // tag 标签 回调/显示输入框
    showInput(row) {
      // 给每个row添加  inputVisible 属性，控制显示与隐藏
      this.$set(row, 'inputVisible', true)
      // 给row 添加 inputValue 属性，收集新增value值
      this.$set(row, 'inputValue', '')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // tag 标签 回调/显示 tag
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      // 判断属性值是否合法
      if (inputValue.trim() === '') {
        return this.$message('属性值不能为空')
      }
      // 判断是否重复
      const res = row.spuSaleAttrValueList.every(item => {
        return item.saleAttrValueName !== inputValue
      })
      if (!res) return this.$message('输入重复')
      const newAry = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newAry)
      console.log(row.spuSaleAttrValueList)
      row.inputVisible = false
    },
    // 点击保存: 添加或修改 apu
    async addOrUpdate() {
      // 整理数据
      // 整理照片墙数据
      this.SpuInfo.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      console.log(this.SpuInfo)
      const result = await this.$API.spu.addOrUpdate(this.SpuInfo)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '保存成功' })
      }
      this.$emit('changeScene', 0)
      Object.assign(this._data, this.$options.data())
    },
    // 点击取消
    cancel() {
      this.$emit('changeScene', 0)
      // 清理数据
      // Object.assign:ES6新增方法,可以合并对象
      // this._data 可以操作data中的响应式数据
      // this.$options可以获取配置对象,执行 data() 函数返回一个空的响应式数据
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
