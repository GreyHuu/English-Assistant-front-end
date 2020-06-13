<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-input id="queryKeyword" v-model="keyword" placeholder="请输入关键词..." >
              <a-icon slot="prefix" type="search" />
            </a-input>
          </a-col>
          <a-col :md="8" :sm="24">
            <span>
              <a-button type="primary" @click="queryKeyword(keyword)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => keyword = ''">重置</a-button>
              <a-tooltip>
                <template slot="title">
                  刷新查询
                </template>
                <a-icon type="redo" style="margin-left: 100px;"  @click="reLoad"/>
              </a-tooltip>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-list  column="3" size="large" :pagination="pagination" :data-source="listData">
        <a-list-item slot="renderItem" slot-scope="item, index" >
          <span style="width: 200em">
             <b>【{{ item.cpt_title }}】</b><br>
            <b>要求：</b>{{item.current_direction}}
          </span>
          <a slot="actions" @click="write(index)" v-if="parseInt(item.mycpt_id) === -1">开始写作</a>
          <a slot="actions" @click="viewItem(item.mycpt_id)" v-else>查看作文</a>
          <a  slot="actions" @click="showMore(index)" v-if="item.folded">显示完整题目</a>
          <a  slot="actions" @click="showLess(index)" v-else>收起完整题目</a>
          <span slot="extra" style="width: 40em;text-align: right;">
            <span >{{item.cpt_reference}}</span>
            次引用
          </span>
        </a-list-item>
      </a-list>
    </div>
  </a-card>
</template>

<script>
  import { getAllCompositions, getCompositionQuestionByKeyword } from '@/api/writingApi'

  export default {
    name: 'WritingBank',
    data() {
      return {
        listData: [],
        // 查询参数
        keyword: '',
        isFolded: true,
        currentDirection: '',
        pagination: {
          // onChange: page => {
          //   console.log(page);
          // },
          pageSize: 10,
        },
      };
    },
    mounted() {
      this.reLoad();
    },
    methods: {
      reLoad() {
        this.loading = true;
        // 保存题库信息
        getAllCompositions().then(res => {
          console.log(res.data)
          this.listData = res.data;
          this.loading = false;
        })
      },
      loadQuery(keyword){
        this.loading = true;
        getCompositionQuestionByKeyword({
          keyword
        }).then(res => {
          // console.log('getCompositionQuestionByKeyword'+res.data)
          this.listData = res.data;
          this.loading = false;
        })
      },
      //点击开始写作
      write(index) {
        // console.log('点击开始写作,index='+index);
        // console.log('点击开始写作,title='+this.listData[index].cpt_title);
        this.$router.push({
          name: 'write',
          params: {
            state: 'write',
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
      //查看已提交的作文
      viewItem(mycpt_id) {
        this.$router.push({
          name: "write",
          params: {
            state: 'view',
            mycpt_id: mycpt_id,
          }
        })
      },
      //展示完整题目
      showMore(index) {

        this.listData[index].folded = false;
        console.log('more时： '+this.listData[index].folded)
        this.listData[index].current_direction = this.listData[index].cpt_direction;
      },
      //显示部分题目
      showLess(index) {
        console.log('less时： '+this.listData[index].folded)
        this.listData[index].folded = true;
        this.listData[index].current_direction = this.getBriefDir(this.listData[index].cpt_direction);
      },
      getBriefDir(direction) {
        if(direction.length > 212)
          return direction.substring(0, 212)+"...";
          else
            return direction;
      },
      //通过关键字进行模糊查询
      queryKeyword(keyword) {
        if(keyword !== '' && keyword != null){
          // console.log('keyword不为空 = ' + keyword);
          this.loadQuery(keyword);
        }
        else{
          this.reLoad();
        }
      },
    },
  };
</script>
<style></style>