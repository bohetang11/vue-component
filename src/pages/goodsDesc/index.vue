<template>
    <div class="goodsdesc-container">
        <h2>{{goodsDesc.title}}</h2>
        <hr>
        <div class="goodsdesc-content" v-html='goodsDesc.content'>

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:this.$route.params.id,
                goodsDesc: {}
            }
        },
        created(){
            this.getGoodsDesc()
        },
        methods:{
            getGoodsDesc(){
                this.$http.get('api/goods/getdesc/'+this.id).then(res=>{
                    if(res.body.status===0){
                        console.log(res)
                        this.goodsDesc=res.body.message[0]
                    }
                })
            }
        }
    }
</script>

<style lang='less'>
.goodsdesc-container{
    padding: 5px;
    h2{
        text-align: center;
        margin: 15px 0;
        color: #226aff;
        font-size: 16px;
        font-weight: 700;
    }
    .goodsdesc-content{
        img{
            width: 100%;
        }
    }
}
</style>

