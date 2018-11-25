<template>
    <div class="goodsList-container">
        <div class="goods-item" v-for="(item, index) in goodsList" :key="index" @click='goDetail(item.id)'>
            <img src="https://imgservice2.suning.cn/uimg1/b2c/image/fULrBUkFYwQ5rEV2j9xmUg.png_400w_400h_4e" alt="">
            <h3>{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new">&yen;{{item.sell_price}}</span>&nbsp;&nbsp;&nbsp;
                    <del class="old">&yen;{{item.market_price}}</del>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button class="getmore" type="danger" size="large" @click='getmore' plain>加载更多</mt-button>
    </div>
</template>

<script>
import {Toast}  from 'mint-ui'
export default {
    data(){
        return {
            pageindex: 1,
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(res=>{
                if(res.body.status===0){
                    console.log(res)
                    this.goodsList=this.goodsList.concat(res.body.message)
                }else{
                    Toast('获取商品信息失败!请重试!')
                }
            })
        },
        getmore(){
            this.pageindex++;
            this.getGoodsList()
        },
        goDetail(id){
            this.$router.push({name:'goodsinfo',params:{id}})
        }
    }
}
</script>

<style lang='less'>
.goodsList-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px 5px;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 6px #ccc;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            width: 100%;
        }
        h3{
            font-size: 14px;
            font-weight: 700;
        }
        .info{
            background-color: #eee;
            padding: 5px;
            .new{
                font-size: 16px;
                font-weight: 700;
                color: red;
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .getmore{
        margin-top: 10px;
    }
}
</style>

