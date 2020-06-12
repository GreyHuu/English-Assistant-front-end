<template>
  <div io="app">
    <a-card>
      <div>
        <h2 style="text-align: center">【{{cpt_title}}】</h2>

        <span><b>要求：</b>{{cpt_direction}}</span>

      </div>
      <div style="margin-top: 2em;">
        <b>在下方写入正文:</b>
        <a-textarea placeholder="输入正文..." :rows="20" v-model:value="composition.my_cpt" :readOnly="isView"/>
        <div style="margin-left: 69em;margin-top: 1em" v-if="isWrite">
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="write"
            @cancel="cancel"
          >
          <a-button type="primary" ghost>
            提交
          </a-button>
          </a-popconfirm>

          <a-button type="primary" style="margin-left: 2em" @click="back" ghost>
            取消
          </a-button>
        </div>

        <div style="margin-left: 69em;margin-top: 1em" v-else>
          <a-button type="primary" @click="rewrite" ghost>
            修改
          </a-button>
          <a-button type="primary" style="margin-left: 2em" @click="back" ghost>
            返回
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import {AddCompositionAndCount} from "@/api/writingApi";

  export default {
    name: 'Writing',
    data() {
      return {
        cpt_title: '',
        cpt_direction: '',
        cpt_reference: -1,

        //跳转到本页面应传的参数   write:开始写作，  rewrite:修改作文,   view：查看作文
        current_state: '',
        isWrite: false,
        isRewrite: false,
        isView: false,
        //我的作文Item
        composition: {
          cpt_id: -1,
          my_cpt: '',
          cpt_word_count: 0,
          cpt_create_time: '',
          cpt_model: ''
        },
      }
    },
    //组件被激活后的钩子函数，每次回到页面都会执行
    activated() {
      this.current_state = this.$route.params.state,
      this.composition.cpt_id = this.$route.params.composition_bank_item.cpt_id;
      this.composition.user_id = this.$route.params.user_id;
      this.cpt_title = this.$route.params.composition_bank_item.cpt_title;
      this.cpt_direction = this.$route.params.composition_bank_item.cpt_direction;
      this.composition.cpt_model = this.$route.params.composition_bank_item.cpt_model;
      this.cpt_reference = this.$route.params.composition_bank_item.cpt_reference;
      // console.log('1:'+this.composition.user_id);
      // console.log('2:'+this.cpt_title)

      if(this.current_state == 'write'){
        this.isWrite = true;
      } else if(this.current_state == 'reWrite')
        this.isRewrite = true;
      else if(this.current_state == 'view')
        this.isView = true;
    },
    methods: {
      write(e) {
        // this.composition.my_cpt =
        //字数统计
        this.composition.cpt_word_count = this.getWordCount(this.composition.my_cpt)
        let month = new Date().getMonth() + 1
        this.composition.cpt_create_time = new Date().getFullYear() + '-' + month + '-' + new Date().getDate()
        console.log(this.composition)
        AddCompositionAndCount({
          mycpt: this.composition,
          cpt_reference:  this.cpt_reference + 1
        }).then( res=>{
          if(res.data.success) {
            console.log('服务器返回：添加成功');
            this.$notification.open({
              message: '操作成功',
              description:
                '成功提交添加一篇作文，可在【我的作文】中查看',
              icon: <a-icon type="smile" style="color: #108ee9" />,
            });
          } else {
            console.log('服务器返回：添加失败或发生错误')
          }
        })
      },
      cancel(e) {
        this.$message.error('取消提交');
      },
      back() {
        this.$router.go(-1)
      },
      rewrite() {
        // this.isWrite= false;
        // this.isRewrite= true;
        // this.isView= false;
        console.log(this.current_state)
      },

      //统计作文字数
      getWordCount(cpt){
        return cpt.split(" ").length;
      }
    }
  }
</script>

<style scoped>

</style>