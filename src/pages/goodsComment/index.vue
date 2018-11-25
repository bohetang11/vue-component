<template>
    <div class="goodscomment-container">
        <comment :id='$route.params.id'></comment>
    </div>
</template>

<script>
    import comment from '../../components/comment/'

    export default {
        data(){
            return {

            }
        },
        components:{
            comment
        }
    }
</script>

<style>
.goodscomment-container{
    padding: 5px;
}
</style>
