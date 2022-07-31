<template>
  <div class="listView">
    <!--歌单详情上部分，将数据传递给子组件-->
    <list-view-top :playlist="state.playlist"></list-view-top>
    <!--歌单详情下部分-->
    <play-list :playlist="state.playlist"></play-list>
  </div>
</template>

<script>
import ListViewTop from "@/components/ListView/ListViewTop.vue";
import PlayList from "@/components/ListView/PlayList.vue";
import { getPlaylistDetail } from "@/api/index.js";
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import store from "@/store/index.js";

export default {
  name: "ListView",
  components: {
    ListViewTop,
    PlayList
  },
  setup(){
    // 获取当前路径
    const route = useRoute();
    // playlist用来存放歌单详情数据，creator用来存放作者数据，tracks存放歌曲
    // 不设置空对象，存放的数据在调用时会报undefined
    let state = reactive({
      playlist: {
        creator: {},
        tracks: []
      }
    });
    onMounted(async () => {
      let id = route.query.id;
      // 请求获取歌单详情数据
      let result = await getPlaylistDetail(id);
      // 将得到的数据存进入
      state.playlist = result.data.playlist;
      store.commit('setPlaylist', state.playlist.tracks)
    })
    return { state };
  }
};
</script>

<style scoped>

</style>