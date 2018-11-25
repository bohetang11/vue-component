<template>
    <div class="newlist-component">
        <ul class="mui-table-view">
				<li v-for="item in newlist" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="'/home/newList/newInfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h4 class="mui-ellipsis">{{item.title}}</h4>
							<p>
                  <span class="mui-pull-left">发表时间:{{item.add_time | dateFormat}}</span>
                  <span class="mui-pull-right">点击:{{item.click}}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
//引入消息提示框
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newlist: []
    };
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      this.$http.get("api/getnewslist").then(res => {
        if (res.body.status === 0) {
          // console.log(res)
          this.newlist = res.body.message;
        } else {
          Toast("新闻列表获取失败!请重试!");
        }
      });
    }
  }
};
</script>

<style lang="less">
.newlist-component {
  .mui-table-view-cell {
    a {
      .mui-media-body {
        h4 {
          font-weight: 700;
        }
        p {
          color: #26a2ff;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
