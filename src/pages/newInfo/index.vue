<template>
   <div class="newInfo-component">
       <div class="newInfo-header">
            <h3 class="mui-ellipsis">{{newInfo.title}}</h3>
            <p>
                <span class="mui-pull-left">发表时间:{{newInfo.add_time}}</span>
                <span class="mui-pull-right">点击:{{newInfo.click}}次</span>
            </p>
        </div>
        <hr>
        <div class="newInfo-content" v-html="newInfo.content"></div>
    <comment :id='id'></comment>
    </div> 
</template>
<script>
    //引入消息提示框
    import { Toast } from "mint-ui";

    import comment from '../../components/comment/'
    export default {
        data(){
            return {
                id: this.$route.params.id,
                newInfo:{}
            }
        },
        created(){
            this.getNewInfo()
        },
        methods:{
            getNewInfo(){
                this.$http.get('api/getnew/'+this.id).then(res=>{
                    // console.log(res)
                    if(res.body.status===0){
                        this.newInfo=res.body.message[0]
                    }else{
                        Toast('获取内容失败!')
                    }
                })
            }
        },
        components:{
            comment
        }
    }

</script>
<style lang='less'>
    .newInfo-component{
        padding: 0 5px;
        .newInfo-header{
            overflow: hidden;
            h3{
                color: red;
                text-align: center;
                font-weight: 700;
                line-height: 50px;
            }
            p{
                span{
                    color: #26a2ff;
                }
            }
        }
        .newInfo-content{
            img{
                width: 100%;
            }
        }
    }
</style>
