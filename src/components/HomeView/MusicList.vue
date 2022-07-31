<template>
  <div class="musicList">
    <div class="musicList-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div class="swiper-container" id="musicSwiper">
        <div class="swiper-wrapper">
          <!--循环获取封面、播放次数、歌单名-->
          <router-link :to="{ path:'/listview', query:{ id:item.id} }"
                       class="swiper-slide"
                       v-for="(item, i) in state.musicList" :key="i"
          >
            <img :src="item.picUrl" :alt="item.name">
            <div class="count">
              <span>▷ {{changeValue(item.playCount) }}</span>
            </div>
            <div class="name">{{item.name}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper';
import { getMusicList } from '@/api'
import { reactive, onMounted, onUpdated } from 'vue'

export default {
  name: 'MusicList',
  setup(){
    // 用来存放请求数据的空数组
    let state = reactive({ musicList: [] });
    // 过滤播放次数
    let changeValue = (num) =>{
      let res = 0;
      if(num >= 100000000){
        res = (num / 100000000).toFixed(0) + '亿';
      }else if(num > 10000){
        res = (num / 10000).toFixed(0) + '万';
      }
      return res;
    }
    // 请求'网友精选碟歌单'数据，并存进musicList数组内
    onMounted(async ()=>{
      let result = await getMusicList();
      // 查看result数据
      // console.log(result)
      state.musicList = result.data.result;
    })
    // 控制歌单滑动功能，歌单显示3个，总共有10个
    onUpdated(()=>{
      const swiper = new Swiper('#musicSwiper', {
        slidesPerView: 3,
        spaceBetween: 10,
      });
    })
    return {
      state, changeValue
    }
  }
}
</script>

<style lang="less" scoped>
.musicList{
  width: 7.5rem;
  padding: 0 0.4rem;
  // 发现好歌单与查看更多
  .musicList-top{
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title{
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more{
      border: 1px solid #ccc;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      height: 0.5rem;
      width: 1.2rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  // 封面、播放次数、歌单名
  .mlist{
    .swiper-container{
      width: 100%;
      height: 3rem;
      .swiper-slide{
        display: flex;
        flex-direction: column;
        position: relative;
        // 封面
        img{
          width: 100%;
          height: auto;
          border-radius: 0.1rem;
        }
        // 播放次数
        .count{
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          font-size: 0.24rem;
          color: white;
          display: flex;
          align-items: center;
        }
        // 歌单名
        .name{
          width: 100%;
          height: 0.9rem;
          padding: 0.1rem 0;
          overflow: hidden;
          font-size: 0.24rem;
          line-height: 0.4rem;
        }
      }
    }
  }
}
</style>