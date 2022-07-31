<template>
  <div class="listViewTop">
    <div class="listViewTopNav">
      <!--背景图，动态获取图片路径-->
      <img class="bg" :src="playlist.coverImgUrl">
      <!--顶部左边，返回键与标题-->
      <div class="left">
        <!--点击三角图标返回到主页-->
          <svg class="icon" aria-hidden="true"
               @click="$router.go(-1)"
          >
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
        <div class="title">歌单</div>
      </div>
      <!--顶部右边，搜索与详情-->
      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="contentLeft">
        <!--封面-->
        <img :src="playlist.coverImgUrl">
        <!--播放次数-->
        <span>▷ {{changeValue(playlist.playCount)}}</span>
      </div>
      <div class="contentRight">
        <!--歌单名-->
        <h3>{{playlist.name}}</h3>
        <!--作者头像与名字-->
        <div class="author">
          <img class="header" :src="playlist.creator.avatarUrl" alt="">
          <span>{{playlist.creator.nickname}}</span>
        </div>
        <!--描述内容-->
        <div class="description">{{playlist.description}}</div>
      </div>
    </div>
    <div class="iconList">
      <!--评论-->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <!--分享-->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang-"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <!--下载-->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <!--多选-->
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan-"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListViewTop",
  // 接收父组件提供的playlist数据
  props: ['playlist'],
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
.listViewTop{
  width: 7.5rem;
  padding: 0 0.4rem;
  .bg{
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    // 设置-1减少层数使背景不会遮住内容
    z-index: -1;
    // 添加滤镜使背景模糊，降低对比度
    filter: blur(0.2rem) contrast(25%);
  }
  .listViewTopNav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    font-size: 0.4rem;
    padding-top: 0.3rem;
    .left, .right{
      display: flex;
      color: #fff;
      .icon{
        width: 0.5rem;
        height: 0.5rem;
        // SVG修改颜色
        fill: #fff;
      }
      .title{
        margin-left: 0.4rem;
      }
      .search{
        margin-right: 0.4rem;
      }
    }
  }
  .content{
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    .contentLeft{
      position: relative;
      img{
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.1rem;
      }
      span{
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        font-size: 0.24rem;
        color: white;
        display: flex;
        align-items: center;
      }
    }
    .contentRight{
      width: 3.5rem;
      h3{
        margin-top: 0.05rem;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        // 下面3个必须写，可以实现2行文字
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .author{
        display: flex;
        align-items: center;
        margin: 0.25rem 0;
        .header{
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.2rem;
        }
        span{
          font-size: 0.28rem;
          font-weight: 500;
          color: rgb(204, 204, 204);
        }
      }
      .description{
        font-size: 0.24rem;
        color: rgba(204, 204, 204, 0.9);
        //  color: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        text-overflow: ellipsis;
        // 下面3个必须写，可以实现2行文字
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  .iconList{
    display: flex;
    justify-content: space-around;
    .iconItem{
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon{
        width: 0.6rem;
        height: 0.6rem;
        fill: rgba(255, 255, 255, 0.9);
      }
      span{
        font-size: 0.05rem;
        padding-top: 0.05rem;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}
</style>