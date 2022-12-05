<!--  -->
<template>
  <div class="details_index">
    <Header />
    <div class="details_top">
      <img src="../../assets/icon/hg.png" class="img" alt="惠购网" />
      <div class="details_more color_9c9c9c" @mouseleave="mouseleave">
        <div class="details_title" @mouseenter="mouseenter">
          更多市场
          <el-icon class="arrow-down-bold">
            <arrow-down-bold />
          </el-icon>
        </div>
        <div class="line" v-show="isHover" />
        <div class="more_block" v-show="isHover">
          <div v-for="(item, index) in moreList" class="moreList" :key="index">
            <div class="item_name">{{ item.name }}</div>
            <div v-for="(i, index) in item.child" class="item_child" :key="index">
              <span class="item_i">{{ i }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="soushuo">
        <input type="text" :value="value" class="input" />
        <span class="soutaobao">搜淘宝</span>
        <span class="soushop">搜本店</span>
      </div>
    </div>
    <div class="details_signboard">
      <!-- todo -->
      店铺招牌
    </div>
    <div class="details_body">
      <div class="body_top">
        <div class="body_top_left">
          <i-Compoponent :obj="obj" />
          <div class="imgList">
            <div v-for="(item, index) in imgList" class="item" :key="index">
              <img :src="item.url" :alt="item.name" class="img" @mouseenter="imgMouseenter(item)"
                @click="imgClick(item)" />
            </div>
          </div>
          <div class="collect">收藏宝贝 (6人气)</div>
        </div>
        <div class="body_top_centent">
          <div class="shop_name">蔚蓝男士香水持久留香淡香清新小众大牌正品斩女香水专用法国小样</div>
          <div class="shop_price">
            <div class="left">
              <div v-if="price" class="price">
                价格
                <del class="price_num">￥{{ price }}</del>
              </div>
              <div class="tbprice" v-if="tbPrice">
                淘宝价
                <div class="tbPrice_num">￥{{ tbPrice }}</div>
                <div class="impulse">冲量促销</div>
              </div>
            </div>
            <div class="right">
              <div class="right_left">
                <div class="count">{{ criticCount }}</div>
                <div class="name">累计评论</div>
              </div>
              <div class="right_right">
                <div class="count">{{ dealCount }}</div>
                <div class="name">交易成功</div>
              </div>
            </div>
          </div>
          <div class="shop_discount">
            优惠
            淘金币可抵0.09元
          </div>
          <div class="shop_distribution">
            配送
            浙江金华 至 广东深圳龙岗区 快递 免运费
          </div>

          <div class="shop_color">
            <div style="margin-right: 20px;">颜色分类</div>
            <div class="colorLists" v-for="(item, index) in imgList" :key="index">
              <img :src="item.url" :alt="item.name" :class="['colorType', colorIdx == index ? 'border' : 'none']"
                @click="colorClick(item, index)" @mouseenter="colorMouseenter(item, index)" />
              <span class="colorName" v-if="hoveridx == index">{{ colorName }}</span>
            </div>
          </div>
          <div class="shop_netContent">
            净含量
            <span class="netContent">{{ netContent }}</span>
          </div>
          <div class="shop_count">
            数量
            <el-input-number style="margin-left:30px ;" v-model="shopCount" :min="1" size="small"
              @change="handleChange" />
          </div>
          <div class="shop_button">
            <div class="buy">立即购买</div>
            <div class="addCar">加入购物车</div>
          </div>
          <div class="shop_commitment">
            承诺
            15天退货 包退
          </div>
          <div class="shop_pay">支付蚂蚁花呗信用卡支付集分宝</div>
        </div>
        <div class="body_top_right" v-if="phone">
          <div class="look_title">看了又看——————</div>
          <!-- <div v-for="item in lookList"> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref, onMounted } from 'vue'
import Header from '../../components/header.vue'
import { getUserINfo } from '../../utils/cookie'
import ICompoponent from '@/components/Icomponents.vue'

import { ArrowDownBold, ShoppingCart, StarFilled } from '@element-plus/icons-vue'
import http from '../../utils/request'
import { ElMessage } from 'element-plus'
export interface Foo { url: string, type: string, name: string, poster: string }
const value = ref(''),
  moreList = ref([
    { name: "淘宝发现", child: ['淘宝女人', '淘宝男人', '生活家', '情侣'] },
    { name: "男女服饰", child: ['女装', '新品', '裙子', '男装', 'T恤', '休闲'] },
    { name: "箱包市场", child: ['女包', '男包', '双肩包', ' 旅行箱', '钱包'] },
    { name: "女鞋市场", child: ['靴子', '单鞋', '男鞋', '休闲', '商务'] },
    { name: "内衣配饰", child: ['新品', '文胸', '睡衣', ' 内裤', '帽子', '皮带'] },
    { name: "运动市场", child: ['跑步鞋', '球鞋', '运动夹克', '运动套装'] },
    { name: "户外市场", child: ['饰品', '垂钓用品', '广场舞', '冲锋衣',] },
    { name: "配饰市场", child: ['饰品', '珠宝', '手表', '眼镜', 'Zippo军刀'] },
    { name: "数码市场", child: ['手机', '平板电脑', '相机/摄像', '笔记本',] },
    { name: "家电市场", child: ['大家电', '新品', '厨房电器', '生活电器',] },
    { name: "美妆市场", child: ['护肤', '彩妆', '香氛', '男士', '美发'] },
    { name: "母婴市场", child: ['童装', '童鞋', '奶粉', '用品', '玩具',] },
    { name: "家居家纺", child: ['四件套', '窗帘', '摆件', '花瓶', ' 沙发',] },
    { name: "家装建材", child: ['厨房卫浴', '灯饰', '建材', '五金', ' 瓷砖'] },
    { name: "日用百货", child: ['热门', '餐具', '饮具', '收纳', '清洁'] },
    { name: "阿里汽车", child: ['行车记录仪', '脚垫', '安全座椅', '轮胎'] },
    { name: "花鸟市场", child: ['猫狗', '水族奇宠', '鲜花', '园艺', '花艺'] },
    { name: "文娱市场", child: ['古筝', '萨克斯', '吉它', '电钢琴', '非洲鼓'] },
    { name: "婚庆市场", child: ['钻戒', '婚纱', '喜帖', '喜糖', '蜜月'] },
    { name: "特色市场", child: ['腔调', '中老年'] },
  ]),
  iav = ref(''),
  lookList = ref([]),
  isHover = ref(false),
  imgUrl = ref(''),
  imgList = ref([
    { url: '/src/assets/img/details/xiangshui1.png', name: '香fg ht hghgfh hf  水', type: 'img', poster: "" },
    { url: '/src/assets/img/details/xiangshui2.png', name: '香水', type: 'img', poster: "" },
    { url: '/src/assets/img/details/xiangshui3.png', name: '香水', type: 'img', poster: "" },
    { url: '/src/assets/img/details/xiangshui4.png', name: '香水', type: 'img', poster: "" },
    { url: '/src/assets/img/details/xiangshui5.png', name: '香水', type: 'img', poster: "" },
  ]),

  price = ref("66.66"),
  tbPrice = ref("66.66"),
  criticCount = ref(9999),
  dealCount = ref(9999),
  colorName = ref(''),
  colorIdx = ref(0),
  hoveridx = ref(100000),
  netContent = ref('100g'),
  shopCount = ref(1),
  obj = ref(imgList.value[0]),
  phone = ref(getUserINfo() ? JSON.parse(getUserINfo()).phone : ''),
  init = () => {
    http.post("/product/getProductDetail", { id: "pro16469161528251714" }).then((res: any) => {
      if (res.code == 200) {

      } else {
        ElMessage({
          message: res.message,
          type: 'warning',
        })
      }
    })
  },
  mouseleave = () => {
    isHover.value = !isHover.value
  },
  mouseenter = () => {
    isHover.value = !isHover.value
  },
  colorClick = (item: any, index: any) => {
    colorIdx.value = index
  },
  colorMouseenter = (item: any, index: any) => {
    colorName.value = item.name
    hoveridx.value = index
  },
  handleChange = () => {

  },
  imgMouseenter = (item: any) => {

  },
  imgClick = (item: any) => {
    console.log(item, 205);

    obj.value = item
  }
onMounted(() => {
  init()
})


</script>
<style lang='scss' scoped>
.details_index {
  width: 100%;
  background: #fff;

  .details_top {
    width: 1140px;
    margin: 0 auto;
    display: flex;
    font-size: 12px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .img {
      width: 80px;
      height: 50px;
    }

    .details_more {
      margin-right: 500px;
      position: relative;

      .details_title {
        border: 1px solid #ddd;
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 70px;
        cursor: pointer;
        background: #fff;

        &:hover {
          border-bottom: 1px solid #fff;
        }

        &:hover .arrow-down-bold {
          transform: rotate(180deg);
          transition: transform 0.3s linear;
        }

        .arrow-down-bold {
          font-size: 8px;
          transform: rotate(0deg);
          transition: transform 0.3s linear;
        }
      }

      .line {
        top: 20px;
        left: 0;
        position: absolute;
        background: #fff;
        height: 1px;
        width: 70px;
        z-index: 3000;
      }

      .more_block {
        position: absolute;
        top: 20px;
        left: 0;
        border: 1px solid #ddd;
        background: #fff;
        transition: height 0.5s;
        padding: 5px;
        width: 290px;
        z-index: 2000;

        .moreList {
          display: flex;
          margin: 7px 5px;

          .item_name {
            padding: 0 10px;
            color: #3c3c3c;
            font-weight: bold;
          }

          .item_child {
            padding-right: 10px;

            .item_i:hover {
              cursor: pointer;
              border-bottom: 1px solid #ddd;
            }
          }
        }
      }
    }

    .soushuo {
      .input {
        border: 2px solid #ff4400;
        width: 285px;
        height: 26px;
        outline: none;
        font-size: 12px;
      }

      .soutaobao {
        background: #ff4400;
        padding: 7px 15px;
        line-height: 28px;
        border: 2px solid #ff4400;
        color: #fff;

        &:hover {
          cursor: pointer;
          background: #ff2200;
        }
      }

      .soushop {
        color: #ff4400;
        background: #ffe4d0;
        height: 28px;
        margin: 0 10px;
        padding: 7px 15px;
        line-height: 28px;
        border: 2px solid #ff4400;

        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
  }

  .details_signboard {
    height: 150px;
    text-align: center;
    font-size: 30px;
  }

  .details_body {
    width: 1140px;
    margin: 0 auto;

    .body_top {
      display: flex;
      border: 1px solid #ddd;

      .body_top_left {
        width: 400px;
        margin-left: 20px;
        margin-top: 20px;

        .imgList {
          width: 400px;
          // height: 100px;
          display: flex;
          justify-content: flex-start;

          .item {
            margin: 10px 10px 10px 0;
            cursor: pointer;

            .img {
              width: 50px;
              height: 50px;
            }
          }
        }

        .collect {
          font-size: 12px;
          margin: 10px 0;
        }
      }

      .body_top_centent {
        width: 480px;
        margin: 20px;

        .shop_name {
          width: 480px;
          letter-spacing: 1px;
          min-height: 21px;
          font-size: 16px;
          font-weight: 700;
          line-height: 21px;
          color: #3c3c3c;
          word-break: break-all;
        }

        .shop_price {
          height: 87px;
          margin-top: 10px;
          background: #fff2e8;
          display: flex;
          font-size: 12px;
          color: #6c6c6c;

          .left {
            width: 70%;
            padding: 10px;

            .price {
              height: 30px;

              .price_num {
                font-size: 16px;
                margin-left: 30px;
              }
            }

            .tbprice {
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: flex-start;

              .tbPrice_num {
                font-size: 26px;
                margin-left: 15px;
                color: #ff4400;
              }

              .impulse {
                margin-left: 10px;
                padding: 0 5px;
                height: 18px;
                line-height: 18px;
                color: #fff;
                background: #ff8e1b;
              }
            }
          }

          .right {
            padding: 10px;
            width: 30%;
            display: flex;
            text-align: center;
            height: 42px;

            .right_left {
              width: 50%;
              border-right: 1px solid #ff8e1b;

              .count {
                font-size: 18px;
                font-weight: 600;
              }
            }

            .right_right {
              width: 50%;

              .count {
                font-size: 18px;
                font-weight: 600;
              }
            }
          }
        }

        .shop_discount {
          background-color: #fff9f5;
          line-height: 15px;
          font-size: 12px;
          padding: 10px;

          color: #3c3c3c;
        }

        .shop_color {
          padding: 5px 10px;
          height: 46px;
          clear: #c3c3c3;
          font-size: 12px;
          display: flex;

          .colorLists {
            position: relative;

            .colorType {
              height: 40px;
              width: 40px;
              margin: 0 5px;

              &:hover {
                cursor: pointer;
              }
            }

            .none {
              // margin: 1px;
              border: 2px solid #ddd;
            }

            .border {
              border: 2px solid red;
            }

            .colorName {
              padding: 2px 3px;
              position: absolute;
              text-align: center;
              white-space: nowrap;
              top: 45px;
              font-size: 14px;
              left: 0px;
              background: #fff;
              border: 1px solid #ddd;
            }
          }
        }

        .shop_distribution {
          padding: 5px 10px;
          font-size: 12px;
        }

        .shop_netContent {
          padding: 5px 10px;
          font-size: 12px;

          .netContent {
            margin-left: 20px;
            padding: 2px 3px;
            border: 2px solid red;
          }
        }

        .shop_count {
          padding: 10px;
          font-size: 12px;
        }

        .shop_button {
          margin: 10px;
          display: flex;

          .buy {
            width: 136px;
            height: 40px;
            color: #e5511d;
            border-color: #f0cab6;
            background: #ffe4d0;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            border: 1px solid #f30;
          }

          .addCar {
            width: 180px;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-left: 20px;
            border-color: #f40;
            background: #f40;
          }
        }

        .shop_commitment {
          font-size: 12px;
          margin: 10px;
        }

        .shop_pay {
          font-size: 12px;
          margin: 10px;
        }
      }

      .body_top_right {
        width: 198px;
        border-left: 1px solid #ccc;

        // .rank {
        //   height: 45px;
        //   line-height: 45px;
        //   color: #d28740;
        //   text-align: center;
        //   left: 45px;
        //   font-size: 16px;
        //   font-weight: 700px;
        //   background: linear-gradient(to bottom, #ffefc0 0%, #fff 100%);
        // }

        // .limit {
        //   height: 30px;
        //   line-height: 30px;
        //   text-align: center;
        //   left: 45px;
        //   font-size: 14px;
        //   font-weight: 700px;
        //   color: #d28740;
        //   background: linear-gradient(to bottom, #fff 0%, #ffefc0 100%);
        // }
        .look_title {
          font-size: 12px;
          color: #ccc;
          margin: 30px;
        }
      }
    }
  }
}
</style>