<template>
    <mt-swipe class="binner-container" :auto="4000">
        <mt-swipe-item v-for="(item, index) in data" :key="index">
            <a :href="item.url">
                <img :src="item.img">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
    props:['data']
}
</script>
<style lang='less'>
.binner-container {
    height: 200px;
    .mint-swipe-item {
      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        background-color: pink;
      }
      &:nth-child(3) {
        background-color: green;
      }
      a {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
