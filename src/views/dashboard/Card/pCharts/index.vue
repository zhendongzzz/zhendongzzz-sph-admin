<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'PCharts',
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.chart)
    // 绘制图表
    myChart.setOption({
      xAxis: {
        // 隐藏
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        // 隐藏
        show: false,
        type: 'category'
      },
      series: [
        {
          // 类型为折线图
          type: 'bar',
          // 平滑曲线 也可取0-1表示平滑程度
          smooth: true,
          color: 'orange',
          data: [70],
          // 柱状图宽度
          barWidth: 10,
          // 展示背景
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          }
        }
      ],
      // 网格位置
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      // 文本标签: 展示 小竖线 “ | ""
      label: {
        show: true,
        formatter: '|',
        position: 'right'
      }
    })
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
