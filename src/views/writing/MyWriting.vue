<template>
  <a-card>

    <a-table
      :columns="columns"
      :row-key="record=>record.key"
      :data-source="data"
      :loading="loading"
    >
    <span slot="operate" slot-scope="text, mycpt">
        <template>
          <a @click="showItem(mycpt.mycpt_id)">查看</a>
          <a-divider type="vertical"/>
          <a @click="rewiteItem(mycpt.mycpt_id)">修改</a>
          <a-divider type="vertical"/>
          <a @click="deleteItem(mycpt.mycpt_id)">删除</a>
        </template>
    </span>
    </a-table>
  </a-card>
</template>

<script>
  import {STable} from '@/components'
  import { getAllMyCompositions } from '@/api/writingApi'

  export default {
    name: 'MyWriting',
    components: {
      STable
    },
    data() {
      return {
        // 表头
        columns: [
          {
            title: '题目',
            dataIndex: 'cpt_title',
            align: "center",
            width: '300px'
          },
          {
            title: '分数',
            dataIndex: 'mark',
            align: "center"
          },
          {
            title: '最近更新时间',
            dataIndex: 'mycpt_create_time',
            align: "center",/*
      defaultSortOrder: ['descend']/!*ascend 根据该列数据，对表格进行排序*!/*/
          },
          {
            title: '提交次数',
            dataIndex: 'submit_times',
            align: "center",
            customRender: (text) => text + ' 次'
          },
          {
            title: '操作',
            dataIndex: 'operate',
            width: '250px',
            align: "center",
            scopedSlots: {customRender: 'operate'}
          }
        ],
        //数据
        data: [],
        //表格loading状态
        loading: false
      }
    },
    mounted() {
      this.loading = true;
      // 保存题库信息
      getAllMyCompositions().then(res => {
        // console.log(res.data)
        this.data = res.data;
        this.loading = false;
      })
    },
    methods: {
      //查询作文详情
      showItem(id) {
        console.log('查看作文')
        /*this.$router.push({
            path: "/writing/show_composition",
            query: {
              id: id
            }
          }
        )*/
      },
      //修改作文
      rewiteItem(id) {
        console.log('修改作文')
        /*this.$router.push({
            path: "/writing/update_composition",
            query: {
              id: id
            }
          }
        )*/
      },
      // 删除作文
      deleteItem(id) {
        console.log('删除作文')
      }
    }
  }
</script>
