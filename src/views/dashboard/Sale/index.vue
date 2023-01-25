<template>
  <div>
    <el-card class="box-card" style="margin:10px;">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale" />
          <el-tab-pane label="访问量" name="visit" />
        </el-tabs>
        <div ref="spans" class="right">
          <span @click="setDay">本日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker v-model="date" value-format="yyyy-MM-dd" class="date" size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="18">
            <BarChart1 :data="[data.orderFullYear,data.userFullYear]" :title="title" />
          </el-col>
          <el-col :span="6">
            <div class="right-list">
              <p>门店{{ title }}排名</p>
              <ul>
                <li v-for="item in data.orderRank" :key="item.no">
                  <span :class="item.no <4?'index':''">{{ item.no }}</span>
                  <span>{{ item.name }}</span>
                  <span class="span-r">{{ item.money }}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import BarChart1 from './BarChart1/index.vue'
export default {
  name: 'Sale',
  components: { BarChart1 },
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      activeName: 'sale',
      date: ''
    }
  },
  computed: {
    // 计算标题
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
      this.$refs.spans.children.forEach(item => {
        item.style.color = ''
      })
      this.$refs.spans.children[0].style.color = 'red'
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
      this.$refs.spans.children.forEach(item => {
        item.style.color = ''
      })
      this.$refs.spans.children[1].style.color = 'red'
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
      this.$refs.spans.children.forEach(item => {
        item.style.color = ''
      })
      this.$refs.spans.children[2].style.color = 'red'
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
      this.$refs.spans.children.forEach(item => {
        item.style.color = ''
      })
      this.$refs.spans.children[3].style.color = 'red'
    }
  }
}
</script>

<style >
.el-card__header {
  border: none;
}
</style>
<style>
.tab {
  width: 100%;
  position: absolute;
}
.right {
  position: absolute;
  right: 0px;
}
.right span {
  margin: 10px;
  display: block;
  float: left;
  cursor: pointer;
}
.clearfix {
  position: relative;
}
.right .date {
  width: 240px;
  margin: 0 15px;
}
.right-list {
  height: 310px;
}
.right-list p {
  font-size: 18px;
  font-weight: bold;
}
.right-list ul {
  list-style: none;
  padding: 0;
}
.right-list ul li {
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
.right-list ul li span:nth-child(1) {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
.right-list .index {
  background-color: black;
  color: white;
  border-radius: 50%;
  line-height: 20px;
}
</style>
