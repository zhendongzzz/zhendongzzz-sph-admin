<template>
  <div>
    <el-button v-show="btn1" type="primary">按钮1</el-button>
    <el-button type="primary">按钮2</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Test1',
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    // count: state => state.count,

    // // 传字符串参数 'count' 等同于 `state => state.count`
    // countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    btn1(state) {
      console.log(state.user.buttons)
      return state.user.buttons.indexOf('btn.Add1') === -1
    }
  })
}
</script>

<style>
</style>
