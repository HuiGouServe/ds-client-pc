<!--  -->
<template>
  <div class="index">
    <div class="top">
      <img src="../../assets/icon/hg.png" alt="logo" class="img" />
    </div>

    <div class="body"
      :style="{ backgroundImage: `url(${imgSrc})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
      <div class="center">
        <img class="img" v-if="pc" src="../../assets/img/login/pc.png" alt="pc" @click="pc = false" />
        <img class="img" v-else src="../../assets/img/login/code.png" alt="code" @click="pc = true" />
        <div class="center-top" v-if="pc">
          <div :class="['cursor_pointer size_16 margin_5', isPhone ? 'isSelect' : '']" @click="isPhone = true">密码登录
          </div>
          <div :class="['cursor_pointer size_16 margin_5', !isPhone ? 'isSelect' : '']" @click="isPhone = false">短信登录
          </div>
        </div>
        <div class="phone-login" v-if="pc">
          <div class="account">
            <span :class="['iconfont icon', isPhone ? 'icon-1zhanghu' : 'icon-shouji-copy']" />
            <input :value="account" v-if="isPhone" oninput="accountInput" class="input" placeholder="会员名/邮箱/手机号" />
            <input :value="phone" v-else v-on:input="phoneInput" class="input" placeholder="手机号" />
          </div>
          <div class="mima">
            <span :class="['iconfont icon', isPhone ? 'icon-mima' : 'icon-yanzhengma']" />
            <input :value="password" v-if="isPhone" class="input" placeholder="请输入登陆密码" />
            <input :value="verification" v-else class="input" placeholder="请输入验证码" @focus="getCode" />
          </div>
        </div>
        <div v-else class="code" @click="testClick">扫码登陆敬请期待</div>
        <!-- <div class="password-login" v-else></div> -->
        <div class="login-button" @click="loginClick">登 录</div>

        <div class="login_wz">
          <span>微博登录</span>
          <span>支付宝登录</span>
        </div>
        <div class="register">
          <span>忘记密码</span>
          <span>忘记账号名</span>
          <span @click="registerClick">免费注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import router from '../../router/index'
import { ElMessage } from 'element-plus'
import http from '../../utils/request';
import store from '../../store/index'
const imgSrc = ref(`/src/assets/img/login/${Math.round(Math.random() * 5)}.jpg`),
  // phone = ref(router.getRouters()),
  // imgSrc = ref(''),
  isPhone = ref(false),
  account = ref(''),
  password = ref(''),
  phone = ref('18218548496'),
  verification = ref(''),
  pc = ref(true),
  testClick = () => {

  },
  // ...mapActions(['login']),
  passwordClick = () => {
    isPhone.value = !isPhone.value
  },
  phoneInput = (e: any) => {
    phone.value = e.target.value
    console.log(e);
  },
  registerClick = () => {
    router.push({ path: '/register' })
  },
  loginClick = () => {
    let regExp1 = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/, regExp2 = /^(\d{4})$/
    if (!regExp1.test(phone.value)) {
      return ElMessage("手机号有误")
    }
    if (!regExp2.test(verification.value)) {
      return ElMessage("验证码有误")
    }
    store.dispatch('login', { phone: phone.value, code: verification.value }).then((res: any) => {
      if (res == '登陆成功') {
        const path = window.localStorage.getItem('path')
        if (path) {
          router.push({ path })
        } else {
          router.push({ path: '/' })
        }
      }
    })
  },
  getCode = () => {
    let regExp1 = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
    if (!regExp1.test(phone.value)) {
      return ElMessage("手机号有误")
    }
    http.post('/user/getCode', { phone: phone.value }).then((res: any) => {
      if (res.code == 200) {
        verification.value = res.data
      }
    })
  }
</script>
<style lang='scss' scoped>
.index {
  width: 100%;

  .input {
    border: none;
    width: 250px;
    height: 42px;
    outline: none;
    background: #fff;
    padding-left: 10px;
  }

  .top {
    height: 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .img {
      width: 80px;
      height: 50px;
      padding-left: 190px;
      cursor: pointer;
    }
  }

  .body {
    height: 550px;
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .center {
      width: 350px;
      height: 350px;
      background: #f5f5f5;
      opacity: 0.9;
      margin-right: 150px;
      position: relative;

      .img {
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
      }

      .center-top {
        display: flex;
        padding: 30px 20px 20px;

        .isSelect {
          border-bottom: 2px solid #999;
          // font-weight: bold;
        }
      }

      .phone-login {
        padding: 0 25px;

        .account {
          .icon {
            font-size: 18px;
            vertical-align: middle;
            padding: 10px;
            background: #ddd;
          }
        }

        .mima {
          margin-top: 20px;

          .icon {
            font-size: 18px;
            vertical-align: middle;
            padding: 10px;
            background: #ddd;
          }
        }
      }

      // .password-login {
      // }
      .login-button {
        width: 300px;
        cursor: pointer;
        line-height: 42px;
        text-align: center;
        margin: 30px auto 20px;
        height: 42px;
        border-radius: 5px;
        background: #f40;
        color: #fff;
      }
    }
  }

  .code {
    height: 191px;
    text-align: center;
    line-height: 191px;
  }

  .login_wz {
    font-size: 12px;
    color: #555;
    text-align: left;
    margin: 5px 25px;

    span {
      cursor: pointer;
      margin: 0 3px;
    }
  }

  .register {
    font-size: 12px;
    color: #555;
    text-align: right;
    margin: 5px 25px;

    span {
      cursor: pointer;
      margin: 0 3px;
    }
  }
}
</style>