<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_max }}</span>
          <span class="oldprice">￥{{ detail.line_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList.slice(0,3)" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">

    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/')">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <div class="icon-cart">
          <span v-if="cartTotal > 0" class="num">{{ cartTotal>99? '99+': cartTotal }}</span>
          <van-icon name="shopping-cart-o" />
          <span>购物车</span>
        </div>
      </div>
      <div @click="addFn('cart')" class="btn-add">加入购物车</div>
      <div @click="buyFn()" class="btn-buy">立刻购买</div>
    </div>

    <van-action-sheet v-model="show" :title="this.mode === 'cart' ? '加入购物车' : '立即购买'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_max }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="addCount"></CountBox>
        </div>
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" @click="addToCart" v-if="this.mode === 'cart'">加入购物车</div>
          <div class="btn now" @click="goBuyNow" v-else>立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getGoodsDetail } from '@/api/goods'
import { getCommentList } from '@/api/comment'
import { addToCart, CartTotalCount } from '@/api/cart'
import defaultAvatar from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'ProDetail',
  components: { CountBox },
  mixins: [loginConfirm],
  data () {
    return {
      detail: {}, // 商品详情
      images: [], // 商品图片
      commentList: [], // 评价列表
      total: 0, // 评价总数
      defaultImg: defaultAvatar, // 评价用户默认头像
      current: 0, // 当前图片下标
      show: false, // 控制底部弹窗
      mode: 'cart', // 控制弹窗标题
      addCount: 1, // 购买数量
      cartTotal: 0
    }
  },
  computed: {
    ...mapGetters('cart', ['totalCount']),
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getDetail () {
      const { data } = await getGoodsDetail(this.goodsId)
      this.detail = data.detail
      this.images = data.detail.goods_images
    },
    // 获取评论信息
    async getComments () {
      const { data: { list } } = await getCommentList(this.goodsId)
      this.commentList = list.data
      this.total = list.total
    },
    addFn () {
      this.mode = 'cart'
      this.show = true
    },
    buyFn () {
      this.mode = 'buyNow'
      this.show = true
    },
    async addToCart () {
      if (this.loginConfirm()) {
        return
      }
      const { data } = await addToCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      Toast.success('添加成功')
      this.show = false
    },
    async goBuyNow () {
      if (this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsNum: this.addCount,
          goodsSkuId: this.detail.skuList[0].goods_sku_id
        }
      })
    }
  },
  async created () {
    // 获取商品详细数据
    this.getDetail()
    this.getComments()
    const { data } = await CartTotalCount()
    this.cartTotal = data.cartTotal
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
    .content{
      overflow: hidden;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
  .product {
    .product-title {
      display: flex;
      .left {
        img {
          width: 90px;
          height: 90px;
        }
        margin: 10px;
      }
      .right {
        flex: 1;
        padding: 10px;
        .price {
          font-size: 14px;
          color: #fe560a;
          .nowprice {
            font-size: 24px;
            margin: 0 5px;
          }
        }
      }
    }

    .num-box {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      align-items: center;
    }

    .btn, .btn-none {
      height: 40px;
      line-height: 40px;
      margin: 20px;
      border-radius: 20px;
      text-align: center;
      color: rgb(255, 255, 255);
      background-color: rgb(255, 148, 2);
    }
    .btn.now {
      background-color: #fe5630;
    }
    .btn-none {
      background-color: #cccccc;
    }
  }
  .footer .icon-cart {
    position: relative;
    padding: 0 6px;
    .num {
      z-index: 999;
      position: absolute;
      top: -2px;
      right: 0px;
      min-width: 16px;
      padding: 0 4px;
      color: #fff;
      text-align: center;
      background-color: #ee0a24;
      border-radius: 10px;
    }
  }
}

.tips {
  padding: 10px;
}
</style>
