<template>
  <router-view/>
  <!--底部全局播放控件-->
  <play-controller></play-controller>
</template>

<script>
import PlayController from "@/components/ListView/PlayController.vue";

export default {
  name: 'App.vue',
  components: {
    PlayController
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
a{
  text-decoration: none;
  color: #3e4149;
}
</style>
