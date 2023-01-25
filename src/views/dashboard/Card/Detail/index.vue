<template>
  <el-card style="margin:10px;">
    <div class="card-header">
      <span>{{ title }}</span>
      <svg t="1666249291753" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16">
        <path d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z" p-id="3096" fill="#8a8a8a" />
        <path d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z" p-id="3097" fill="#8a8a8a" />
        <path d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z" p-id="3098" fill="#8a8a8a" />
      </svg>
    </div>
    <div class="card-content">
      <!--  startVal开始的数字  endVal结束的数字  duration过渡时间 -->
      <countTo :start-val="0" :end-val="num" :duration="3000" />
      <slot />
    </div>
    <div class="card-chart">
      <slot name="chart" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </el-card>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'Detail',
  components: { countTo },
  props: {
    title: {
      type: [String, Number],
      default: null
    },
    num: {
      type: [String, Number],
      default: null
    }
  }
}
</script>

<style>
.card-header {
  display: flex;
  color: #d9d9d9;
  font-size: 14px;
  justify-content: space-between;
}
.card-content {
  font-size: 30px;
  padding-top: 8px;
}
.card-chart {
  height: 50px;
  padding-top: 8px;
}
.card-footer {
  border-top: 1px solid rgb(233, 230, 230);
  padding-top: 8px;
}
</style>
