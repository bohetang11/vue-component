<template>
    <div class="home-component">
        <!-- 轮播图 -->
        <mt-swipe class="binner-container" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newList">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		        <img src="../../images/menu2.png" alt="">
		        <div class="mui-media-body">图片分享</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		        <img src="../../images/menu3.png" alt="">
		        <div class="mui-media-body">商品购买</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		        <img src="../../images/menu4.png" alt="">
		        <div class="mui-media-body">留言反馈</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		        <img src="../../images/menu5.png" alt="">
		        <div class="mui-media-body">视频专区</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		        <img src="../../images/menu6.png" alt="">
		        <div class="mui-media-body">联系我们</div></a></li>
		    
		</ul>
    </div>
</template>

<script>
//引入消息提示框
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      bannerList: []
    };
  },
  created() {
    this.getBannerData();
  },
  methods: {
    getBannerData() {
      this.$http.get("http://www.lovegf.cn:8899/api/getlunbo").then(res => {
        console.log(res);
        if (res.body.status === 0) {
          this.bannerList = res.body.message;
        } else {
          Toast({
            message: "获取轮播图数据失败!请重试!",
            position: "middle",
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style lang='less'>
.home-component {
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
  .mui-table-view {
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>

