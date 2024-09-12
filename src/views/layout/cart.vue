<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <div v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
    <div class="cart-title">
      <span class="all">共<i>{{ totalCount }}</i>件商品</span>
      <span @click="isEdit = !isEdit" class="edit">
        <van-icon v-show="!isEdit" name="edit" />
        {{ isEdit ? '完成' : '编辑' }}
      </span>
    </div>

    <!-- 购物车列表 -->
    <div class="cart-list">
      <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
        <van-checkbox :value="item.isChecked" @click="handleChecked(item.goods_id)"></van-checkbox>
        <div class="show">
          <img :src="item.goods.goods_image" alt="">
        </div>
        <div class="info">
          <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
          <span class="bottom">
            <div class="price">¥ <span>{{ item.goods.goods_price_max }}</span></div>
            <CountBox @input="value => handleCountChange(value,item.goods_id,item.goods_sku_id)" :value="item.goods_num"></CountBox>
          </span>
        </div>
      </div>
    </div>

    <div class="footer-fixed">
      <div @click="handleCheckedALL" class="all-check">
        <van-checkbox :value="isCheckedAll"  icon-size="18"></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span>¥ <i class="totalPrice">{{ totalPrice }}</i></span>
        </div>
        <div v-if="!isEdit" @click="goPay" :class="{ disabled: totalCheckedCount === 0 }" class="goPay">结算({{ totalCheckedCount }})</div>
        <div v-else @click="handleDel" :class="{ disabled: totalCheckedCount === 0 }" class="delete">删除</div>
      </div>
    </div>
    </div>

    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'CartPage',
  components: {
    CountBox
  },
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    // 复选框处理函数，设置每一项的选中状态
    handleChecked (id) {
      this.$store.commit('cart/setCartItemChecked', id)
    },
    // 全选框处理函数，设置所有商品的选中状态
    handleCheckedALL () {
      this.$store.commit('cart/setCartItemCheckedALL', this.isCheckedAll)
    },
    // 商品数量变化处理函数，设置商品数量
    handleCountChange (num, id, skuId) {
      this.$store.dispatch('cart/setCartItemCountAsync', { id, num, skuId })
    },
    handleDel () {
      if (this.totalCheckedCount === 0) return
      this.$store.dispatch('cart/delCartItemAsync')
    },
    goPay () {
      if (this.totalCheckedCount > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.cartCheckedItemList.map(item => item.id).join(',')
          }
        })
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    },
    // 将购物车商品列表映射为计算属性
    ...mapState('cart', ['cartList']),
    // 将购物车商品总数、选中商品数量、选中商品的总价映射为计算属性
    ...mapGetters('cart', ['totalPrice', 'totalCheckedCount', 'totalCount', 'isCheckedAll', 'cartCheckedItemList'])
  },
  async created () {
    // 如果 token 存在（用户已登录），则通知 store 异步获取购物车列表
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartListAsync')
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}

.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
