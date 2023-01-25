<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts',
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.chart)
    // 绘制图表
    myChart.setOption({
      xAxis: {
        // 隐藏
        show: false,
        // 均分
        type: 'category'
      },
      yAxis: {
        // 隐藏
        show: false
      },
      series: [
        {
          // 类型为折线图
          type: 'bar',
          // 平滑曲线 也可取0-1表示平滑程度
          smooth: true,
          data: [90, 36, 30, 20, 60, 84, 46, 70, 50]
        }
      ],
      // 网格位置
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      // 鼠标经过提示信息
      tooltip: {}
    })
  }
}
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>
