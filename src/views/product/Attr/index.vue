<template>
  <div>
    <el-card style="margin:10px">
      <!-- 三级联动菜单 -->
      <Category-Select :show="!isShow" @getCategoryId="getCategoryId" @getCategoryId3="getCategoryId3" />
    </el-card>
    <el-card style="margin:10px">
      <div v-show="isShow">
        <el-button type="primary" icon="el-icon-plus" :disabled="!id3" @click="addAttr">添加属性</el-button>
        <!-- 展示平台数据表格 -->
        <el-table border style="width:100%" :data="attrList">
          <el-table-column align="center" type="index" label="序号" width="80" />
          <el-table-column label="属性名称" prop="attrName" width="150" />
          <el-table-column label="属性值列表">
            <template slot-scope="{row}">
              <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin-left:9px;" type="success">{{ item.valueName }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)" />
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttrDD(row.id)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShow">
        <el-form inline>
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="attrValueList">添加属性值</el-button>
        <el-button @click="isShow=true">取消</el-button>
        <el-table border style="margin:20px 0;" :data="attrInfo.attrValueList">
          <el-table-column type="index" align="center" label="序号" width="80" />
          <el-table-column label="属性值名称">
            <template slot-scope="{row,$index}">
              <el-input v-if="row.flag" :ref="$index" v-model="row.valueName" size="mini" placeholder="请输入属性值名称" @keyup.native.enter="toLook(row)" @blur="toLook(row)" />
              <span v-else style="display:block;width:100%;" @click="toEdit(row,$index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{$index}">
              <el-popconfirm title="确定删除该属性吗？" @onConfirm="deleteAttr($index)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttrInfo">保存</el-button>
        <el-button @click="isShow=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入 lodash 中的 深拷贝函数
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      attrList: [],
      id3: '',
      isShow: true,
      // 新增/修改的属性信息
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: undefined,
        categoryLevel: 3,
        id: undefined
      },
      res: {}
    }
  },
  methods: {
    async getList() {
      const result = await this.$API.attr.getAttrInfoList(this.res)
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    getCategoryId(data) {
      this.res = data
      this.getList()
    },
    getCategoryId3(id) {
      this.id3 = id
      if (id === '') {
        this.attrList = []
      }
      this.isShow = true
    },
    // 添加属性值
    attrValueList() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        id: undefined,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 外层添加属性按钮回调
    addAttr() {
      this.isShow = false
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.id3,
        categoryLevel: 3,
        id: undefined
      }
    },
    updateAttr(row) {
      this.isShow = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        // 添加响应式属性
        this.$set(item, 'flag', false)
      })
    },
    // 添加属性的查看与编辑的切换
    toLook(row) {
      if (row.valueName.trim() === '') {
        return this.$message('不能输入空值')
      }
      const isRepeat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isRepeat) return this.$message('不能输入重复值')
      row.flag = false
    },
    // 点击属性编辑回调
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[`${index}`].focus()
      })
    },
    // 删除属性回调
    deleteAttr(index) {
      // 当前删除不需要发请求，保存时生效
      this.attrInfo.attrValueList.splice(index, 1)
      // this.$API.attr.deleteAttr(id)
    },
    async deleteAttrDD(id) {
      try {
        await this.$API.attr.deleteAttr(id)
        this.$message({ type: 'success', message: '删除成功' })
        this.getList()
      } catch (error) {
        this.$message('删除失败')
      }
    },
    // 保存回调
    async saveAttrInfo() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })

      try {
        await this.$API.attr.saveAttrInfo(this.attrInfo)
        this.$message({ type: 'success', message: '保存成功' })
        this.getList()
        this.isShow = true
      } catch (error) {
        this.$message('保存失败')
      }
    }
  }
}
</script>

<style></style>
