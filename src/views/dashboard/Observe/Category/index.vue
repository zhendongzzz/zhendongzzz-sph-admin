<template>
  <div>
    <el-card style="margin:10px">
      <div slot="header" class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="saleList">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
      <div ref="categoryChart" class="categoryChart" />
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      saleList: '全部渠道'
    }
  },
  mounted() {
    const myCharts = echarts.init(this.$refs.categoryChart)
    myCharts.on('mouseover', params => {
      const { value, name } = params.data
      myCharts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
    myCharts.setOption({
      title: {
        text: '视频',
        subtext: '1048',
        left: 'center',
        top: 'center'
      },
      label: {
        show: true,
        position: 'outsize'
      },
      labelLine: {
        show: true
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: '淘宝' },
            { value: 735, name: '直播' },
            { value: 580, name: '商场' },
            { value: 484, name: '专卖店' },
            { value: 300, name: '京东' }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.category-header {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
.categoryChart {
  width: 100%;
  height: 330px;
}
</style>
