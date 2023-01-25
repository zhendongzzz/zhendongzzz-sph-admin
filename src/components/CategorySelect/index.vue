<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="form">
      <el-form-item label="一级分类">
        <el-select v-model="form.category1Id" :disabled="show" placeholder="请选择" @change="handler1(form.category1Id)">
          <el-option v-for="item in list1" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-form-item label="二级分类">
          <el-select v-model="form.category2Id" :disabled="show" placeholder="请选择" @change="handler2(form.category2Id)">
            <el-option v-for="item in list2" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-form-item label="三级分类">
            <el-select v-model="form.category3Id" :disabled="show" placeholder="请选择" @change="handler3">
              <el-option v-for="item in list3" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 一级分类列表数据
      list1: [],
      // 二级分类列表数据
      list2: [],
      list3: [],
      // 表单数据双向绑定
      form: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    // 获取一级列表的数据
    this.getCategory1()
  },
  methods: {
    async getCategory1() {
      const result = await this.$API.attr.getCategory1()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    async handler1(id) {
      this.list2 = []
      this.form.category2Id = ''
      this.list3 = []
      this.form.category3Id = ''
      this.$emit('getCategoryId3', this.form.category3Id)
      const result = await this.$API.attr.getCategory2(id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    async handler2(id) {
      this.list3 = []
      this.form.category3Id = ''
      this.$emit('getCategoryId3', this.form.category3Id)
      const result = await this.$API.attr.getCategory3(id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    async handler3() {
      const data = {
        category1Id: this.form.category1Id,
        category2Id: this.form.category2Id,
        category3Id: this.form.category3Id
      }
      this.$emit('getCategoryId', data)
      this.$emit('getCategoryId3', this.form.category3Id)
    }
  }
}
</script>

<style>
</style>
