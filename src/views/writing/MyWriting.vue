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
          <a @click="showItem(mycpt.id)">查看</a>
          <a-divider type="vertical"/>
          <a @click="rewiteItem(mycpt.id)">修改</a>
          <a-divider type="vertical"/>
          <a @click="deleteItem(mycpt.id)">删除</a>
        </template>
    </span>
    </a-table>
  </a-card>
</template>

<script>
  import {STable} from '@/components'


  const data = [
    {
      key: 1,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-29 18:00",
      times: 8
    },
    {
      key: 2,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-30 18:00",
      times: 8
    },
    {
      key: 3,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 4,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 5,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 6,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 7,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 8,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 9,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 10,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 11,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 12,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 13,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 14,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    },
    {
      key: 15,
      briefDIr: "【2017年6月六级真题】Motivation and Methods in Learning",
      score: 85,
      latelyTime: "2020-5-28 18:00",
      times: 8
    }
  ];

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
            dataIndex: 'briefDIr',
            align: "center",
            width: '300px'
          },
          {
            title: '分数',
            dataIndex: 'score',
            align: "center"
          },
          {
            title: '最近更新时间',
            dataIndex: 'latelyTime',
            align: "center",/*
      defaultSortOrder: ['descend']/!*ascend 根据该列数据，对表格进行排序*!/*/
          },
          {
            title: '提交次数',
            dataIndex: 'times',
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
        data,
        //表格loading状态
        loading: false
      }
    },
    //创建vue对象时，当html渲染之前就触发，只会触发一次
    created() {
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
