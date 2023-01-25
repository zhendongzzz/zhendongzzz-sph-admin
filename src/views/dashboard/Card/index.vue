<template>
  <div>
    <el-row>
      <el-col :span="6">
        <Detail title="总销售额" :num="data.salesTotal">
          <template slot="chart">
            <div style="display:flex;justify-content: space-between; font-size: 14px; ">
              <span>月同比</span>
              <span>{{ data.activityGrowthLastDay }}%</span>

              <svg t="1666250742162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4371" width="16" height="16">
                <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="4372" fill="#1afa29" />
              </svg>
              <span>日同比</span>
              <span>{{ data.activityGrowthLastMonth }}%</span>
              <svg t="1666250707104" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="16" height="16">
                <path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="4107" fill="#d81e06" />
              </svg>
            </div>
          </template>
          <template slot="footer">
            <span>日销售额 ￥ {{ data.salesToday }}</span>
          </template>
        </Detail>
      </el-col>
      <el-col :span="6">
        <Detail title="访问量" :num="data.visitTotal">
          <template slot="chart">
            <LineChart />
          </template>
          <template slot="footer">
            <span>日访问量 {{ data.visitToday }}</span>
          </template>
        </Detail>
      </el-col>
      <el-col :span="6">
        <Detail title="支付笔数" :num="data.payTotal">
          <template slot="chart">
            <BarChart />
          </template>
          <template slot="footer">
            <span>转化率 {{ data.payRate }}%</span>
          </template>
        </Detail>
      </el-col>
      <el-col :span="6">
        <Detail title="运营活动效果" :num="70">
          <template>%</template>
          <template slot="chart">
            <PCharts />
          </template>
          <template slot="footer">
            <div style="display:flex;justify-content: space-between; font-size: 14px; ">
              <span>月同比</span>
              <span>{{ data.salesGrowthLastDay }}%</span>
              <svg t="1666250742162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4371" width="16" height="16">
                <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="4372" fill="#1afa29" />
              </svg>
              <span>日同比</span>
              <span>{{ data.salesGrowthLastMonth }}%</span>
              <svg t="1666250707104" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="16" height="16">
                <path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="4107" fill="#d81e06" />
              </svg>
            </div>
          </template>
        </Detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail/index.vue'
import LineChart from './LineChart/index.vue'
import BarChart from './BarChart/index.vue'
import PCharts from './pCharts/index.vue'
export default {
  name: 'Card',
  components: { Detail, LineChart, BarChart, PCharts },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {}
}
</script>

<style>
</style>
