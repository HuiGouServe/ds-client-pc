<!--  -->
<template>
  <div class="index">
    <Header />
    <div class="top">
      <img src="../../assets/icon/hg.png" alt="logo" class="img" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="body">
      <el-form label-width="120px">
        <el-form-item label="手机号">
          <div class="phone">
            <select class="select" v-model="area">
              <option :value="item" v-for="(item, idx) in phoneList" :key="idx">{{ item }}</option>
            </select>
            <el-input input-style="border-radius: 0" v-model="phone" placeholder="请输入手机号码" :maxlength="11" />
          </div>
        </el-form-item>
        <el-form-item label="验证码">
          <div class="code">
            <el-input input-style="border-radius: 0" v-model="code" placeholder="请输入检验码" :maxlength="5" />
            <div class="getcode" @click="getCode">获取验证码</div>
          </div>
        </el-form-item>
      </el-form>
      <div class="register" @click="register">注册</div>
      <div class="checked">
        <el-checkbox v-model="checked" />
        <div class="content">已阅读并同意以下协议淘宝平台服务协议、隐私权政策、法律声明、支付宝及客户端服务协议</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Header from '@/components/header.vue'
import http from '@/utils/request';
import { ElMessage } from 'element-plus'
import router from '@/router/index'
const title = ref("用户注册"),
  code = ref(''),
  phone = ref('18218548496'),
  area = ref('中国大陆 +86'),
  phoneList = ref(['中国大陆 +86', '中国香港 +852', '中国澳门 +853', '中国台湾 +886', '韩国 +82', '日本', '马来西亚', '美国', '英国',
    '德国', '朝鲜', '俄罗斯', '泰国', '柬埔寨', '东胜神洲',]),
  checked = ref(false),
  getCode = () => {
    let regExp = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
    if (!regExp.test(phone.value)) {
      return ElMessage("手机号有误")
    }
    http.post('/user/getCode', { phone: phone.value }).then((res: any) => {
      if (res.code == 200) {
        code.value = res.data
      }
    })
  },
  register = () => {
    let regExp = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/, regExp2 = /^(\d{4})$/
    if (!regExp.test(phone.value)) {
      return ElMessage("手机号有误")
    }
    if (!regExp2.test(code.value)) {
      return ElMessage("验证码有误")
    }
    if (!checked.value) return ElMessage.warning('请勾选同意选项')
    http.post('/user/phoneRegister', { phone: phone.value, code: code.value }).then((res: any) => {
      if (res.code == 200) {
        ElMessage.success('注册成功')
        setTimeout(() => {
          router.push({ path: '/login', query: { phone: phone.value } })
        }, 1000)
      } else {
        return ElMessage(res.message)
      }
    })
  }


</script>
<style lang='scss' scoped>
::v-deep(.el-checkbox) {
  height: 48px;
}

.index {
  .top {
    height: 120px;
    width: 100%;
    display: flex;
    // justify-content: space-between;
    align-items: center;

    .img {
      width: 80px;
      height: 50px;
      padding-left: 190px;
      cursor: pointer;
    }

    .title {
      margin-left: 20px;
      font-size: 20px;
    }
  }

  .body {
    height: 450px;
    padding-top: 50px;
    width: 440px;
    margin: 0 auto;

    .phone {
      display: flex;
      width: 320px;

      .select {
        width: 200px;
        border: none;
        border: 1px solid #ddd;
      }
    }

    .code {
      display: flex;
      height: 40px;
      width: 320px;

      .getcode {
        width: 200px;
        text-align: center;
        border: 0.5px solid #ddd;
        color: #ff5500;
        cursor: pointer;
      }
    }

    .register {
      height: 36px;
      width: 320px;
      text-align: center;
      line-height: 36px;
      background: linear-gradient(to right, #ff8e00 0%, #ff5400 100%);
      color: #fff;
      cursor: pointer;
      margin-top: 40px;
      margin-left: auto;
    }

    .checked {
      margin: 0px 0 0 120px;
      font-size: 12px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .content {
        width: 298px;
      }
    }
  }
}
</style>