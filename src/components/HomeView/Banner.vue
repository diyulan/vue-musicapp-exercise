<template>
  <div id="swipercom">
    <div class="swiper-container" id="swiperIndex">
      <div class="swiper-wrapper">
        <!--循环获取轮播图-->
        <div class="swiper-slide" v-for="(item, i) in imgs" :key="i">
          <img :src="item.pic">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper';
import axios from 'axios';
import { getBanner } from '@/api'

export default {
  name: 'Banner',
  data(){
    return{
      // 至少准备1份本地图片，避免出现问题
      // require是动态获取本地图片
      // pic是后端请求banners的格式
      imgs:[
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
        { pic: require('../../assets/img/banner.webp') },
      ]
    }
  },
  async mounted(){
    // 异步请求轮播图，1是请求android资源类型
    let res = await getBanner(1);
    // 查看res数据
    // console.log(res)
    // 请求到的轮播图会替换imgs
    this.imgs = res.data.banners;
    const mySwiper = new Swiper('#swiperIndex', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
};
</script>

<style lang="less">
#swipercom{
  width: 7.5rem;
  #swiperIndex.swiper-container{
    width: 7.1rem;
    height: 2.6rem;
    border-radius: 0.1rem;
    .swiper-slide img{
      width: 100%;
    }
    .swiper-pagination-bullet-active{
      background-color: orangered;
    }
  }
}
</style>