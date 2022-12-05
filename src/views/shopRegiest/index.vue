<!-- 店铺注册 -->
<template>
  <div class='index'>
    <Header />
    <div class="body">
      <div class="flex">店铺名称：
        <el-input v-model="shopName" maxlength="20" style="width: 400px;" placeholder="请输入店铺名称" />
      </div>
      <div class="flex">店铺类型：
        <el-select v-model="shopType" class="m-2" placeholder="请选择店铺类型" style="width: 400px;" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="btn" @click="save">确定</div>
  </div>
</template>

<script setup lang='ts'>
import Header from '@/components/header.vue'
import http from '@/utils/request'
import { ref } from 'vue'
import { getUserINfo } from '@/utils/cookie';
const shopName = ref(''),
  shopType = ref('个人'),
  options = ref([{ value: '个人', label: '个人' }, { value: '企业', label: '企业' }]),

  save = () => {
    http.post("/shop/shopRegister", { shopType: shopType.value, shopName: shopName.value, userId: JSON.parse(getUserINfo()).userId }).then((res: any) => {
      console.log(res);

    })
  }



</script>
<style lang='scss' scoped>
.index {
  // height: 100%;
  width: 100%;


  .body {
    padding-top: 100px;
    width: 1190px;
    margin: 0 auto;

    .flex {
      display: flex;
      align-items: center;
      margin: 10px;
    }
  }

  .btn {
    width: 55px;
    background: rgb(50, 60, 201);
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    cursor: pointer;
    border-radius: 5px;
  }


}
</style>