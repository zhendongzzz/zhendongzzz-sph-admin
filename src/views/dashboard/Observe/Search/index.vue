<template>
  <div>
    <el-card style="margin:10px">
      <div slot="header" class="header">
        <div class="search-header">
          <span>线上热搜</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <LineChart />
          </el-col>
          <el-col :span="12">
            <LineChart />
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" :border="true" style="width: 100%">
        <el-table-column prop="date" label="排名" type="index" />
        <el-table-column prop="word" label="搜索关键" />
        <el-table-column prop="user" label="用户数" sortable="" />
        <el-table-column prop="count" label="周涨幅" sortable="" />
      </el-table>
      <el-pagination style="float:right;" :total="42" :current-page="page" :page-size="limit" :pager-count="5" layout="prev, pager, next, total" @current-change="handlerChange" />
    </el-card>
  </div>
</template>

<script>
import LineChart from './LineChart/index.vue'
export default {
  name: 'Search',
  components: { LineChart },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      start: 0,
      end: 2,
      page: 1,
      limit: 3,
      tableData: []
    }
  },
  watch: {
    list() {
      let i = this.start
      for (i = this.start; i <= this.end; i++) {
        this.tableData.push(this.list[i])
      }
    },
    page(value) {
      this.tableData = []
      this.end = this.limit * value - 1
      this.start = this.limit * value - this.limit
      let i = this.start
      for (i = this.start; i <= this.end; i++) {
        this.tableData.push(this.list[i])
      }
    }
  },
  methods: {
    // 修改页码回调
    handlerChange(page) {
      this.page = page
    }
  }
}
</script>

<style>
.search-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
}
.header {
  border-bottom: 1px solid #eee;
}
</style>
