<template>
  <div>
    <Card :data="data" />
    <Sale :data="data" />
    <Observe :data="data" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from './Card/index.vue'
import Sale from './Sale/index.vue'
import Observe from './Observe/index.vue'
export default {
  name: 'Dashboard',
  components: { Card, Sale, Observe },
  mounted() {
    this.$store.dispatch('getData')
  },
  computed: {
    ...mapState({
      data: state => state.home.data
    })
  }
}
</script>

<style  scoped>
</style>
