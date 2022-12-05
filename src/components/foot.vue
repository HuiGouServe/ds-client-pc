<template>
  <div class="foot_index">
    <div class="foot_body">
      <div class="footList">
        <div v-for="(item,index) in footList1" :key="index">
          <span class="footList_item">{{ item }}</span>
          <span class="footList_index" v-show="index != footList1.length - 1">|</span>
        </div>
      </div>
      <div class="footList" style="margin-top:10px;padding-top:10px;border-top:1px solid #ddd ;">
        <div v-for="(item,index) in footList2" :key="index">
          <span class="footList_item">{{ item }}</span>
        </div>
        <div class="color_9c9c9c" style="margin-left: 30px;">© 2003-现在 Taobao.com 版权所有</div>
      </div>

      <div class="margin_5 color_6c6c6c">
        <span>增值电信业务经营许可证：浙B2-20080224</span>
        <span>增值电信业务经营许可证（跨地区）： B2-20150210</span>
        <span>浙网文（2019）1033-086号</span>
        <span class="color_9c9c9c">浙江省网络食品销售第三方平台提供者备案：浙网食A33010001</span>
      </div>
      <div class="margin_5 color_9c9c9c">
        互联网药品信息服务资格证书（浙）-经营性-2018-0010|短消息类服务接入代码使用证书：号【2016】00154-A01 |
        信息网络传播视听许可证：1109364号 | 出版物网络交易平台服务经营备案号：新出发浙备字第002号
      </div>
      <div class="margin_5 color_9c9c9c">浙公网安备 33010002000078号 | 浙B2-20080224-1 | 广播电视节目制作经营许可证（浙）字第01012号 |
        市场名称登记证：工商网市字3301004120号 | 医疗器械网络交易服务第三方平台备案：（浙）网械平台备字[2018]第00004号</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
const footList1 = ref(["阿里巴巴集团", "淘宝网", "天猫", "聚划算", "全球速卖通", "阿里巴巴国际交易市场", "1688", "阿里妈妈", "飞猪", "淘小铺", "阿里云", "计算", "AliOS", "阿里通信", "一淘", "万网", "高德", "UC", "友盟", "阿里安全", "大麦网", "钉钉", "支付宝", "优酷", "土豆", "阿里健康", "阿里影业", "网商银行"]),
  footList2 = ref([
    "关于淘宝", "营销中心", "廉正举报", "联系客服", "开放平台", "诚征英才", "联系我们", "隐私权政策", "法律声明",
    "知识产权", "不当竞争举报", "规则意见征集"
  ])

</script>

<style scoped lang="scss">
.foot_index {
  height: 292px;
  width: 100%;
  padding-top: 15px;
  font-size: 12px;
  .foot_body {
    width: 1190px;
    margin: 0 auto;
    .footList {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      color: #6c6c6c;
      span {
        margin: 4px;
      }
      .footList_item {
        &:hover {
          cursor: pointer;
          color: #ff5000;
        }
      }
      .footList_index {
        color: #ddd;
      }
    }
  }
}
</style>