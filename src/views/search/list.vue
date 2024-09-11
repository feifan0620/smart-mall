<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      placeholder="请输入搜索关键词"
      background="#ffffff"
      :value="querySearch"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div
        :class="['sort-item', { active: activeIndex === 0 }]"
        @click="toggleActive(0, 'all')">
        综合
      </div>
      <div
        :class="['sort-item', { active: activeIndex === 1 }]"
        @click="toggleActive(1, 'sales')">
        销量
      </div>
      <div
        :class="['sort-item', { active: activeIndex === 2 }]"
        @click="toggleActive(2, 'price')">
        价格
      </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>

  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getGoodsList } from '@/api/goods'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  data () {
    return {
      page: 1,
      activeIndex: null,
      goodsList: []
    }
  },
  methods: {
    // 获取搜索结果
    async getSearchResults () {
      const { data: { list } } = await getGoodsList({
        categoryId: this.$route.query.categoryId,
        goodsName: this.querySearch,
        page: this.page
      })
      this.goodsList = list.data
    },
    async toggleActive (index, sortType) {
      this.activeIndex = index
      const { data: { list } } = await getGoodsList({
        categoryId: this.$route.query.categoryId,
        goodsName: this.querySearch,
        page: this.page,
        sortType: this.sortType
      })
      this.goodsList = list.data
    }
  },
  created () {
    this.getSearchResults()
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
    .active  {
      color: #c21401;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
