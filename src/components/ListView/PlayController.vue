<template>
  <div class="playController">
    <!--点击封面歌曲名显示播放界面-->
    <div class="left" @click="show=!show">
      <!--封面-->
      <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
      <div class="content">
        <!--歌曲名-->
        <div class="title">{{playlist[playCurrentIndex].name}}</div>
        <div class="tips">横滑可以切换上下首</div>
      </div>
    </div>
    <div class="right">
      <!--播放按钮-->
      <svg v-if="paused"
           class="icon"
           aria-hidden="true"
           @click="play"
      >
        <use xlink:href="#icon-16"></use>
      </svg>
      <!--暂停按钮-->
      <svg v-else
           class="icon pause"
           aria-hidden="true"
           @click="play"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!--列表按钮-->
      <svg class="icon playlistMusic" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
    <audio ref="audio"
           :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
    >
    </audio>
  </div>
  <!--播放界面，@back接收到子组件请求时进行取反，show控制是否显示，传递数据给子组件-->
  <play-music
    @back="show=!show"
    v-show="show"
    :paused="paused"
    :play="play"
    :playDetail="playlist[playCurrentIndex]"
  >
  </play-music>
</template>

<script>
import { mapState  } from 'vuex'
import PlayMusic from "@/components/ListView/PlayMusic.vue";

export default {
  name: "PlayController",
  components: {
    PlayMusic
  },
  data(){
    return{
      paused: true,
      show: false,
    }
  },
  computed: {
    ...mapState(['playlist', 'playCurrentIndex'])
  },
  methods: {
    play(){
      // 点击按钮后判断播放按钮是否开启
      if(this.$refs.audio.paused){
        // 点击播放
        this.$refs.audio.play();
        // 隐藏播放按钮
        this.paused = false;
        this.UpdateTime()
      }else{
        // 点击暂停
        this.$refs.audio.pause();
        // 隐藏暂停按钮
        this.paused = true;
        clearInterval(this.$store.state.id)
      }
    },
    // 歌词更新时间
    UpdateTime(){
      this.$store.state.id = setInterval(() => {
        this.$store.commit('setCurrentTime', this.$refs.audio.currentTime)
      },1000)
    }
  },
  mounted(){
    // 调用store下的异步函数，第一个参数函数名reqLyric，第二个参数传入id
    this.$store.dispatch(
      'reqLyric',
      { id: this.playlist[this.playCurrentIndex].id }
    )

  },
  updated() {
    this.$store.dispatch(
      'reqLyric',
      { id: this.playlist[this.playCurrentIndex].id }
    )
  }
};
</script>

<style scoped lang="less">
.playController{
  width: 7.5rem;
  height: 1.2rem;
  left: 0;
  bottom: 0;
  background-color: #fff;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  .left{
    display: flex;
    padding: 0 0.4rem;
    img{
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.2rem;
      border-radius: 0.5rem;
    }
    .content{
      .title{
        font-size: 0.3rem;
        color: rgba(0, 0, 0, 0.8);
        // 防止标题溢出
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .tips{
        margin-top: 0.05rem;
        font-size: 0.1rem;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .right{
    display: flex;
    align-items: center;
    .icon{
      width: 0.6rem;
      height: 0.6rem;
      margin: 0 0.2rem;
    }
    .pause{
      width: 0.57rem;
      height: 0.57rem;
      padding-right: 0.05rem;
    }
    .playlistMusic{
      width: 0.57rem;
      height: 0.57rem;
      padding-right: 0.05rem;
      //svg线条变细
      shape-rendering: crispEdges;
    }
  }
}
</style>