<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="聚有品" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      :placeholder="placeHolder"
      @click="$router.push('/search')"
    />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      text="聚有品2.0全新上线，更多新品等你来选~"
    />

    <!-- 导航 -->
    <van-grid :column-num="5" icon-size="40">
      <van-grid-item
        v-for="item in navList" :key="item.imgUrl"
        :icon="item.imgUrl"
        :text="item.text"
        @click="$router.push('/category')"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img :src="picture.imgUrl" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title" v-html="richText"></p>
      <div class="goods-list">
        <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      placeHolder: '', // 搜索框提示文字
      bannerList: [], // 轮播图
      navList: [], // 商品导航
      picture: {}, // 首页广告图
      richText: '', // 首页富文本
      goodsList: [] // 商品信息列表
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.placeHolder = pageData.items[0].params.placeholder
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.picture = pageData.items[4].data[0]
    this.richText = pageData.items[5].params.content
    this.goodsList = pageData.items[6].data
  }
}
</script>

<style lang="less" scoped>
/* 主题 padding */
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

/* 导航条样式定制 */
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

/* 搜索框样式定制 */
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

/* 分类导航部分 */
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

/* 主会场 */
.main img {
  display: block;
  width: 100%;
}

/* 猜你喜欢 */
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

/* 商品样式 */
.goods-list {
  background-color: #f6f6f6;
}
</style>
