import mockRequest from '@/utils/mock.js'
const state = {
  data: {}
}
const mutations = {
  GETDATA(state, data) {
    state.data = data
  }
}
const actions = {
  async getData({ commit }) {
    const res = await mockRequest.get('/home/data')
    if (res.code === 20000) {
      commit('GETDATA', res.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
