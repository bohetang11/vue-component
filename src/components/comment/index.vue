<template>
    <div class="newlist-comment">
        <h3>发表评论</h3><hr>
        <textarea v-model='msg' placeholder="请输入要BB的内容(最多吐槽120字)"></textarea>
        <mt-button type="primary" size="large" @click='postComment'>发表评论</mt-button>
        <div class="comment-list">
            <div v-for="(item, index) in commentList" :key="index" class="comment-item">
                <div class="comment-title">
                    第{{index+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time | dateFormat}} 
                </div>
                <div class="comment-content">
                    {{item.content || '此人有点懒,啥都没写!'}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click='getmore' plain>加载更多</mt-button>
    </div>
</template>
<script>
    //引入消息提示框
    import { Toast } from "mint-ui";
    export default {
        data(){
            return {
                pageindex:1,
                commentList:[],
                msg:''
            }
        },
        props:['id'],
        created() {
            this.getComments()
        },
        methods:{
            getComments(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(res=>{
                    // console.log(res)
                    if(res.body.status===0){
                        this.commentList=this.commentList.concat(res.body.message)
                    }else{
                        Toast('获取评论失败!')
                    }
                })
            },
            getmore(){
                this.pageindex++;
                this.getComments()
            },
            postComment(){
                if(this.msg.trim().length===0){
                    return Toast('评论内容不能为空!')
                }
                this.$http.post('api/postcomment/'+this.id).then(res=>{
                    if(res.body.status===0){
                        var cmt={
                            user_name: '匿名用户',
                            add_time: Date.now(),
                            content: this.msg.trim()
                        }
                        this.commentList.unshift(cmt)
                        this.msg=''
                    }else{
                        Toast('发表评论失败!请重试!')
                    }
                })
            }
        }
    }
</script>

<style lang='less'>
    .newlist-comment{
        h3{
            font-weight: 700;
        }
        textarea{
            height: 85px;
            padding: 10px 15px;
            font-size: 14px;
        }
        .comment-list{
            margin-top: 5px;
            .comment-item{
                .comment-title{
                    background-color: #ddd;
                    font-size: 14px;
                    line-height: 30px;
                }
                .comment-content{
                    font-size: 14px;
                    line-height: 35px;
                }
            }
        }
    }
</style>
