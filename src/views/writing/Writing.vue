<template>
  <div io="app">
    <a-card>
      <div>
        <h2 style="text-align: center">【{{cpt_title}}】</h2>

        <span><b>要求：</b>{{cpt_direction}}</span>

      </div>
      <div style="margin-top: 2em;">
        <b>在下方写入正文:</b>
        <a-textarea placeholder="输入正文..." :rows="20" v-model:value="composition.mycpt" :readOnly="isView"/>
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
            返回
          </a-button>
        </div>

        <div style="margin-left: 69em;margin-top: 1em" v-else>
          <a-button type="primary" @click="viewModel" ghost>
            查看范文
          </a-button>
          <a-button type="primary" @click="rewrite()" ghost>
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
  import { AddCompositionAndCount} from '@/api/writingApi'

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
          mycpt: '',
          cpt_word_count: 0,
          cpt_create_time: '',
        },
      }
    },
    mounted() {
      this.current_state = this.$route.params.state;
      //开始写作
      if(this.current_state == 'write'){
        this.isWrite = true;

        this.composition.cpt_id = this.$route.params.composition_bank_item.cpt_id;
        this.cpt_title = this.$route.params.composition_bank_item.cpt_title;
        this.cpt_direction = this.$route.params.composition_bank_item.cpt_direction;
        this.cpt_reference = this.$route.params.composition_bank_item.cpt_reference;
      } else if(this.current_state == 'reWrite')      //修改
        this.isRewrite = true;
      else if(this.current_state == 'view')       //查看
        this.isView = true;
    },
    methods: {
      reload() {

      },

      write(e) {
        const mycpt = this.composition.mycpt;
        console.log(this.composition)
        AddCompositionAndCount({
          cpt_reference: this.cpt_reference + 1,
          cpt_id: this.composition.cpt_id,
          params: { mycpt },
        }).then(res => {
          // console.log('添加'+JSON.stringify(res));
          if (res.message == '添加成功') {
            console.log('服务器返回：添加成功');
            this.$notification.success({
              message: '操作成功',
              description: '成功提交一篇作文，可在【我的作文】中查看',
              duration: null,
            });
          } else {
            console.log('服务器返回：添加失败或发生错误')
            this.$notification.fail({
              message: '提交失败',
              description: '当前提交失败',
              duration: null
            })
          }
        })
      },

      cancel(e) {
        this.$message.error('取消提交');
      },

      back() {
        this.$router.go(-1)
      },

      viewModel() {

      },

      rewrite() {
        // this.isWrite= false;
        // this.isRewrite= true;
        // this.isView= false;
        console.log(this.current_state)
      },

    }
  }
</script>

<style scoped>

</style>