import Vue from 'vue'
import {getInfo, logout} from '@/api/login'
import {login} from "@/api/userApi"
import {ACCESS_TOKEN, CURRENT_USER} from '@/store/mutation-types'
import {welcome} from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },
  //用于同步操作
  mutations: {
    //设置token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    //设置昵称
    SET_NAME: (state, {name, welcome}) => {
      state.name = name
      state.welcome = welcome
    },
    // 设置头像
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    // 设置角色
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // 用户信息
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  // 用于异步操作
  actions: {
    // 登录
    Login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const {data} = response;
          // 成功
          if (response) {
            // 将token放入localStorage
            Vue.ls.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
            //将用户名称放入localStorage进去是否登录判断
            Vue.ls.set(CURRENT_USER, data.userName, 7 * 24 * 60 * 60 * 1000);
            // state中放入token
            commit('SET_TOKEN', result.token);
            resolve();
          } else { //失败
            reject();
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => {
                  return action.action
                })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => {
              return permission.permissionId
            })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', {name: result.name, welcome: welcome()})
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({commit, state}) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
