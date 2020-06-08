<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-input id="queryKeyword" v-model="queryParam.keyword" placeholder="请输入关键词..." >
              <a-icon slot="prefix" type="search" />
            </a-input>
          </a-col>

          <a-col :md="8" :sm="24">
            <span>
              <a-button type="primary" @click="queryKeyword()">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = ''">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

<!--    <div>{{listData.data}}</div>-->

    <div>
      <a-list  column="3" size="large" :pagination="pagination" :data-source="listData">
        <a-list-item slot="renderItem" slot-scope="item, index" >

          <span style="width: 200em">
             <b>【{{ item.cpt_title }}】</b><br>
            <b>要求：</b>{{item.cpt_direction}}
          </span>
          <a slot="actions" src="" @click="write(index)">开始写作</a>
          <a  slot="actions" @click="showMore(item.cpt_id)">显示完整题目</a>
          <span slot="extra" style="width: 40em;text-align: right;"><span >{{item.cpt_reference}}</span>次引用</span>
        </a-list-item>
      </a-list>
    </div>
  </a-card>
</template>

<script>
  import {GetAllCompositions} from "@/api/writingApi";

  export default {
    data() {
      return {
        // 查询参数
        queryParam: {},
        listData: [],
        pagination: {
          // onChange: page => {
          //   console.log(page);
          // },
          pageSize: 10,
        },
      };
    },
    //挂载vue实例后的钩子函数，钩子在主页挂载时执行一次，如果没有缓存的话，再次回到主页时，此函数还会执行
    mounted() {
      this.loading = true;
      // 保存题库信息
      GetAllCompositions().then(res => {
        // console.log(res.data)
        this.listData = res.data;
        this.loading = false;
      })
    },
    methods: {
      //点击开始写作
      write(index) {
        // console.log('点击开始写作,index='+index);
        // console.log('点击开始写作,title='+this.listData[index].cpt_title);
        this.$router.push({
          name: 'write',   //name+params      path+query
          // path: '/writing/composition_bank/write',
          //加上时间戳，以保证每次请求url不同，避免缓存带来的影响
          // query: {
          //   id: new Date().getTime()
          // },
          params: {
            state: 'write',
            user_id: 19,
            composition_bank_item: {
              cpt_id: this.listData[index].cpt_id,
              cpt_title: this.listData[index].cpt_title,
              cpt_direction: this.listData[index].cpt_direction,
              cpt_model: this.listData[index].cpt_model,
              cpt_reference: this.listData[index].cpt_reference
            }
          }
        })
      },
      //展示完整题目
      showMore() {
        console.log('点击查看详情')
      },
      //通过关键字进行模糊查询
      queryKeyword() {
        console.log('点击查询');


      }
    },
  };
</script>
<style></style>