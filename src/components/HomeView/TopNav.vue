<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
    <div class="topCenter">
      <span class="navBtn">我的</span>
      <span class="navBtn active">发现</span>
      <span class="navBtn">云村</span>
      <span class="navBtn">视频</span>
    </div>
    <div class="topRight" @click="$router.push('/searchview')">
      <!--搜索-->
      <svg class="icon search" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav"
};
</script>

<style scoped lang="less">
.topNav{
  width: 7.5rem;
  height: 1rem;
  display: flex;
  //首个元素在起点，末尾元素在终点
  justify-content: space-between;
  //垂直居中
  align-items: center;
  padding: 0 0.2rem;
  .icon{
    width: 0.4rem;
    height: 0.4rem;
  }
  .search{
    width: 0.47rem;
    height: 0.47rem;
  }
  .topCenter{
    width: 4.5rem;
    color: #C0C0C0;
    display: flex;
    // 平均分布
    justify-content: space-around;
    .active{
      color: black;
      font-weight: 900;
    }
  }
}
</style>