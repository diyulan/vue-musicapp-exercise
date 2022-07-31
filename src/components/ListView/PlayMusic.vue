<template>
  <div class="playMusic">
    <!--动态获取背景占满屏幕-->
    <div class="bg"
         :style="{ backgroundImage: `url(${playDetail.al.picUrl})`}"
    >
    </div>
    <div class="playTop">
      <!--返回键，点击子组件向父组件发送back请求-->
      <div class="back"
           @click="$emit('back'); goCover()"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <!--歌曲名和作者-->
      <div class="center">
        <div class="title">
          <!--marquee滚动标签-->
          <marquee behavior="scroll" direction="left">
            {{playDetail.name}}
          </marquee>
        </div>
        <div class="author">{{playDetail.ar[0].name}}</div>
      </div>
      <!--分享-->
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang-"></use>
        </svg>
      </div>
    </div>
    <div class="playContent"
         v-show="!isLyric"
         @click="goLyrics()"
    >
      <!--指针，点击播放获取active样式-->
      <img :class="{active: !paused}"
           class="needle"
           src="@/assets/img/needle-ab.png" alt=""
      >
      <!--磁碟-->
      <img class="disc" src="@/assets/img/disc-ip6.png" alt="">
      <!--磁碟中间的背景图，点击播放获取rotate样式-->
      <img :class="{rotate: !paused}"
        class="playImg"
        :src="playDetail.al.picUrl" alt=""
      >
    </div>
    <!--歌词-->
    <div class="playLyric"
         v-show="isLyric"
         @click="goCover()"
    >
      <p :class="{active: (
                  (currentTime * 1000) > item.pre &&
                  currentTime * 1000 < item.time)}"
         v-for="(item, i) in $store.getters.lyricList"
         :key="i"
         ref="playLyric"
      >
        {{item.lyric}}
      </p>
    </div>
    <div class="progress"></div>
    <div class="playFooter">
      <!--循环-->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <!--上一首-->
      <svg class="icon" aria-hidden="true"
           @click="goPlay(-1)"
      >
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!--播放-->
      <svg v-if="paused"
           class="icon play"
           aria-hidden="true"
           @click="play"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <!--暂停-->
      <svg v-else
           class="icon play"
           aria-hidden="true"
           @click="play"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!--下一首-->
      <svg class="icon" aria-hidden="true"
           @click="goPlay(1)"
      >
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <!--待播列表-->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlayMusic",
  props: ['playDetail', 'paused', 'play'],
  data(){
    return{
      isLyric: false
    }
  },
  computed:{
    ...mapState(['lyric', 'currentTime', 'playlist', 'playCurrentIndex']),
  },
  watch:{
    currentTime(newValue){
      let p = document.querySelector('p.active');
      if(p){
        let offsetTop = p.offsetTop;
        this.$refs.playLyric.scrollTop = p.offsetTop;
      }
    }
  },
  methods:{
    // 切换歌曲
    goPlay(num){
      let index = this.playCurrentIndex + num;
      if(index < 0){
        index = this.playlist.length - 1;
      }else if(index === this.playlist.length){
        index = 0;
      }
      this.$store.commit('setPlayIndex', index)
    },
    goCover(){
      this.isLyric = false;
    },
    goLyrics(){
      this.isLyric = !this.isLyric;
    }
  }
};
</script>

<style scoped lang="less">
.playMusic{
  position: fixed;
  left: 0;
  top: 0;
  //宽高各100vw、100vh占满全屏
  width: 100vw;
  height: 100vh;
  //优先级设高一点，避免主页打开显示其他内容
  z-index: 1;
  //添加滤镜后四周透明需要再加白色背景遮挡
  background-color: #fff;
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    // 添加滤镜使背景模糊，降低亮度
    filter: blur(0.8rem) brightness(80%);
  }
  .playTop{
    display: flex;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: 1.2rem;
    padding: 0.8rem 0.4rem;
    color: #fff;
    .icon{
      width: 0.7rem;
      height: 0.7rem;
      fill: #fff;
    }
    .center{
      width: 4.8rem;
      height: 0.75rem;
      line-height: 0.35rem;
      .title{
        font-size: 0.35rem;
        flex: 1;
      }
      .author{
        font-size: 0.1rem;
        color: #ccc;
      }
    }
  }
  .playContent{
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;
    .needle{
      position: absolute;
      width: 2.2rem;
      height: auto;
      left: 3.5rem;
      //避免指针被磁碟挡住
      z-index: 1;
      transform-origin: 0.3rem 0;
      transform: rotate(-20deg);
      transition: all 1s;
    }
    //指针移动到磁碟上
    .needle.active{
      position: absolute;
      width: 2.2rem;
      height: auto;
      left: 3.5rem;
      //避免指针被磁碟挡住
      z-index: 1;
      transform-origin: 0.3rem 0;
      transform: rotate(2deg);
      transition: all 1s;
    }
    .disc{
      position: absolute;
      width: 6rem;
      height: auto;
      left: calc(50% - 3rem);
      top: 2.2rem;
    }
    .playImg{
      position: absolute;
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      left: calc(50% - 2rem);
      top: 3.2rem;
    }
    .playImg{
      position: absolute;
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      left: calc(50% - 2rem);
      top: 3.2rem;
    }
    @keyframes changeDeg{
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
    }
    //磁碟中间背景图旋转动画
    .playImg.rotate{
      position: absolute;
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      left: calc(50% - 2rem);
      top: 3.2rem;
      animation: changeDeg 15s linear 1s infinite;
    }
  }
  .playFooter{
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-bottom: 0.8rem;
    width: 7.5rem;
    height: 1.5rem;
    left: 0;
    bottom: 0;
    .icon{
      fill: #fff;
      width: 0.6rem;
      height: 0.6rem;
    }
    .play{
      width: 1rem;
      height: 1rem;
    }
  }
  .playLyric{
    position: absolute;
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: calc(50% - 4rem);
    text-align: center;
    padding: 0.2rem 0;
    color: rgba(255, 255, 255, 0.8);
    //歌词溢出滚动
    overflow: scroll;
    //歌词选中时变色
    .active{
      color: #a5dee5;
    }
  }
}
</style>