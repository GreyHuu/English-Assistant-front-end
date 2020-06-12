<template>
<div>
  <page-view  :title="false">
    <div slot="headerContent">
      <div class="title">我的评论<span class="welcome-text"></span></div>
    </div>
  </page-view>
  <a-table :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change="handleTableChange"
    rowKey="c_id">
    <span slot="name" >{{ user_name }}</span>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <span slot="action" slot-scope="record">
      <a v-on:click="Delete(record.c_id)">Delete</a>
      <a-divider type="vertical" />
    </span>
  </a-table>
</div>
</template>

<script>
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'
import Vue from 'vue';
import { getCurrentUserNav } from '@/api/login';
import { getCurrentUser} from "@/api/userApi";
import { getTheComments, deleteComments } from '@/api/CommentsApi';

//写死的table
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'comment',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    Radar
  },
  data () {
    return {
        data:[],
        columns,
        user_name:'',
        isDel:false,
        pagination: {
          total: 0,
          pageSize: 5,//每页中显示10条数据
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],//每页中显示的数据
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        queryParam: {
        page: 1,//第几页
        size: 10,//每页中显示数据的条数
      },
      }
    },
  created(){
    this.getTheC();
    this.getTheUser();
  },
  watch:{
      $route (to,from){
        // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
        this.getTheC();
        this.getTheUser();
    }
  },
  methods:{
    //获得当前用户
    getTheUser(){
      const that=this;
      getCurrentUser().then(function(res){
        that.user_name=res.data.nick_name;
        });
      },
      //获得当前用户评论
    getTheC(){
      const that=this;
      getTheComments().then(function(res){
        const pagination = { ...that.pagination };
        that.pagination = pagination;
        that.data=res.data;
      })
    },
    //删除点击事件
    Delete(c_id){
      const that = this;
      this.$confirm({
        title: '你确定要删除这个评论吗',
        content: '不可复原操作',
        okText: '是的',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
           deleteComments({c_id:c_id}).then(function(res){
             that.$message.success(
            '删除成功',
            2,
           );
           that.getTheC();
      })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.queryParam.page = pagination.current;
      this.queryParam.size = pagination.pageSize;
      this.getTheC();
    },

  },

  }
</script>

<style lang="less" scoped>
    .headerContent .title .welcome-text {
      display: none;
    }
    .resize-table-th {
      position: relative;
      .table-draggable-handle {
        height: 100% !important;
        bottom: 0;
        left: auto !important;
        right: -5px;
        cursor: col-resize;
        touch-action: none;
      }
    }
</style>
