<!--  -->
<template>
  <div class="index">
    <Header />
    <div class="body">
      <div class="search">
        <div class="search_logo">
          <img src="../../assets/icon/hg.png" class="img" alt="回购网" />
        </div>
        <Search @searchClick="searchClick" />
      </div>

      <div class="title">
        <div v-for="(item, index) in titleList" :key="index" :class="['title_item', item == str ? 'active' : '']"
          @click="titleClick(item)">
          {{ item }}
        </div>
      </div>
      <div class="screening_head">
        <span>所有分类 ></span>
        <span class="is_screening" v-if="isScreening" @click="screeningClick">
          <span class="name">收起筛选</span>
          <el-icon>
            <ArrowUp />
          </el-icon>
        </span>

        <span class="is_screening" v-else @click="screeningClick">
          <span class="name">显示筛选</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>
      </div>
      <div :class="['screening_body', isScreening ? 'select-open' : 'select-close']">
        <div v-for="(item, index) in screeningList" :key="index"
          :class="['brand', index == screeningList.length - 1 ? '' : 'unbrand']">
          <div class="brand_name">{{ item.name }}</div>
          <div class="brand_list">
            <div v-for="(i, idx) in item.childList" :key="idx" class="brand_item">{{ i }}</div>
          </div>
        </div>
      </div>
      <div class="isFind">
        <div class="seek_name">是不是想找：</div>
        <div class="seek_seekList">
          <div class="seek_item" v-for="(item, key) in seekList" :key="key">{{ item }}</div>
        </div>
      </div>
      <div class="synthesis">
        <div :class="[synthesis == 'sort' ? 'sort' : 'public']" @click="synthesisClick('sort')">
          {{ synthesis == 'sort' ? '综合排序' : '综合' }}
        </div>
        <div :class="[synthesis == 'volume' ? 'volume' : 'public']" @click="synthesisClick('volume')">
          {{ synthesis == 'volume' ? '销量从高到低' : '销量' }}
        </div>
        <div :class="[synthesis == 'credit' ? 'credit' : 'public']" @click="synthesisClick('credit')">
          {{ synthesis == 'credit' ? '信用从高到低' : '信用' }}
        </div>
        <div class="price">
          价格 <el-icon>
            <ArrowDown />
          </el-icon>
          <div class="price_sort">
            <div class="price_sort_item">价格从高到低</div>
            <div class="price_sort_item">价格从低到高</div>
            <div class="price_sort_item">单价从高到低</div>
            <div class="price_sort_item">单价从低到高</div>
          </div>
        </div>
        <div class="section public">
          <input :value="startPrice"> -
          <input :value="endPrice">
          <div class="section_hover">
            <input :value="startPrice"> -
            <input :value="endPrice">
            <span class="priceSave">确定</span>
          </div>
        </div>

        <div class="sear">
          发货地 <el-icon>
            <ArrowDown class="arrow_down" />
            <ArrowUp class="arrow_up" />
          </el-icon>

          <div class="sear_hover">
            <div class="together">同城：{{ searList.together }}</div>
            <div class="idx">
              <span v-for="idx in searList.hotList">{{ idx }}</span>
            </div>
            <div class="id1">
              <span v-for="id1 in searList.cityList1">{{ id1 }}</span>
            </div>
            <div class="id2">
              <span v-for="id2 in searList.cityList2">{{ id2 }}</span>
            </div>
          </div>
        </div>
        <div :class="['grid', 'public', isGrid ? 'isGrid' : '']" @click="gridClick" title="网格模式">
          <el-icon>
            <Grid />
          </el-icon>
        </div>
        <div :class="['expand', 'public', isGrid ? '' : 'isGrid']" @click="gridClick" title="列表模式">
          <el-icon>
            <Expand />
          </el-icon>
        </div>
        <div style="width: 100px;">
          <!-- 占位 -->
        </div>
      </div>
      <div class="search_body">
        <div v-for="item in guessList">
          <HroductExhibition :item="item" @productClick="productClick" />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Header from '../../components/header.vue'
import Search from '../../components/search.vue';
import { ArrowUp, ArrowDown, Expand, Grid } from '@element-plus/icons-vue'
import HroductExhibition from '../../components/productExhibition.vue'
import http from '../../utils/request'
const titleList = ref(['所有商品', '天猫', '二手']),
  str = ref('所有商品'),
  isScreening = ref(true),
  screeningList = ref([{
    name: '品牌：', childList: ['蒙牛', '伊利', '光明', '三元', '欧德堡', 'The land/纽仕兰', 'Anchor/安佳',
      '认养一头牛', '蒙牛', '伊利', '光明', '三元', '欧德堡', 'The land/纽仕兰', 'Anchor/安佳', '认养一头牛'
    ]
  },
  { name: '包装种类：', childList: ['蒙牛', '伊利', '光明'] },
  { name: '饮品种类：', childList: ['全脂牛奶', '低脂牛奶', '脱脂牛奶'] },
  { name: '适用对象：', childList: ['老人', '孩子', '大人'] },
  ]),
  seekList = ref(['女装', '秋连衣裙', '女装上衣', '女裤女装夏裙', '子女装套装女装', '休闲女装外套', '女装大码', '女装气质女上衣', '优衣库女装', '裤子']),
  synthesis = ref("sort"),
  startPrice = ref('￥'),
  endPrice = ref('￥'),
  isGrid = ref(true),
  searList = ref({
    together: '深圳',
    hotList: ['北京', '上海', '广州', '深圳', '杭州', '海外', '江浙', '沪珠三角', '京津冀', '东三省', '港澳台', '江浙沪皖'],
    cityList1: ['长沙', '长春', '成都', '重庆', '大连', '东莞', '佛山', '福州', '贵阳', '合肥', '金华', '济南', '嘉兴', '昆明',
      '宁波', '南昌', '南京', '青岛', '泉州', '沈阳', '苏州', '天津', '温州', '无锡', '武汉', '西安', '厦门', '郑州', '中山',
      '石家庄', '哈尔滨'],
    cityList2: ['安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '湖北', '湖南', '江苏', '江西', '吉林', '辽宁', '宁夏', '青海', '山东', '山西', '陕西', '云南', '四川', '西藏', '新疆', '浙江', '澳门', '香港', '台湾', '内蒙古', '黑龙江']
  }),
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

  screeningClick = () => {
    isScreening.value = !isScreening.value
  },

  titleClick = (item: string) => {
    str.value = item
    console.log(item);
  },
  searchClick = (e: string) => {
    http.post('/product/search', {
      name: e,
      startPrice: startPrice.value,
      endPrice: endPrice.value
    }).then(res => {

    })
    console.log(e);

  },
  synthesisClick = (e: string) => {
    synthesis.value = e
  },
  gridClick = () => {
    isGrid.value = !isGrid.value
  },
  productClick = () => {

  }


</script>
<style lang='scss' scoped>
@keyframes slide-down {

  0% {
    transform: scale(1, 0);
  }

  25% {
    transform: scale(1, 0.25);
  }

  50% {
    transform: scale(1, 0.5);
  }

  75% {
    transform: scale(1, 0.75);
  }

  100% {
    transform: scale(1, 1);
  }
}

.select-open {
  animation: slide-down .2s ease-in;
  transition: .2s ease-in;
  transform-origin: 50% 0;
  height: 170px;
}

.select-close {
  transform: scaleY(0);
  transition: transform 0.2s;
  transform-origin: top center;
  transition: height .2s;
  height: 0;
}


.index {
  width: 100%;

  .body {
    width: 1190px;
    margin: auto;
    // overflow: hidden;

    .search {
      width: 940px;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .search_logo {
        height: 50px;
        width: 80px;

        img {
          height: 50px;
          width: 80px;
        }
      }
    }



    .title {
      width: 940px;
      display: flex;
      justify-content: flex-start;
      border-bottom: 2px solid #f40;

      .title_item {
        padding: 10px 15px;
        cursor: pointer;

        &:hover {
          background: #f40;
          color: #fff;
        }
      }

      .active {
        background: #f40;
        color: #fff;
      }


    }

    .screening_head {
      margin: 10px 0;
      width: 940px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;

      .is_screening {
        border: 1px solid #999;
        padding: 3px 5px;
        background: #f5f5f5;
        cursor: pointer;

        .name {
          &:hover {
            color: #f40;
          }
        }
      }
    }

    .screening_body {

      width: 940px;
      border: 1px solid #ccc;

      .unbrand {
        border-bottom: 1px solid #ccc;
      }

      .brand {
        margin: 5px;
        font-size: 12px;
        padding: 5px;
        display: flex;




        .brand_name {
          color: #999;
          width: 8%;
        }


        .brand_list {
          width: 95%;
          display: flex;
          flex-wrap: wrap;



          .brand_item {
            display: flex;
            flex-wrap: wrap;
            color: #333;
            margin: 0 10px 5px;
          }
        }
      }
    }

    .isFind {
      display: flex;
      width: 940px;
      font-size: 12px;
      border: 1px solid #ccc;
      margin-top: 20px;
      color: #666;

      .seek_name {
        width: 10%;
        padding: 10px;
      }

      .seek_seekList {
        width: 90%;
        display: flex;
        flex-wrap: wrap;


        .seek_item {
          cursor: pointer;
          padding: 10px 20px 10px 0;

          &:hover {
            color: #f40;
          }
        }
      }

    }

    .synthesis {
      margin: 10px 0;
      width: 940px;
      display: flex;
      font-size: 12px;
      color: #666;
      background: #f5f5f5;
      border: 1px solid #ccc;

      .public {
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
          color: #f40;
          background: #fff;
          // border-right: 1px solid #ccc;
          // border-left: 1px solid #ccc;
        }
      }



      .sort {
        background: #fff;
        padding: 10px 20px;
        border-right: 1px solid #ccc;
      }

      .sort {
        background: #fff;
        padding: 10px 20px;
        border-right: 1px solid #ccc;
      }

      .volume {
        background: #fff;
        padding: 10px 20px;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
      }

      .credit {
        background: #fff;
        padding: 10px 20px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }

      .price {
        padding: 10px 20px;
        cursor: pointer;
        position: relative;


        &:hover .price_sort {
          display: block;
        }
      }

      .price_sort {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        border: 1px solid #ccc;
        padding: 10px 0;
        width: 95px;
        color: #333;

        .price_sort_item {
          padding: 10px;

          &:hover {
            color: #f40;

          }
        }

        // display: none;
      }

      .section {
        position: relative;

        input {
          outline: none;
          width: 40px;
          height: 16px;
          border: 1px solid #ccc;
        }

        &:hover .section_hover {
          display: block;
        }
      }

      .section_hover {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        border: 1px solid #ccc;
        padding: 5px;
        width: 150px;

        input {
          outline: none;
          width: 40px;
          height: 25px;
          border: 1px solid #ccc;
        }

        .priceSave {
          display: inline;
          margin-left: 5px;
          color: #ffff;
          background: #f40;
          display: block;
          height: 28px;
          line-height: 28px;
          padding: 0 8px;
          float: right;
        }
      }

      .sear {
        margin-left: auto;
        padding: 10px 20px;
        cursor: pointer;
        position: relative;

        &:hover .sear_hover {
          display: block;
        }

        .sear_hover {
          display: none;
          width: 320px;
          padding: 0 10px;
          position: absolute;
          top: 42px;
          left: 0;
          background: #fff;
          // border: 1px solid #ccc;

          .together {
            padding: 10px;
          }

          .idx,
          .id1,
          .id2 {
            display: flex;
            flex-wrap: wrap;
            margin: 15px 0;


            span {
              padding: 5px 7.5px;

              &:hover {
                color: #f40;
              }
            }
          }
        }

        .arrow_down {
          display: block;
        }

        .arrow_up {
          display: none;
        }

        &:hover {
          background: #fff;
        }

        &:hover .arrow_up {
          display: block;
        }

        &:hover .arrow_down {
          display: none;
        }



      }

      .expand,
      .grid {
        font-size: 20px;
        padding: 8px 10px;
      }

      .isGrid {
        color: #f40;
        background: #fff;
      }
    }

    .search_body {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>