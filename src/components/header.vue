<template>
  <div class="header_index">
    <div class="header_body">
      <div class="header_left">
        <div class="header_phone">
          中国大陆
          <el-icon class="arrow-down-bold">
            <arrow-down-bold />
          </el-icon>
          <div class="phone_block">
            <template v-for="(item, i) in phoneList" :key="i">
              <div class="phoneList_item">{{ item }}</div>
            </template>
          </div>
        </div>
        <div class="header_none">
          <span class="header_login" v-if="phone">{{ phone }}</span>
          <span class="header_login" v-else @click="login">亲，请登录</span>
          <span class="header_register" v-if="!phone" @click="registerClick">免费注册</span>
          <span class="header_register" v-else @click="logoutClick">退出</span>
        </div>
        <div class="header_phonetbb">手机逛淘宝</div>
        <div class="header_accessible">网页无障碍</div>
      </div>
      <div class="header_right">
        <div class="header_mytbb">
          我的淘宝
          <el-icon class="arrow-down-bold">
            <arrow-down-bold />
          </el-icon>
          <div class="mytbb_block">
            <div class="mytbb_item">已买到宝贝</div>
            <div class="mytbb_item">我的足迹</div>
          </div>
        </div>
        <div class="header_car">
          <el-icon class="shopping-cart">
            <shopping-cart />
          </el-icon>购物车
        </div>
        <div class="header_favorite">
          <el-icon class="star-filled">
            <star-filled />
          </el-icon>收藏夹
          <div class="favorite_block">
            <div class="favorite_item">收藏的宝贝</div>
            <div class="favorite_item">收藏的店铺</div>
          </div>
        </div>
        <div class="header_classify">商品分类</div>
        <div class="header_vertical">|</div>
        <div class="header_seller">
          千牛卖家中心
          <el-icon class="arrow-down-bold">
            <arrow-down-bold />
          </el-icon>
          <div class="seller_block">
            <template v-for="(item, i) in sellerList" :key="i">
              <div class="sellerList_item" @click="sellClick(item)">{{ item }}</div>
            </template>
          </div>
        </div>
        <div class="header_customer">
          联系客服
          <el-icon class="arrow-down-bold">
            <arrow-down-bold />
          </el-icon>
          <div class="customer_block">
            <div class="customer_item">消费者客服</div>
            <div class="customer_item">卖家客服</div>
          </div>
        </div>
        <!-- <div class="header_navigation">网站导航</div> -->
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { ArrowDownBold, ShoppingCart, StarFilled } from '@element-plus/icons-vue'
import router from '../router/index'
import store from '../store/index'
import { getUserINfo } from '../utils/cookie'
import http from "@/utils/request";
import { ElMessage, ElMessageBox } from 'element-plus'
const phone = getUserINfo() ? JSON.parse(getUserINfo()).phone : '',
  phoneList = ref(['全球', '中国大陆', '中国香港', '中国澳门', '中国台湾', '韩国', '日本', '马来西亚', '美国', '英国',
    '德国', '朝鲜', '俄罗斯', '泰国', '柬埔寨', '东胜神洲',]),
  sellerList = ref(['免费开店', '已卖出的宝贝', '出售中的宝贝', '卖家服务市场', '卖家培训中心', '体检中心', '问商友']),
  registerClick = () => {
    router.push({ path: '/register' })
  },
  logoutClick = () => {
    store.dispatch('logout', { phone: phone.value })
  },
  login = () => {
    router.push({ path: '/login' })
  },
  sellClick = (item: string) => {
    if (item == "免费开店") {
      if (getUserINfo() == '') {
        router.push({ path: '/login' })
      } else {
        http.post('/indentity/getAuthenticationStatus', {
          userId: JSON.parse(getUserINfo()).userId
        }).then((res: any) => {
          if (res.data == null) {
            ElMessageBox.confirm(
              '您还未认证身份，是否立即认证？',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                router.push({ path: '/indentityAuthentication' })
              }).catch(() => {
                ElMessage({
                  type: 'info',
                  message: '已取消',
                })
              })
          }
        })
      }
    }
  }
</script>


<style scoped lang="scss">
:v-deep(.el-icon) {
  text-align: center;
}

.header_index {
  height: 35px;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  justify-content: center;

  .header_body {
    width: 1190px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .header_left {
      display: flex;
      justify-content: flex-start;

      .header_phone {
        position: relative;
        height: 35px;
        width: 80px;
        margin: 0 6px;
        line-height: 35px;
        text-align: center;
        z-index: 1000;

        .arrow-down-bold {
          font-size: 8px;
        }

        &:hover {
          background: #fff;
        }

        &:hover .phone_block {
          display: block;
        }

        .phone_block {
          background: #fff;
          display: none;
          position: absolute;
          top: 35px;
          left: 0;
          width: 250px;
          height: 300px;
          overflow-y: scroll;

          .phoneList_item {
            padding-left: 8px;
            height: 29px;
            text-align: left;

            &:hover {
              background: #f5f5f5;
              cursor: pointer;
            }
          }
        }
      }

      .header_none {
        line-height: 35px;
        margin: 0 6px;

        .header_login {
          width: 60px;
          color: #f22e00;

          &:hover {
            cursor: pointer;
          }
        }

        .header_register {
          color: #6c6c6c;
          width: 50px;
          margin: 0 6px;

          &:hover {
            color: #f22e00;
            cursor: pointer;
          }
        }
      }

      .header_phonetbb,
      .header_accessible {
        line-height: 35px;
        color: #6c6c6c;
        margin: 0 6px;

        &:hover {
          color: #f22e00;
          cursor: pointer;
        }
      }
    }

    .header_right {
      display: flex;
      justify-content: flex-end;

      .header_mytbb {
        line-height: 35px;
        color: #6c6c6c;
        position: relative;
        margin: 0 6px;

        .arrow-down-bold {
          font-size: 8px;
        }

        &:hover {
          color: red;
          background: #fff;
          cursor: pointer;
        }

        &:hover .mytbb_block {
          display: block;
        }

        .mytbb_block {
          background: #fff;
          display: none;
          position: absolute;
          top: 35px;
          left: 0;
          width: 75px;

          .mytbb_item {
            color: #6c6c6c;
            height: 30px;
            padding-left: 5px;

            &:hover {
              background: #f5f5f5;
              cursor: pointer;
            }
          }
        }
      }

      .header_car {
        line-height: 35px;
        width: 65px;
        margin: 0 6px;
        color: #6c6c6c;

        &:hover {
          color: red;
          cursor: pointer;
        }

        .shopping-cart {
          margin-right: 5px;
          font-size: 20px;
          color: red;
          vertical-align: middle;
        }
      }

      .header_favorite {
        line-height: 35px;
        color: #6c6c6c;
        margin: 0 6px;
        position: relative;

        &:hover {
          color: red;
          cursor: pointer;
          background: #fff;
        }

        &:hover .favorite_block {
          display: block;
        }

        .favorite_block {
          background: #fff;
          display: none;
          position: absolute;
          top: 35px;
          left: 0;
          width: 75px;

          .favorite_item {
            height: 30px;
            padding-left: 5px;
            color: #6c6c6c;

            &:hover {
              background: #f5f5f5;
              cursor: pointer;
            }
          }
        }

        .star-filled {
          vertical-align: middle;
          font-size: 15px;
          margin-right: 5px;
        }
      }

      .header_classify {
        line-height: 35px;
        color: #6c6c6c;
        margin: 0 12px;

        &:hover {
          color: red;
          cursor: pointer;
        }
      }

      .header_vertical {
        line-height: 35px;
        color: #6c6c6c;
        // margin: 0 6px;
      }

      .header_seller {
        line-height: 35px;
        color: #6c6c6c;
        margin: 0 6px;
        padding: 0 6px;
        position: relative;

        &:hover {
          color: red;
          background: #fff;
          cursor: pointer;
        }

        &:hover .seller_block {
          display: block;
        }

        .arrow-down-bold {
          font-size: 8px;
        }

        .seller_block {
          background: #fff;
          display: none;
          position: absolute;
          top: 35px;
          left: 0;
          width: 100px;

          .sellerList_item {
            padding-left: 10px;
            color: #6c6c6c;

            &:hover {
              background: #f5f5f5;
              cursor: pointer;
            }
          }
        }
      }

      .header_customer {
        line-height: 35px;
        color: #6c6c6c;
        position: relative;
        padding: 0 6px;

        .arrow-down-bold {
          font-size: 8px;
          margin-left: 5px;
        }

        &:hover {
          color: red;
          background: #fff;
          cursor: pointer;
        }

        &:hover .customer_block {
          display: block;
        }

        .customer_block {
          background: #fff;
          display: none;
          position: absolute;
          top: 35px;
          left: 0;
          width: 70px;

          .customer_item {
            height: 30px;
            padding-left: 5px;
            color: #6c6c6c;

            &:hover {
              background: #f5f5f5;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>