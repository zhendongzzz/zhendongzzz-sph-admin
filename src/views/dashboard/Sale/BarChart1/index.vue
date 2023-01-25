<template>
  <div ref="barChart1" class="chart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Chart1',
  props: {
    title: {
      type: String,
      default: '销售额'
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {}
  },
  watch: {
    title(newValue) {
      if (newValue === '销售额') {
        this.myChart.setOption({
          series: [
            {
              data: this.data[0]
            }
          ]
        })
      } else {
        this.myChart.setOption({
          series: [
            {
              data: this.data[1]
            }
          ]
        })
      }
      this.myChart.setOption({
        title: {
          text: this.title
        }
      })
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.barChart1)
    // 绘制图表
    this.myChart.setOption({
      title: {
        text: this.title,
        textStyle: { fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 52, 200, 334, 390, 330, 52, 200, 220]
        }
      ]
    })
  }
}
</script>

<style scoped>
.chart {
  margin: 10px 10px 30px 5px;
  width: 100%;
  height: 310px;
}
</style>
