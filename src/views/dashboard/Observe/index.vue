<template>
  <div>
    <el-row>
      <el-col :span="12">
        <Search :list="data.searchWord" />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search/index.vue'
import Category from './Category/index.vue'
export default {
  name: '',
  components: { Search, Category },
  props: {
    data: {
      type: Object,
      default: undefined
    }
  }
}
</script>

<style>
</style>
