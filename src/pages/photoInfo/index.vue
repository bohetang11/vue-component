<template>
    <div class="photoinfo-container">   
        <div class="photoinfo-header">
            <h6 class="mui-ellipsis">{{photoinfo.title}}</h6>
            <p>
                <span class="mui-pull-left">发表时间:{{photoinfo.add_time | dateFormat}}</span>
                <span class="mui-pull-right">点击:{{photoinfo.click}}次</span>
            </p>
        </div>
        <hr>
        <!-- 缩略图 -->
        <img class="preview-img" v-for="(item, index) in list" :key="index" :src="item.src" height="100" @click="$preview.open(index, list)">
        <!-- 图片内容 -->
        <div class="newInfo-content" v-html='photoinfo.content'></div>   

        <comment :id='id'></comment>  
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../../components/comment/";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          //   console.log(res);
          this.photoinfo = res.body.message[0];
        } else {
          Toast("获取图片详情失败!请重试!");
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          console.log(res);
          res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.list = res.body.message;
        } else {
          Toast("获取缩略图失败!请重试!");
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>

<style lang='less'>
.photoinfo-container {
  .photoinfo-header {
    overflow: hidden;
    h6 {
      color: #26a2ff;
      text-align: center;
      font-weight: 700;
      line-height: 50px;
    }
    p {
      span {
        color: #999;
      }
    }
  }
  .newInfo-content {
    font-size: 14px;
    line-height: 30px;
  }
}
</style>

