<template>
  <div class="count-box">
    <button @click="subCount" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="addCount" class="add">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      required: true
    },
    goodsId: {
      type: Number
    }
  },
  methods: {
    subCount () {
      if (this.value <= 1) {
        return
      }
      this.$store.commit('cart/setCartItemCount', {
        goodsId: this.goodsId,
        goodsNum: this.value - 1
      })
    },
    addCount () {
      this.$store.commit('cart/setCartItemCount', {
        goodsId: this.goodsId,
        goodsNum: this.value + 1
      })
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$store.commit('cart/setCartItemCount', {
        goodsId: this.goodsId,
        goodsNum: num
      })
    }
  }
}
</script>

<style lang="less" scoped>
.count-box{
  width: 110px;
  display: flex;
  .minus, .add{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp{
    width: 40px;
    height: 30px;
    margin: 0 5px;
    outline: none;
    border: none;
    text-align: center;
    background-color: #efefef;
  }

}
</style>
