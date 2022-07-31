<template>
  <div class="home">
    <!--顶部栏-->
    <top-nav></top-nav>
    <!--轮播图-->
    <banner></banner>
    <!--图标列表-->
    <icon-list></icon-list>
    <!--发现好歌单-->
    <music-list></music-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/HomeView/TopNav.vue'
import Banner from '@/components/HomeView/Banner.vue'
import IconList from '@/components/HomeView/IconList.vue'
import MusicList from '@/components/HomeView/MusicList.vue'

export default {
  name: 'HomeView',
  components: {
    TopNav,
    Banner,
    IconList,
    MusicList
  },
}
</script>