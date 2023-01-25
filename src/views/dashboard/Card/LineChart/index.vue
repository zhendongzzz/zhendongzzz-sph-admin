<template>
  <div ref="chart" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
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
          type: 'line',
          // 平滑曲线 也可取0-1表示平滑程度
          smooth: true,
          data: [90, 6, 30, 20, 60, 84, 77],
          // 顶点样式
          itemStyle: {
            opacity: 0
          },
          // 线条样式
          lineStyle: {
            color: 'skyblue'
          },
          // 填充样式
          areaStyle: {
            // 将填充颜色设为线性渐变
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'skyblue' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ],
      // 网格位置
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
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
