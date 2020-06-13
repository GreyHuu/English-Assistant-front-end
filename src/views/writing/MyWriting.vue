<template>
  <a-card>

    <a-table
      :columns="columns"
      :row-key="record=>record.key"
      :data-source="dataList"
      :loading="loading"
    >
    <span slot="operate" slot-scope="text, mycpt">
        <template>
          <a @click="viewItem(mycpt.mycpt_id)">查看</a>
          <a-divider type="vertical"/>
          <a @click="rewriteItem(mycpt.mycpt_id)">修改</a>
          <a-divider type="vertical"/>
          <a-popconfirm
          title="是否确认删除这篇作文"
          ok-text="确认"
          cancel-text="取消"
          @confirm="deleteItem(mycpt.mycpt_id)"
          @cancel="cancel">
            <a >删除</a>
          </a-popconfirm>
        </template>
    </span>
    </a-table>
  </a-card>
</template>

<script>
  import {STable} from '@/components'
  import { getAllMyCompositions, deleteMyCompositionById } from '@/api/writingApi'

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
            key: 'cpt_title',
            align: "center",
            width: '300px'
          },
          {
            title: '分数',
            dataIndex: 'mark',
            key: 'mark',
            align: "center",
            sorter: (a, b) => a.mark - b.mark,
          },
          {
            title: '最近更新时间',
            dataIndex: 'mycpt_create_time',
            key: 'mycpt_create_time',
            align: "center",
            sorter: function(a, b) {
              let aTimeString = a.mycpt_create_time;
              let bTimeString = b.mycpt_create_time;
              let aTime = new Date(aTimeString).getTime();
              let bTime = new Date(bTimeString).getTime();
              return aTime - bTime;
            },
            // defaultSortOrder: ['descend']/*ascend 根据该列数据，对表格进行排序*/
          },
          {
            title: '提交次数',
            dataIndex: 'submit_times',
            key: 'submit_times',
            align: "center",
            customRender: (text) => text + ' 次'
          },
          {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: '250px',
            align: "center",
            scopedSlots: {customRender: 'operate'}
          }
        ],
        //数据
        dataList: [],
        //表格loading状态
        loading: false,
      }
    },
    mounted() {
      this.loading = true;
      this.reLoad();
    },
    methods: {
      // 保存作文列表信息
      reLoad() {
        this.loading = true;
        getAllMyCompositions().then(res => {
          // console.log(res.data)
          this.dataList = res.data;
          this.loading = false;
        })
      },
      //查询作文详情
      viewItem(mycpt_id) {
        // console.log('查看作文')
        // console.log('mycpt_id='+mycpt_id)
        this.$router.push({
          name: "write",
          params: {
            state: 'view',
            mycpt_id: mycpt_id,
          }
        })
      },
      //修改作文
      rewriteItem(mycpt_id) {
        // console.log('修改作文')
        this.$router.push({
          name: "write",
          params: {
            state: 'rewrite',
            mycpt_id: mycpt_id,
          }
        })
      },

      cancel() {
        this.$message.error('取消删除');
      },
      // 删除作文
      deleteItem(mycpt_id) {
        deleteMyCompositionById({
          mycpt_id
        }).then(res =>{
          if(res.message === '删除成功') {
            // console.log('删除作文' + JSON.stringify(res));
            this.$notification.info({
              message: '操作成功',
              description: '成功删除一篇作文',
              duration: null
            });
            this.reLoad();
          } else {
            console.log('服务器返回：删除失败或发生错误')
            this.$notification.fail({
              message: '操作失败',
              description: '本次删除失败',
              duration: null
            })
        }
        })
      },
    }
  }
</script>
