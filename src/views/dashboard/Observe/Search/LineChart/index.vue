<template>
  <div>
    <div class="chart-header">
      <span>搜索用户数</span>
      <svg t="1666249291753" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16">
        <path d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z" p-id="3096" fill="#8a8a8a" />
        <path d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z" p-id="3097" fill="#8a8a8a" />
        <path d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z" p-id="3098" fill="#8a8a8a" />
      </svg>
    </div>
    <div class="chart-main">
      <span>12342</span>
      <span>17.2%</span>
      <svg t="1666320306908" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2805" width="16" height="16">
        <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="2806" fill="#d81e06" />
      </svg>
    </div>
    <div class="chart-footer">
      <div ref="charts" class="charts" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.charts)
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

<style>
.chart-footer .charts {
  width: 100%;
  height: 20px;
}
.chart-header {
  display: flex;
  align-items: center;
}
.chart-header span {
  margin: 10px;
}
.chart-main {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.chart-main :nth-child(1) {
  font-size: 24px;
  font-weight: 500;
  margin-right: 20px;
}
.chart-main :nth-child(2) {
  margin-right: 9px;
}
</style>
