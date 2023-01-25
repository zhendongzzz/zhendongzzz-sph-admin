// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取 token|设置 token|删除 token
import { getToken, setToken, removeToken } from '@/utils/auth'
// 重置路由
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    // 存储用户头像
    avatar: '',
    // 菜单权限
    routes: [],
    // 按钮权限
    buttons: [],
    // 角色
    roles: [],
    // 所有路由
    AllRoutes: []
  }
}

const resAsyncRoutes = (routes, asyncRoutes) => {
  return asyncRoutes.filter((item) => {
    if (routes.indexOf(item.name) !== -1) {
      if (item.children) {
        item.children = resAsyncRoutes(routes, item.children)
      }
      return true
    }
  })
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.routes = userInfo.routes
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
  },
  // 计算最终展示路由
  SET_RESASYNCROUTES: (state, resAsyncRoutes) => {
    state.resAsyncRoutes = resAsyncRoutes
    // 计算出当前用户所需要展示的全部路由
    state.AllRoutes = constantRoutes.concat(state.resAsyncRoutes, anyRoutes)
    // 给路由器添加新路由
    router.addRoutes(state.AllRoutes)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          commit('SET_USERINFO', data)
          commit('SET_RESASYNCROUTES', resAsyncRoutes(data.routes, asyncRoutes))
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
