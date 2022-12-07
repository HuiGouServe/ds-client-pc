import { setToken, setUserINfo, removeToken, removeUserinfo } from '../../utils/cookie'
import http from '../../utils/request'
import router from '../../router/index'


export interface TypeModuleStateUser {
  userName: String,
  userId: String,
  token: String,
  phone: String,
}


interface UserInfo {
  userName: string,
  userId: string,
  phone: String
}

const user: any = {
  state: {
    userName: '',
    userId: '',
    token: '',
    phone: ''
  },
  mutations: {
    SET_TOKEN: (state: any, token: String) => {
      state.token = token
    },
    SET_USERINFO: (state: any, userInfo: UserInfo) => {
      state.userName = userInfo.userName
      state.userId = userInfo.userId
      state.phone = userInfo.phone
    },
  },
  actions: {
    login({ commit }: any, userInfo: any) {
      return new Promise((resolve, reject) => {
        http.post(
          '/user/phoneLogin', { phone: userInfo.phone, code: userInfo.code }
        ).then((res: any) => {
          if (res.code == 200) {
            commit('SET_USERINFO', res.data.userInfo)
            setUserINfo(res.data.userInfo)
            commit('SET_TOKEN', res.data.token)
            setToken(res.data.token)
            resolve("登陆成功")
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err.message)
        })
      })
    },
    logout({ commit }: any, userInfo: any) {
      return new Promise((resolve, reject) => {
        http.post(
          '/user/phoneLogout', { phone: userInfo.phone, code: userInfo.code }
        ).then((res: any) => {
          if (res.code == 200) {
            commit('SET_USERINFO', '')
            commit('SET_TOKEN', '')
            removeToken()
            removeUserinfo()
            window.localStorage.clear()
            router.push({ path: '/login' })
            // window.location.reload()
            resolve("登出成功")
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err.message)
        })
      })
    }
  }
}

export default user
