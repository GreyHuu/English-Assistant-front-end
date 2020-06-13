<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="题目组名称">
              <a-input v-model="queryParam" placeholder="输入题目组名称"/>
            </a-form-item>
          </a-col>
          <a-col offset="12" :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="queryTitle">查询</a-button>
              <a-button style="margin-left: 8px" @click="clearQuery">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      :columns="columns"
      :row-key="record=>record.id"
      :data-source="data"
      :loading="loading"
    >
    <span slot="action" slot-scope="text, record">
        <template>
          <a @click="goToContent(record.id)">练习</a>
          <a-divider type="vertical"/>
          <a-popconfirm
            title="是否确认删除该阅读题目（包括删除包含该阅读题组的记录以及其阅读题）?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDelete(record.id)"
          >
            <a>删除</a>
        </a-popconfirm>
        </template>
    </span>
    </a-table>
  </a-card>
</template>

<script>
  import {STable} from '@/components'
  import {getAllGroup, searchGroupByTitle, deleteGroupById} from "@/api/readingApi";
  import moment from "moment"

  export default {
    name: 'ReadingGroup',
    components: {
      STable
    },
    data() {
      return {
        description: '您可以在此页面进行阅读题目组的概况浏览和选择',
        // 查询参数
        queryParam: "",
        // 表头
        columns: [
          {
            title: '题目组ID',
            dataIndex: 'id',
            align: "left"
          },
          {
            title: '题目组标题',
            dataIndex: 'title',
            align: "center"
          },
          {
            title: '题目组描述',
            dataIndex: 'description',
            align: "center"
          },
          {
            title: '练习次数',
            dataIndex: 'times',
            align: "center",
            customRender: (text) => text ? text + "次" : "暂无信息"
          },
          {
            title: '最高分数',
            dataIndex: 'score',
            align: "center",
            customRender: (text) => text ? text : "暂无信息"
          },
          {
            title: '上次练习时间',
            dataIndex: 'time',
            align: "center",
            customRender: (text) => text ? moment(parseInt(text)).format("YYYY-MM-DD hh:mm:ss") : "暂无信息"
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '150px',
            align: "center",
            scopedSlots: {customRender: 'action'}
          }
        ],
        //数据
        data: [],
        //表格loading状态
        loading: false
      }
    },
    mounted() {
      this.reFlush();
    },
    methods: {
      reFlush() {
        this.loading = true;
        // 获取组
        getAllGroup().then(res => {
          const {data} = res;
          data.key = data.id;
          this.data = data;
          this.loading = false;
        })
      },
      //跳转到该练习
      goToContent(id) {
        this.$router.push({
            path: "/reading/reading_groups/reading",
            query: {
              id: id
            }
          }
        )
      },
      // 删除该练习组
      confirmDelete(id) {
        deleteGroupById({
          id
        }).then(res => {
          this.$message.success('删除成功！');
          this.reFlush();
        })
      },
      //模糊搜索题目组
      queryTitle() {
        if (this.queryParam) {
          this.loading = true;
          searchGroupByTitle({title: this.queryParam}).then(res => {
            const {data} = res;
            data.key = data.id;
            this.data = data;
            this.loading = false;
          });
        } else {
          this.$message.warning('请输入要搜索的题目');
        }
      },
      // 重置查询
      clearQuery() {
        this.queryParam = "";
        this.reFlush();
      }
    }
  }
</script>
