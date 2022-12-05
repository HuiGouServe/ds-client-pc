<!--发布商品-->
<template>
  <div class='index'>

  </div>
</template>

<script setup lang='ts'>
import Header from '../../components/header.vue'
import { ref } from 'vue'
const shopName = ref(''),
  shopType = ref('个人'),
  options = ref([{ value: '个人', label: '个人' }, { value: '企业', label: '企业' }])

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
    }

  }
}
</style>