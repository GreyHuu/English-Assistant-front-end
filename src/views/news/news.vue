<template>
<div class="news">
    <div class="container" v-for="(i,index) in news" :key="index" >
        <div class="title">
            {{i.title}}
        </div>
        <img  class="image" v-bind:src="i.imgurl">
        <div class="content">
            {{i.news}}
        </div>
        <div class="chinese" v-show="flag[index]">
            {{i.chinese}}
        </div>

        <div class="comment">
            <input type="text" placeholder="请输入您的评论" ref="comment">
            <a-button @click="toComment(i.news_id,index)" >评论</a-button>
            <a-button @click="toCN(index)">翻译</a-button>
        </div>
        <div class="slit">-----------------评论区-------------------</div>
        <div class="lookcmt" >
            <a-list
                class="comment-list"
                item-layout="horizontal"
                :data-source="comments">

                <a-list-item slot="renderItem" slot-scope="item" v-show="i.news_id==item.new_id" class="com">
                <a-comment :author="getString(item.user_id)">
                    <p slot="content">
                    {{ item.comment }}
                    </p>
                </a-comment>
                </a-list-item>
            </a-list>
        </div>
    </div>

</div>
</template>

<script>
import Vue from 'vue';
import {Button,comment} from 'ant-design-vue';
import moment from 'moment';
import { getAllNews } from '@/api/newsApi';
import {getAllComments, insertComment} from '@/api/CommentsApi';
import { getCurrentUsers} from '@/api/CommentsApi';
Vue.use(Button).use(comment);

export default {
  data() {
    return {
      comments:[],
      flag:[false,false,false],
      news:[],
      user_id:0,
      getString:function(user_id){return "用户ID为："+user_id+"发表评论"}
    };
  },
  created(){
      this.getNews();
      this.getComments();
  },
  mounted:function(){

  },
  watch:{
      $route (to,from){
        // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
        this.getNews();
        this.getComments();
    }
  },
  methods:{
      //设置翻译开关按钮
      toCN(index){
          const that=this;
          that.$set(that.flag,index,true);//如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。所以要用到$set
          console.log(that.flag[index]);
          console.log(that.flag);
      },
      //1，获取当前用户信息，如未获取则提示登录
      //2.进行添加评论操作，评论成功后，重新获取评论信息进行前端展示
       async toComment(news_id,index){
          const that=this;
          const comment=that.$refs.comment;
          //console.log(comment);
        await getCurrentUsers().then(function(res){
              that.user_id=res.data.id;
              //console.log(that.user_id);
          }).catch((error) => {
            });

        //console.log(comment[index].value);
        //判断输入是否为空
        if(comment[index].value==""){
            that.$message.warning('请输入您的评论', 2,);
            return false;
        }
        var record={'comment':"",'new_id':news_id,'user_id':0};
        record.comment=comment[index].value;
        record.user_id=this.user_id;
        //console.log(this.user_id);

        //要先执行获得当前用户的方法
        insertComment(record).then(function(res){
            that.$refs.comment[index].value='';
            that.getComments();
        })
      },

      //获取新闻信息
      getNews(){
          var that=this;
        getAllNews().then(function (response){
            that.news = response.data
        })
      },
      //获得全部评论
      getComments(){
        var that=this;
        getAllComments().then(function (response){
        that.comments = response.data;
         //console.log(that.comments);
         })
      },
  }
}
</script>

<style lang="less" scoped>
 .container{
     display: block;
     padding: 25px;
     background-color: white;
     box-shadow:5px 5px 5px grey;
     margin: 20px;
     border-radius: 10px;
     .title{
         position: relative;
         font-size: 40px;
         font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

     }
     .image{
         border-radius: 10px;
         width: 100%;
         height: 400px;
     }
     input{
         position: relative;
         width: 80%;
         height: 35px;
         font-size:15px;
         margin-top: 20px;
         border: 1px solid;
     }
     .content .chinese{
         position: relative;
         font-size: 16px;
         color: black;
         text-align: justify;
         text-justify:inter-ideograph;
     }
     .comment{
        button{
            margin: 5px;
            height: 35px;
            background-color: transparent;
            color: black;
            border: 1px solid black;
        }
     }
     .com{
         height: 52px;
     }
     .slit{
         position: relative;
         margin: 10px;
     }
 }
</style>
