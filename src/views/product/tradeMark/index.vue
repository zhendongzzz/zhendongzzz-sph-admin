div
<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog">添加</el-button>
    <!-- 表格组件
    data:数据 ---- 数组类型（唯一）
    border：边框
    column：lie
    label：标题
    width：宽度
    algin：标题对齐方式 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" width="80px" prop="prop" align="center" label="序号" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="prop" label="品牌LOGO">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 70px; height: 70px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTrademark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      分页器
      @size-change="handleSize"
      @current-change=""
    -->
    <el-pagination style="margin-top: 20px; text-align: center" :total="total" :current-page="page" :page-count="7" :page-size="limit" :page-sizes="[3, 5, 10]" layout=" prev, pager, next, jumper, ->,sizes, total" @size-change="handleSize" @current-change="getPageList" />
    <!-- 弹出对话框
     :visible.sync：控制对话框的显示与隐藏
    -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" style="width:80%;" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 当前页码
      page: 1,
      // 每页多少条数据
      limit: 3,
      // 总数居条数
      total: 0,
      // 列表展示数据
      list: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表单验证规则

      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌LOGO', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 获取品牌列表
    async getPageList(p = 1) {
      this.page = p
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSize(s) {
      this.limit = s
      this.getPageList()
    },
    // 点击添加品牌按钮
    showDialog() {
      this.dialogFormVisible = true
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 点击修改品牌按钮
    updateTradeMark(row) {
      this.dialogFormVisible = true
      this.tmForm = row
      console.log(row)
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 点击确定
    addOrUpdate() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.dialogFormVisible = false
          // 发请求
          if (this.tmForm.id) {
            const result = await this.$API.trademark.reqUpdateTradeMarkList(
              this.tmForm
            )
            if (result.code === 200) {
              this.$message({
                type: 'success',
                message: '修改品牌成功'
              })
            }
            this.getPageList()
          } else {
            const result = await this.$API.trademark.reqAddTradeMarkList(
              this.tmForm
            )
            if (result.code === 200) {
              this.$message({
                type: 'success',
                message: '添加品牌成功'
              })
            }
            this.getPageList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除品牌
    deleteTrademark(row) {
      this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(row.id)
          const result = await this.$API.trademark.reqDeleteTradeMarkList(
            row.id
          )
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 获取最新数据，如果当前页面展示的数据为一条，则跳转到上一页
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
