<template>
  <div class="index">
    <Header />
    <div class="flexd_top" v-show="searchShow">
      <div class="flexd_body">
        <Search @searchClick="searchClick" />
      </div>
    </div>
    <div :class="[isFixed ? 'in_block' : 'block']">
      <FixedBlock :isFixed="isFixed" @topClick="topClick" />
    </div>
    <div class="search">
      <div class="search_logo">
        <img src="../../assets/icon/hg.png" class="img" alt="惠购网" />
      </div>
      <div class="search_search">
        <Search @searchClick="searchClick" />
        <div class="search_bottom">
          <template v-for="(item, index) in arrList" :key="index">
            <div :class="['ite', hot(item)]">{{ item }}</div>
          </template>
        </div>
      </div>

    </div>
    <div class="body">
      <div class="body_left">
        <div class="title">主题市场</div>
        <div v-for="(item, idx) in themeLsit" :key="idx" class="themeLsit">
          <span :class="['iconfont item_icon', item.icon]" />
          <span v-for="(i, index) in item.childList" :key="index">
            <span class="item_name">{{ i }}</span>
            <span class="slash" v-show="index < item.childList.length - 1">/</span>
          </span>
        </div>
      </div>
      <div class="body_right">
        <div class="body_right_top">
          <div class="tm">天猫</div>
          <div class="jhs">聚划算</div>
          <div class="tmcs">天猫超市</div>
          <div>|</div>
          <div>司法拍卖</div>
          <div>飞天旅行</div>
          <div>天天特卖</div>
          <div>|</div>
          <div>造点新货</div>
          <div>苏宁易购</div>
          <div>淘宝心选</div>
          <div>智能生活</div>
        </div>
        <div class="body_right_bottom">
          <div class="body_right_bottom_left">
            <div class="el-carousel">
              <el-carousel height="280px" indicator-position="none" @change="carouselChange">
                <el-carousel-item v-for="(item, index) in imgList" :key="index">
                  <img style="height: 100%;width: 100%;" :src="item.url" :alt="item.name" />
                </el-carousel-item>
              </el-carousel>
              <div class="initia">
                <div v-for="(i, id) in imgList" :class="['in-item', { 'in-hover': id == inIndex }]" :key="id" />
              </div>
            </div>
            <div class="bottom-carousel">
              <div class="carousel_length">
                <span style="color: #ff1648;">{{ idx + 1 }}</span>
                /{{ hostList.length }}
              </div>
              <el-carousel height="180px" indicator-position="none" @change="hotChange">
                <el-carousel-item v-for="(item, index) in hostList" :key="index">
                  <img style="height: 100%;width: 100%;" :src="item.url" :alt="item.name" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="body_right_bottom_right">
            <div class="log_photo">
              <img src="../../assets/icon/xiaotao.png" style="height: 50px;width: 50px; " alt="小桃" />
              <div>hi,你好</div>
            </div>
            <div class="button">
              <div class="button_login" @click="login">登陆</div>
              <div class="button_re" @click="registerClick">注册</div>
              <div class="button_shop" @click="setupShopClick">开店</div>
            </div>
            <div class="img_fxsh">
              <img src="../../assets/img/home/fxsh.png" style="height: 100%;width: 100%; " alt="分享生活" />
            </div>
            <div class="notice">
              <div class="title">公告 新鲜事儿都在这里～</div>
              <div v-for="(item, index) in noticeLsit" class="item" :key="index">
                <span class="item_type">{{ item.type }}</span>
                <span class="item_content">{{ item.content }}</span>
              </div>
            </div>
            <div class="statistics">
              <div>
                <div class="iconfont icon icon-kongxinwujiaoxing" />
                <div>收藏的宝贝</div>
              </div>
              <div>
                <div class="iconfont icon icon-beibao" />
                <div>买过的店铺</div>
              </div>
              <div>
                <div class="iconfont icon icon-huapen" />
                <div>收藏的店铺</div>
              </div>
              <div>
                <div class="iconfont icon icon-shijianzhongbiao" />
                <div>我的足迹</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main_body">
      <div class="stuff_title">有好货</div>
      <div class="stuff">
        <div v-for="(item, index) in stuffList" :key="index">
          <HroductExhibition :item="item" @productClick="productClick" />
        </div>
      </div>
      <div class="stuff_title">猜你喜欢</div>
      <div class="stuff">
        <div v-for="(item, index) in guessList" :key="index">
          <HroductExhibition :item="item" @productClick="productClick" />
        </div>
      </div>
      <div class="end">
        <el-divider>
          <span>END</span>
        </el-divider>
      </div>
      <div class="body_endList">
        <div v-for="(item, index) in endList" class="item" :key="index">
          <div class="top">
            <img :src="item.url" :alt="item.name" class="img" />
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="bottom">
            <div v-for="(i, index) in item.child" class="child_i" :key="index">{{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header.vue'
import router from '@/router'
import Search from '@/components/search.vue'
import HroductExhibition from '@/components/productExhibition.vue'
import FixedBlock from '@/components/fixedBlock.vue'
import { ref, onMounted } from "vue";
import http from '@/utils/request'
import { ElMessage } from 'element-plus'

const searchShow = ref(false),
  isFixed = ref(false),
  searchClick = () => {
    router.push({ path: "/search" })
  },
  topClick = () => {
    let timer = setInterval(() => {
      let ispeed = Math.floor(scrollTop.value / 5)
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop.value + ispeed
      if (scrollTop.value === 0) {
        clearInterval(timer)
      }
    }, 10)
  },
  idx = ref(0),
  arrList = ref(['新款连衣裙', '四件套', '潮流T恤', '时尚女鞋', '短裤', '半身裙', '男士外套', '墙纸', '行车记录仪',
    '新款男鞋', '耳机', '时尚女包', '沙发']),
  hot = (item: String) => {
    return item == "潮流T恤" ? 'hot' : ''
  },
  themeLsit = ref([
    { icon: "icon-lianyiqun", childList: ['女装', '内衣', '家居'] },
    { icon: "icon-tubiao_xiezi", childList: ['女鞋', '男鞋', '箱包'] },
    { icon: "icon-jiating-yazi", childList: ['母婴', '童装', '玩具'] },
    { icon: "icon-nanzhuang", childList: ['男装', '运动户外',] },
    { icon: "icon-tubiao_meizhuang", childList: ['美妆', '彩妆', '个护'] },
    { icon: "icon-shouji", childList: ['手机', '数码', '企业'] },
    { icon: "icon-dajiadian", childList: ['大家电', '生活电器'] },
    { icon: "icon-quqi", childList: ['零食', '生鲜', '茶酒'] },
    { icon: "icon-chuju", childList: ['厨具', '收纳', '清洁'] },
    { icon: "icon-jiajujiafang", childList: ['家纺', '家饰', '鲜花'] },
    { icon: "icon-jiaoyuwenju", childList: ['图书音像', '文具'] },
    { icon: "icon-baojian", childList: ['医药保健', '进口'] },
    { icon: "icon-qichepeijian", childList: ['汽车', '二手车', '用品'] },
    { icon: "icon-ic_project", childList: ['房产', '装饰家居', '建材'] },
    { icon: "icon-shoubiao", childList: ['手表', '眼镜', '珠宝饰品'] },
  ]),
  imgList = ref([
    { url: '/src/assets/img/home/chhj.png', name: '潮货汇聚' },
    { url: '/src/assets/img/home/clmpd.png', name: '潮流名牌' },
    { url: '/src/assets/img/home/tmzc.png', name: '特卖专场' },
    { url: '/src/assets/img/home/zbys.png', name: '珠宝玉石' },
    { url: '/src/assets/img/home/xgmv.png', name: '性感美女' }
  ]),
  hostList = ref([
    { url: '/src/assets/img/home/hetao.png', name: '核桃' },
    { url: '/src/assets/img/home/baobao.png', name: '包包' },
    { url: '/src/assets/img/home/peiqi.png', name: '佩奇' },
    { url: '/src/assets/img/home/lanyueliang.png', name: '蓝月亮' },
    { url: '/src/assets/img/home/kele.png', name: 'kele' }
  ]),
  noticeLsit = ([
    { type: "规则", content: '规则2021年淘宝12.12招商规则' },
    { type: "热点", content: '热点关于推进“清朗”账号乱象专项整治的通知' },
    { type: "热点", content: '热点淘宝平台打击流量造假、黑公关、网络水军公告' },
  ]),

  stuffList = ref([
    { url: '/src/assets/img/home/yangbantu.png', name: "芊芊蔚蓝 民族风印花宽松牛", content: '民族风的印花，复古的牛仔面料，一等好材料' },
    { url: '/src/assets/img/home/yangbantu.png', name: "芊芊蔚蓝 民族风印花宽松牛", content: '民族风的印花，复古的牛仔面料，一等好材料' },
    { url: '/src/assets/img/home/yangbantu.png', name: "芊芊蔚蓝 民族风印花宽松牛", content: '民族风的印花，复古的牛仔面料，一等好材料' },
    { url: '/src/assets/img/home/yangbantu.png', name: "芊芊蔚蓝 民族风印花宽松牛", content: '民族风的印花，复古的牛仔面料，一等好材料', },
    { url: '/src/assets/img/home/yangbantu.png', name: "芊芊蔚蓝 民族风印花宽松牛", content: '民族风的印花，复古的牛仔面料，一等好材料', }
  ]),
  guessList = ref([
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 0, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 3, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 2, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 0, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 3, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 2, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸巾抽纸家用实惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300.01, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
    { url: '/src/assets/img/home/yangbantu.png', name: "纸惠装整箱20包餐巾纸卫生纸小包擦手面巾纸抽便携装", genre: 1, price: 300, },
  ]),
  endList = ref([
    { url: '/src/assets/icon/dun.png', name: "消费者保障", child: ["保障范围", "退货退款流程", "服务中心", "更多特色服"] },
    { url: '/src/assets/icon/wen.png', name: "新手上路", child: ["新手专区", "消费警示", "交易安全", "24小时在线帮助", "免费开店"] },
    { url: '/src/assets/icon/bin.png', name: "付款方式", child: ["快捷支付", "信用卡", "余额宝", "蚂蚁花呗", "货到付款"] },
    { url: '/src/assets/icon/tao.png', name: "淘宝特色", child: ["手机淘宝", " 旺旺/旺信", "大众评审"] },
  ]),

  scrollTop = ref(0),
  inIndex = ref(0),
  carouselChange = (e: number) => {
    inIndex.value = e
  },
  hotChange = (e: number) => {
    idx.value = e
  },
  productClick = (e: Object) => {

    router.push({ path: '/details' })
  },
  showIcon = () => {
    scrollTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    searchShow.value = document.documentElement.scrollTop > 150 ? true : false
    isFixed.value = document.documentElement.scrollTop > 400 ? true : false
  },
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
  registerClick = () => {
    router.push({ path: '/register' })
  },
  login = () => {
    router.push({ path: '/login' })
  },
  setupShopClick = () => {
    router.push({ path: '/release' })
  }


onMounted(() => {
  window.addEventListener("scroll", showIcon);
  init()
})







</script>

<style scoped lang="scss">
.index {
  width: 100%;
  background: linear-gradient(to bottom, #e8e2e0 0%, #e5edef 100%);
  padding-bottom: 20px;
  position: relative;

  .in_block {
    top: 88px;
    right: 80px;
    position: fixed;
    z-index: 2000;
  }

  .block {
    top: 500px;
    right: 80px;
    position: absolute;
    z-index: 2000;
  }

  .flexd_top {
    top: 0;
    position: fixed;
    z-index: 1000;
    height: 54px;
    width: 100%;
    background: #fff;

    .flexd_body {
      margin: 8px auto;
      width: 630px;
    }
  }

  .search {
    width: 1190px;
    height: 90px;
    margin: 31px auto 0;
    display: flex;
    justify-content: space-between;

    .search_logo {
      height: 58px;
      width: 190px;
      text-align: center;

      img {
        height: 50px;
        width: 80px;
      }
    }

    .search_search {
      font-size: 12px;

      .search_bottom {
        margin-top: 5px;
        display: flex;

        .ite {
          margin: 0 2px;

          &:hover {
            cursor: pointer;
          }
        }

        .hot {
          color: red;
        }
      }
    }

    .search_code {
      height: 80px;
      width: 80px;
    }
  }

  .body {
    width: 1190px;
    background: #fff;
    border-radius: 20px 20px 0 0;
    margin: 0 auto;
    font-family: "Hiragino Sans GB";
    display: flex;

    .body_left {
      width: 212px;
      padding: 6px 0;

      .title {
        width: 190px;
        text-align: center;
        font-size: 16px;
        color: #ff6200;
        margin-right: 52px;
      }

      .themeLsit {
        padding: 6px 0 3px 18px;
        font-size: 14px;
        color: #666;
        margin: 5px 0;

        &:hover {
          cursor: pointer;
          color: #ff5000;
        }

        .item_name {
          &:hover {
            border-bottom: 1px solid #ff5000;
          }
        }

        .item_icon {
          font-weight: 600;
          font-size: 16px;
          vertical-align: middle;
          margin-right: 12px;
        }

        .slash {
          margin: 0 8px;
        }
      }
    }

    .body_right {
      width: 978px;
      padding: 6px 0;

      .body_right_top {
        display: flex;
        padding-left: 20px;

        div {
          color: #333;
          margin: 0 5px;
          padding: 0 5px;

          &:hover {
            cursor: pointer;
            color: #ff6200;
          }
        }

        .tm {
          color: #ff0036;
          font-size: 16px;
        }

        .jhs {
          color: #ff0036;
          font-size: 16px;
        }

        .tmcs {
          color: #33c900;
          font-size: 16px;
        }
      }

      .body_right_bottom {
        display: flex;

        .body_right_bottom_left {
          .el-carousel {
            width: 520px;
            margin: 10px 5px 0 5px;
            position: relative;
            border-radius: 20px;

            &:hover {
              cursor: pointer;
            }

            .initia {
              position: absolute;
              bottom: 20px;
              left: 220px;
              display: flex;

              .in-item {
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background: #fff;
                margin: 0 5px;
              }

              .in-hover {
                background: red;
              }
            }
          }

          .bottom-carousel {
            width: 520px;
            margin: 5px;

            .carousel_length {
              text-align: right;
              font-size: 10px;
              height: 12px;
            }
          }
        }

        .body_right_bottom_right {
          width: 412px;
          border-radius: 10px;
          margin: 10px 20px;
          background: #f3f3f3;

          .log_photo {
            margin: 20px auto;
            height: 70px;
            width: 50px;
          }

          .button {
            display: flex;
            justify-content: space-between;
            margin: 10px;

            div {
              width: 125px;
              height: 32px;
              color: #fff;
              cursor: pointer;
              background: #ff5000;
              text-align: center;
              line-height: 32px;
              border-radius: 5px;
            }
          }

          .img_fxsh {
            width: 390px;
            height: 141px;
            margin: 0 auto;
          }

          .notice {
            font-size: 12px;
            color: #3c3c3c;
            margin: 14px;

            .title {
              font-weight: 600;
            }

            .item {
              cursor: pointer;
              margin: 8px 0;

              .item_type {
                color: #ff5000;
                font-weight: 600;
              }

              .item_content {
                margin-left: 5px;
              }
            }
          }

          .statistics {
            display: flex;
            justify-content: space-between;
            margin: 25px 20px 0;
            font-size: 12px;
            color: #333;

            div {
              width: 60px;
              text-align: center;
              cursor: pointer;

              &:hover .icon {
                color: #ff5000;
              }
            }

            .icon {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }

  .main_body {
    width: 1190px;
    background: #fff;
    border-radius: 0 0 20px 20px;
    margin: 0 auto;

    .stuff_title {
      font-size: 24px;
      color: #111;
      margin: 0 20px;
      padding-top: 10px;
    }

    .stuff {
      margin: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }

    .end {
      height: 50px;
      width: 200px;
      margin: 30px auto;

      span {
        color: #ccccd0;
        font-size: 18px;
      }
    }

    .body_endList {
      display: flex;
      padding-bottom: 50px;

      .item {
        width: 260px;
        margin: 0 30px;

        .top {
          height: 50px;
          font-size: 16px;

          .img {
            width: 36px;
            height: 36px;
            vertical-align: middle;
          }

          .name {
            margin: 12px;
          }
        }

        .bottom {
          display: flex;
          flex-wrap: wrap;

          .child_i {
            font-size: 12px;
            color: #999;
            margin: 4px 8px 4px 0;
            // white-space: wrap;
            // width: 100%;
            // word-break: normal;
            // word-wrap: normal;

            // word-break: break-all; /* 不换行 */
            &:hover {
              color: #ff5000;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
