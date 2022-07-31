<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-geinituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlegedan-"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem leaderboard">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang-"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
      <span>直播</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconList"
};
</script>

<style scoped lang="less">
.iconList{
  display: flex;
  justify-content: space-around;
  padding: 0.4rem;
  .iconItem{
    display: flex;
    // 垂直布局
    flex-direction: column;
    // 垂直居中
    align-items: center;
    .icon{
      width: 0.8rem;
      height: 0.8rem;
    }
    span{
      padding: 0.1rem;
      font-size: 0.2rem;
    }
  }
}
</style>