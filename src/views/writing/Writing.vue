<template>
  <div>
    <a-card>
      <div>
        <h2 style="text-align: center">【{{composition.cpt_title}}】</h2>

        <span><b>要求：</b>{{composition.cpt_direction}}</span>

      </div>
      <div style="margin-top: 2em;">
        <b>在下方写入正文:</b>
        <a-textarea placeholder="输入正文..." :rows="20" v-model:value="composition.mycpt" :readOnly="isView"/>
        <div style="margin-left: 69em;margin-top: 1em" v-if="isWrite">
          <a-popconfirm title="是否确认提交作文?"
                        ok-text="确认"
                        cancel-text="取消"
                        @confirm="write(composition.mycpt)"
                        @cancel="cancel('取消提交')">
            <a-button type="primary" ghost>
              提交
            </a-button>
          </a-popconfirm>
          <a-button type="primary" style="margin-left: 2em" @click="backToBank" ghost>
            返回题库
          </a-button>
        </div>

        <div style="margin-left: 49em;margin-top: 1em" v-else>
          <a-button type="primary" @click="viewModel(composition.mycpt_id, composition.cpt_model)" ghost v-if="isView">
            查看范文
          </a-button>
          <a-popconfirm title="是否确认删除这篇作文"
                                    ok-text="确认"
                                    cancel-text="取消"
                                    @confirm="deletecpt(composition.mycpt_id)"
                                    @cancel="cancel('取消删除')">
            <a-button type="primary" style="margin-left: 2em" ghost v-if="isView">
              删除
            </a-button>
          </a-popconfirm>
          <a-popconfirm title="是否开始修改?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="writeable"
                        @cancel="">
            <a-button type="primary" style="margin-left: 2em" ghost v-if="isView">
              修改
            </a-button>
          </a-popconfirm>
          <a-popconfirm title="是否确认提交修改后的作文?"
                        ok-text="确认"
                        cancel-text="取消"
                        @confirm="rewrite(composition.mycpt_id, composition.mycpt)"
                        @cancel="cancel('取消提交')">
            <a-button type="primary" style="margin-left: 2em" ghost v-if="isRewrite">
              提交修改
            </a-button>
          </a-popconfirm>
          <a-button type="primary" style="margin-left: 2em" @click="backToMy" ghost>
            返回我的作文
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import {
    addCompositionAndCount,
    deleteMyCompositionById,
    getAnExistingComposition,
    updateMyComposition
  } from '@/api/writingApi'

  export default {
    name: 'Writing',
    data() {
      return {
        cpt_reference: -1,

        //跳转到本页面应传的参数   write:开始写作，  rewrite:修改作文,   view：查看作文
        current_state: '',
        isWrite: false,
        isRewrite: false,
        isView: false,
        //我的作文Item
        composition: {
          mycpt_id: -1,
          cpt_id: -1,
          mycpt: '',
          cpt_create_time: '',
          cpt_word_count: -1,
          submit_times: -1,

          cpt_title: '',
          cpt_direction: '',
          cpt_model: '',
        },
      }
    },
    mounted() {
      this.current_state = this.$route.params.state;
      // console.log('current_state: '+this.current_state);
      //开始写作
      if(this.current_state === 'write'){
        this.isWrite = true;

        this.composition.cpt_id = this.$route.params.composition_bank_item.cpt_id;
        this.composition.cpt_title = this.$route.params.composition_bank_item.cpt_title;
        this.composition.cpt_direction = this.$route.params.composition_bank_item.cpt_direction;
        this.cpt_reference = this.$route.params.composition_bank_item.cpt_reference;

      } else if(this.current_state === 'rewrite') {      //修改
        this.isRewrite = true;
        this.composition.mycpt_id = this.$route.params.mycpt_id;
        this.reload(this.$route.params.mycpt_id);
      }
      else if(this.current_state === 'view') { //查看
        this.isView = true;
        this.composition.mycpt_id = this.$route.params.mycpt_id;
        this.reload(this.$route.params.mycpt_id);
      }
    },
    methods: {
      reload(mycpt_id) {
        getAnExistingComposition({
          mycpt_id
        }).then(res => {
          if(res.message ===  'success') {
            // console.log('查看传来的参数(Json)：'+JSON.stringify(res.data));
            this.composition.cpt_id = res.data.cpt_id;
            this.composition.mycpt = res.data.mycpt;
            this.composition.cpt_create_time = res.data.cpt_create_time;
            this.composition.cpt_word_count = res.data.cpt_word_count;
            this.composition.submit_times = res.data.submit_times;
            this.composition.cpt_title = res.data.cpt_title;
            this.composition.cpt_direction = res.data.cpt_direction;
            this.composition.cpt_model = res.data.cpt_model;
          }else {
            // console.log('服务器返回：添加失败或发生错误');
            this.$notification.fail({
              message: '请求失败',
              description: '退回到上一页',
              duration: null
            });
            this.$router.go(-1)
          }
        })
      },

      write(mycpt) {
        console.log('写作文： '+this.composition.mycpt)
        addCompositionAndCount({
          cpt_reference: this.cpt_reference + 1,
          cpt_id: this.composition.cpt_id,
          params: {
            mycpt
          },
        }).then(res => {
          // console.log('添加'+JSON.stringify(res));
          if (res.message === '添加成功') {
            // console.log('服务器返回：添加成功');
            this.$notification.success({
              message: '操作成功',
              description: '成功提交一篇作文，可在【我的作文】中查看',
              duration: null,
            });
          } else {
            // console.log('服务器返回：添加失败或发生错误')
            this.$notification.fail({
              message: '提交失败',
              description: '当前提交失败',
              duration: null
            })
          }
        })
      },

      cancel(content) {
        this.$message.error(content);
      },
      //返回到作文题库
      backToBank() {
        this.$router.push({
          name: "composition_bank",
        })
      },
      //返回到我的作文
      backToMy() {
        this.$router.push({
          name: "my_composition",
        })
      },

      viewModel(mycpt_id, model) {
        this.$router.push({
          name: 'viewModel',
          params: {
            mycpt_id, model
          }
        })
      },

      writeable() {
        this.isView = false;
        this.isRewrite = true;
      },
      //修改作文
      rewrite(mycpt_id, mycpt) {
        updateMyComposition({
          mycpt_id, mycpt
        }).then(res => {
          if (res.message === '修改成功') {
            this.$notification.success({
              message: '操作成功',
              description: '成功修改并提交本作文',
            });
          } else {
            this.$notification.fail({
              message: '提交失败',
              description: '当前提交失败',
              duration: null
            })
          }
          this.reload(mycpt_id)
        })
      },
      // 删除作文
      deletecpt(mycpt_id) {
        deleteMyCompositionById({
          mycpt_id
        }).then(res =>{
          if(res.message === '删除成功') {
            // console.log('删除作文' + JSON.stringify(res));
            this.$notification.info({
              message: '操作成功',
              description: '成功删除这篇作文',
              duration: null
            });
            this.$router.push({
              name: 'my_composition',
            });
          } else {
            console.log('服务器返回：删除失败或发生错误')
            this.$notification.fail({
              message: '操作失败',
              description: '本次删除失败',
              duration: null
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>