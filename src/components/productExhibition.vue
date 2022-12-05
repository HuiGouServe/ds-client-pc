<template>
  <div class="product_index" @click.stop="productClick(item)">
    <img class="product_img" :src="item.url" :alt="item.name" />
    <div class="product_name" v-show="item.name">
      <span class="tg" v-if="item.genre === 1">天狗</span>
      <span class="tgnhj" v-else-if="item.genre === 2">天狗 年货节</span>
      <span class="hot" v-else-if="item.genre === 3">HOT</span>
      <span class="name">{{ item.name }}</span>
    </div>
    <div class="product_text" v-show="item.content">{{ item.content }}</div>
    <div class="product_price" v-show="item.price">
      <span class="size_12">￥</span>
      <span class="size_20">{{ item.price }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: {}
  }
})
const emit = defineEmits(['productClick']),
  productClick = (item: Object) => {
    emit("productClick", item)
  }

</script>


<style scoped lang="scss">
.product_index {
  color: #333;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    color: #ff5500;
    box-shadow: 3px 4px 3px #ddd;
  }

  width: 215px;

  .product_img {
    height: 215px;
    width: 215px;
  }

  .product_name {
    max-height: 42px;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-colamp: 2;

    .name {
      font-size: 14px;
      height: 50px;
    }

    .hot {
      color: #fff;
      margin-right: 5px;
      width: 30px;
      background: linear-gradient(to right, #ff8e00 0%, #ff5600 100%);
    }

    .tg {
      color: #fff;
      margin-right: 5px;
      width: 30px;
      background: #ff5f00;
    }

    .tgnhj {
      color: #fff;
      margin-right: 5px;
      width: 75px;
      background: #ff0036;
    }

    span {
      padding: 2px 3px;
      text-align: center;
      font-size: 12px;
      border-radius: 2px;
    }
  }

  .product_text {
    font-size: 14px;
    overflow: hidden; //隐藏文字
    text-overflow: ellipsis; //显示...
    white-space: nowrap; //不换行
    width: 210px; //超过100px就截取
  }

  .product_price {
    color: #ff4400;
  }
}
</style>