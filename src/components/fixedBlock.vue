<!-- 右下角固定块页面 -->
<template>
  <div class="fixed_index">
    <div class="quality">
      品质
      <br />好货
    </div>
    <div class="youLick">
      猜你
      <br />喜欢
    </div>
    <div class="top" v-show="isFixed" @click.stop="topClick">
      <el-icon>
        <arrow-up-bold />
      </el-icon>
      <br />顶部
    </div>
    <div class="feedback">反馈</div>
    <div class="report">
      暴恐
      <br />举报
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ArrowUpBold } from '@element-plus/icons-vue'
defineProps({
  isFixed: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['topClick']),
  topClick = () => {
    emit('topClick')
  }


</script>
<style lang='scss' scoped>
.fixed_index {
  background: #fff;
  border-radius: 10px;
  .quality {
    padding: 12px 0;
    background: linear-gradient(to right, #ff8e00 0%, #ff5600 100%);
    border-radius: 10px 10px 0 0;
    color: #fff;
  }
  .youLick {
    padding: 12px 0;
    color: #ff4400;
  }
  .report {
    padding: 12px 0;
    border-radius: 0 0 10px 10px;
  }
  .top,
  .feedback {
    padding: 18px 0;
  }
  div {
    // height: 50px;
    width: 50px;
    text-align: center;
    font-size: 13px;
    color: #3c3c3c;
    &:hover {
      cursor: pointer;
      background: linear-gradient(to right, #ff8e00 0%, #ff5600 100%);
      color: #fff;
    }
  }
}
</style>