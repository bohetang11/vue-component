<template>
    <div class="photoshare-container">
        <!-- 顶部导航 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', {'mui-active':item.id===0}]" href="javascript:;" v-for="item in photoTitleList" :key='item.id' @click='getphotoList(item.id)'>
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片区域 -->
        <ul class="photo-list">
            <router-link v-for="item in photoList" :key="item.id" tag='li' :to="'/home/photoshare/photoinfo/'+item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h2 class="info-title">{{item.title}}</h2>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      photoTitleList: [],
      photoList: [
        // {
        //   id:37,
        //   img_url:'https://goss1.veer.com/creative/vcg/veer/612/veer-300448332.jpg',
        //   title: '现代简约 明亮的外表卧室卧室背景墙、吊顶黄色',
        //   zhaiyao: "不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计，欧式卧室飘窗装修效果图。"
        // }
      ]
    };
  },
  created() {
    this.getimgcategory();
    this.getphotoList(0);
  },
  methods: {
    getimgcategory() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          //   console.log(res);
          this.photoTitleList = res.body.message;
          this.photoTitleList.unshift({ id: 0, title: "全部" });
        } else {
        }
      });
    },
    getphotoList(id) {
      this.$http.get("api/getimages/" + id).then(res => {
        if (res.body.status === 0) {
          console.log(res);
          this.photoList = res.body.message;
        } else {
        }
      });
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //恢复跳转
    mui("body").on("click", "a", function() {
      document.location.href = this.href;
    });
  }
};
</script>
<style lang='less'>
.photoshare-container {
    .mui-slider{
        z-index: 0;
        .mui-scroll {
          touch-action: pan-y;
          z-index: 0;
        }
    }
  .photo-list {
      padding: 0 10px;
      li{
          position: relative;
          margin-bottom: 10px;
          box-shadow: 0 0 8px #ccc;
          img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
          }
          img{
              height: 400px;
              width: 100%;
              background-color: #ccc;
              display: block;
          }
          .info{
              width: 100%;
            //   height: 85px;
              position: absolute;
              left: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, .3);
              color: white;
              .info-title{
                  font-size: 16px;
                  line-height: 24px;
                  font-weight: 700;
              }
              .info-body{
                  font-size: 14px;
              }
          }
      }
  }
}
</style>

