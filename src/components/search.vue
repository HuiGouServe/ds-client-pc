<template>
  <div class="search_index">
    <div class="search_top">
      <div class="search_cowry">
        宝贝
        <el-icon class="arrow-down-bold">
          <arrow-down-bold />
        </el-icon>
        <div class="cowry_block">
          <div class="cowry_item">天猫</div>
          <div class="cowry_item">店铺</div>
        </div>
      </div>
      <div class="search_input">
        <input type="text" :value="value" class="input iconfont" :placeholder="'\ue8d6' + text" @input="inputChange" />
      </div>
      <div class="search_search" @click="searchClick">搜索</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ArrowDownBold } from '@element-plus/icons-vue'
const value = ref(''),
  text = ref('双肩包'),
  inputChange = (e: any) => {
    value.value = e.target.value
  },
  emit = defineEmits(['searchClick']),
  searchClick = () => {
    emit('searchClick', value)
  }

</script>
<style lang="scss" scoped>
::-webkit-input-placeholde {
  color: #3c3c3c;
  font-family: "iconfont";
  font-size: 12px;
}

.search_index {
  width: 630px;
  height: 40px;
  font-size: 12px;
  color: #3c3c3c;

  .search_top {
    display: flex;
    border: 1px solid #ff5000;
    border-radius: 35px;
    background: #fff;

    .search_cowry {
      width: 72px;
      height: 36px;
      line-height: 36px;

      padding-left: 16px;
      border-radius: 35px 0 0 35px;
      position: relative;

      &:hover .cowry_block {
        display: block;
      }

      .cowry_block {
        position: absolute;
        top: 24px;
        left: 0px;
        display: none;
        width: 80px;
        text-align: center;
        background: #fff;

        .cowry_item {
          height: 36px;
          line-height: 36px;

          &:hover {
            background: #f5f5f5;
            cursor: pointer;
          }
        }
      }

      .arrow-down-bold {
        font-size: 8px;
      }
    }

    .search_input {
      .input {
        border: none;
        width: 470px;
        height: 36px;
        outline: none;
        font-size: 12px;
      }
    }

    .search_search {
      width: 73px;
      height: 34px;
      margin: 2px;
      line-height: 34px;
      border-radius: 34px;
      background: linear-gradient(to right, #ff8e00 0%, #ff5400 100%);
      font-size: 18px;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>