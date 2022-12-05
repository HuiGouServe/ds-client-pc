
 
<template>

  <div :style="{ height: height + 'px' }" style="width: 100%">
    <router-view v-slot="{ Component }" :key="$route.path">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" :key="title" />
        </keep-alive>
      </transition>
    </router-view>
    <Foot />
  </div>
</template>

<script setup lang="ts">
import Foot from '@/components/foot.vue'
import { useRouter } from 'vue-router'
const height = document.documentElement.clientHeight,
  title = useRouter().currentRoute.value.path
</script>
 
<style>
@import "./assets/style/public.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
