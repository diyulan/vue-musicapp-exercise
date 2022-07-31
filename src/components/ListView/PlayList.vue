<template>
  <div class="playlist">
    <div class="playlist-top">
      <!--播放全部功能-->
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{playlist.tracks.length}}首)</div>
        </div>
      </div>
      <!--收藏功能-->
      <div class="btn">+ 收藏({{changeValue(playlist.subscribedCount)}})</div>
    </div>
    <div class="list">
      <!--循环歌曲数据-->
      <div class="playItem"
           v-for="(item, i) in playlist.tracks"
           :key="i"
      >
        <div class="left" @click="setPlayIndex(i)">
          <!--索引-->
          <div class="index">{{i + 1}}</div>
          <div class="content">
            <!--歌曲名-->
            <div class="title">{{item.name}}</div>
            <!--作者名-->
            <div class="author">
              <span>{{(item.ar[0].name)}}</span>
              <span class="connect">-</span>
              <span>{{item.al.name}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <!--播放按钮-->
          <svg class="icon" aria-hidden="true"
               @click="setPlayIndex(i)"
          >
            <use xlink:href="#icon-play"></use>
          </svg>
          <!--更多信息-->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo-shuxiang"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "PlayList",
  props: ['playlist'],
  methods: {
    ...mapMutations(['setPlayIndex'])
  },
  setup(){
    let changeValue = (num) =>{
      let res = 0;
      if(num >= 100000000){
        res = (num / 100000000).toFixed(0) + '亿';
      }else if(num > 10000){
        res = (num / 10000).toFixed(0) + '万';
      }
      return res;
    }
    return { changeValue }
  }
};
</script>

<style scoped lang="less">
.playlist{
  width: 7.5rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  .playlist-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.1rem;
    margin-top: 0.5rem;
    padding-top: 0.1rem;
    .left{
      display: flex;
      align-items: center;
      .icon{
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.2rem;
      }
      .text{
        display: flex;
        align-items: center;
        .title{
          font-size: 0.35rem;
        }
        .num{
          font-size: 0.3rem;
          color: #ccc;
        }
      }
    }
    .btn{
      display: flex;
      align-items: center;
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.3rem;
      font-size: 0.3rem;
      color: rgba(255, 255, 255, 0.9);
      background-color: #e84a5f;
      border-radius: 0.5rem;
    }
  }
  .list{
    .playItem{
      display: flex;
      justify-content: space-between;
      width: 100%;
      .left{
        display: flex;
        align-items: center;
        width: 4rem;
        height: 1rem;
        color: rgba(0, 0, 0, 0.5);
        .index{
          width: 0.2rem;
          font-size: 0.33rem;
        }
        .content{
          margin-left: 0.4rem;
          .title{
            font-size: 0.3rem;
            color: rgba(0, 0, 0, 0.9);
            // 防止标题溢出
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .author{
            font-size: 0.2rem;
            // 防止专辑名溢出
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            .connect{
              font-size: 0.01rem;
            }
          }
        }
      }
      .right{
        display: flex;
        align-items: center;
        //padding-top: 0.1rem;
        .icon{
          margin-top: 0.1rem;
          margin-right: 0.3rem;
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
}
</style>