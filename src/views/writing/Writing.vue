<template>
  <div io="app">
    <a-card>
      <div>
        <h2 style="text-align: center">【{{cpt_title}}】</h2>

        <span> {{cpt_direction}}</span>

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
  export default {
    name: 'Writing',
    data() {
      return {
        cpt_title: '',
        cpt_direction: '',
        //跳转到本页面应传的参数   write:开始写作，  rewrite:修改作文,   view：查看作文
        current_state: this.$route.query.state,
        isWrite: false,
        isRewrite: false,
        isView: false,
        //我的作文Item
        composition: {
          cpt_id: 0,
          user_id: 0,
          my_cpt: '',
          cpt_word_count: 0,
        },
      }
    },
    mounted() {
      this.cpt_title = this.$route.query.composition_bank_item.cpt_title;
      this.cpt_direction = this.$route.query.composition_bank_item.cpt_direction;

      if(this.current_state == 'write'){
        this.isWrite= true;
        this.composition.cpt_id = this.$route.query.composition_bank_item.cpt_id;
        this.composition.user_id = this.$route.query.composition_bank_item.user_id;
      }
      else if(this.current_state == 'reWrite')
        this.isRewrite= true;
      else if(this.current_state == 'view')
        this.isView= true;

    },
    methods: {
      /*writeCpt() {
        //字数统计
        this.composition.cpt_word_count= this.composition.my_cpt.length;

        console.log('作文内容：'+this.composition.my_cpt);
        console.log('字数统计：'+this.composition.cpt_word_count);
        console.log(this.current_state);
        console.log(this.isView)
      },*/
      write(e) {
        // console.log(e);
        // this.$message.success('Click on 提交');
        //字数统计
        this.composition.cpt_word_count= this.composition.my_cpt.length;

        console.log('标题内容：'+this.cpt_title);
        console.log('作文内容：'+this.composition.my_cpt);
        console.log('字数统计：'+this.composition.cpt_word_count);
      },
      cancel(e) {
        console.log(e);
        this.$message.error('Click on No');
      },
      back() {
        this.$router.go(-1)
      },
      rewrite() {
        this.current_state = 'rewrite';
        this.isWrite= false;
        this.isRewrite= true;
        this.isView= false;
        console.log(this.current_state)
      }
    }
  }
</script>

<style scoped>

</style>