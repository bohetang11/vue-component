<template>
    <div class="goodsinfo-container">

        <!-- 小球动画 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>
        </transition>
        <!-- 轮播图区域 -->
        <banner :data='goodsBanner' class="banner"></banner>

        <!-- 商品名称区域 -->
        <div class="mui-card goodsname">
            <div class="mui-card-header">商品名称</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="sell">
                        市场价: <del>&yen;{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
                        销售价: <span>&yen;{{goodsInfo.sell_price}}</span>
                    </p>
                    <p class="buynum">
                        购买数量: 
                        <span @click='subtract'>-</span>
                        <input class="number" type="text" v-model="num">
                        <span @click='add'>+</span>
                    </p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="flag=!flag">加入购物车</mt-button>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card goodsdata">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="gocomment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import banner from "../../components/bannerList/";
export default {
  data() {
    return {
      num: 1,
      id: this.$route.params.id,
      goodsBanner: [],
      goodsInfo: {},
      stockquantity: 0,
      flag: false
    };
  },
  created() {
    this.getGoodsBanner();
    this.getInfo();
  },
  methods: {
    getGoodsBanner() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          // console.log(res)
          this.goodsBanner = res.body.message;
        }
      });
    },
    godesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    gocomment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    getInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          console.log(res);
          (this.goodsInfo = res.body.message[0]),
            (this.stockquantity = res.body.message[0].stock_quantity);
        }
      });
    },
    subtract() {
      if (this.num <= 1) {
        this.num = 1;
        return;
      }
      this.num--;
    },
    add() {
      if (this.num >= this.stockquantity) {
        this.num = this.stockquantity;
        return;
      }
      this.num++;
    },
    // 小球动画优化思路：
    // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
    // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
    // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
    // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
    // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()
    beforeEnter(el) {
      // el.style.opacity = 1;
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      
      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const clintX=badgePosition.left-ballPosition.left;
      const clintY=badgePosition.top-ballPosition.top;
      // el.style.transform = `translate(${clintX}px, ${clintY}px)`;
      el.style.transform = 'translate(150px, 150px)';
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    }
  },
  components: {
    banner
  }
};
</script>

<style lang='less'>
.goodsinfo-container {
  background-color: #eee;
  .ball {
    position: absolute;
    top: 380px;
    left: 130px;
    width: 20px;
    height: 20px;
    background-color: green;
    border-radius: 50%;
    z-index: 999;
  }
  .banner {
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 0 6px #ccc;
  }
  .goodsname {
    .sell {
      margin-bottom: 10px;
      span {
        color: red;
        font-size: 16px;
        font-weight: 700;
      }
    }
    .buynum {
      display: flex;
      line-height: 30px;
      text-align: center;
      span {
        display: inline-block;
        width: 40px;
        height: 33px;
        border: 1px solid #ccc;
        background-color: #eee;
        font-weight: 700;
        &:nth-of-type(1) {
          border-right: none;
          border-radius: 3px 0 0 3px;
        }
        &:nth-of-type(2) {
          border-left: none;
          border-radius: 0 3px 3px 0;
        }
      }
      .number {
        width: 40px;
        height: 33px;
        border-radius: 0;
        padding: 0;
        text-align: center;
      }
    }
  }
  .goodsdata {
    p {
      margin-bottom: 10px;
    }
    .mui-card-footer {
      display: block;
      button {
        margin-top: 10px;
      }
    }
  }
}
</style>

