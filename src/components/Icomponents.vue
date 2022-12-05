
<template>
  <div class="aav_index">
    <div class="aav_img" ref="target">
      <img :src="props.obj.url" :alt="props.obj.name" />
      <div v-if="!isOutside" :style="{ 'top': pos.top + 'px', left: pos.left + 'px' }" class="postion" />
      <div v-if="!isOutside" class="postion_right">
        <img :src="obj.url" class="postion_img" :style="{ 'top': -pos.top * 2 + 'px', left: -pos.left * 2 + 'px' }" />
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { ref, PropType, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
interface Foo { type: string, url: string, name: string, poster: string }

const props = defineProps({
  obj: {
    type: Object as PropType<Foo>,
    required: true,
    default: function () {
      return {}
    }
  }
}),
  target = ref(null),
  pos = ref({ left: 0, top: 0 }),
  { elementX, elementY, isOutside } = useMouseInElement(target),
  imgMouseenter = (e: any) => {
    console.log(e);
  }
console.log(props, "props");

watch([elementX, elementY], () => {
  if (elementX.value <= 400 && elementY.value <= 400 && elementX.value > 0 && elementY.value > 0) {
    if (elementX.value <= 100) {
      if (elementY.value <= 100) {
        pos.value.left = 0
        pos.value.top = 0
      } else if (elementY.value >= 300) {
        pos.value.left = 0
        pos.value.top = 200
      } else {
        pos.value.left = 0
        pos.value.top = elementY.value - 100
      }
    } else if (elementX.value >= 100 && elementX.value <= 300) {
      if (elementY.value <= 100) {
        pos.value.left = elementX.value - 100
        pos.value.top = 0
      } else if (elementY.value >= 300) {
        pos.value.left = elementX.value - 100
        pos.value.top = 200
      } else {
        pos.value.left = elementX.value - 100
        pos.value.top = elementY.value - 100
      }
    } else if (elementX.value >= 300) {
      if (elementY.value <= 100) {
        pos.value.left = 200
        pos.value.top = 0
      } else if (elementY.value >= 300) {
        pos.value.left = 200
        pos.value.top = 200
      } else {
        pos.value.left = 200
        pos.value.top = elementY.value - 100
      }
    }
  }
})



</script>
<style lang='scss' scoped>
.aav_index {
  width: 400px;
  height: 400px;

  .aav_img {
    height: 100%;
    width: 100%;
    position: relative;

    .postion {
      position: absolute;
      height: 200px;
      width: 200px;
      background: #ddd;
      opacity: 0.2;
    }

    .postion_right {
      position: absolute;
      left: 405px;
      top: 0;
      height: 400px;
      width: 400px;
      overflow: hidden;
    }

    .postion_img {
      position: absolute;
      height: 800px;
      width: 800px;
    }
  }

  .aav_video {
    width: 400px;
    height: 400px;
  }
}
</style>