<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="题目组名称">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="题目名称">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      :columns="columns"
      :row-key="record=>record.key"
      :data-source="data"
      :loading="loading"
    >
    <span slot="action" slot-scope="text, record">
        <template>
          <a @click="goToContent(record.id)">练习</a>
          <a-divider type="vertical"/>
          <a @click="deleteGroup(record.id)">删除</a>
        </template>
    </span>
    </a-table>
  </a-card>
</template>

<script>
  import {STable} from '@/components'

  export default {
    name: 'ReadingGroup',
    components: {
      STable
    },
    data() {
      return {
        description: '您可以在此页面进行阅读题目组的概况浏览和选择',
        // 查询参数
        queryParam: {},
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
            dataIndex: 'number',
            align: "center",
            customRender: (text) => text + ' 次'
          },
          {
            title: '最高分数',
            dataIndex: 'score',
            align: "center"
          },
          {
            title: '上次练习时间',
            dataIndex: 'time',
            align: "center"
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
        data: [
          {
            key: 1332,
            id: 123,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 133,
            id: 123,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 1334,
            id: 1334,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 137,
            id: 137,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 13386795679,
            id: 13386795679,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 1339342654765,
            id: 1339342654765,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 133901243214,
            id: 133901243214,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          }, {
            key: 13343254325,
            id: 13343254325,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 137222344,
            id: 137222344,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 13311111,
            id: 13311111,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 1339547,
            id: 1339547,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 1339043543,
            id: 1339043543,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          }, {
            key: 13341231,
            id: 13341231,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 1374444,
            id: 1374444,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 1338222,
            id: 1338222,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 133912,
            id: 133912,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          },
          {
            key: 13390123,
            id: 13390123,
            title: '题目组ID',
            description: 'description',
            number: 4,
            score: 85,
            time: "2020-5-29 18:00"
          }
        ],
        //表格loading状态
        loading: false
      }
    },
    created() {
    },
    methods: {
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
      deleteGroup(id) {

      }
    }
  }
</script>
