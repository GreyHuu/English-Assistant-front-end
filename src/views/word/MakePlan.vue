<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">

    </div>


    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <!--开始学习页面-->
          <a-card v-if="setPlanState === false"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title=""
            :body-style="{ padding: 0 }">

            <img src="https://s1.ax1x.com/2020/06/06/tyY3Is.gif" alt="" style="width: 100%;height: 100%;">
          </a-card>
          <a-card v-if="setPlanState === true"
                  :loading="loading"
                  style="margin-bottom: 24px;"
                  :bordered="false"
                  title="设置计划"
                  :body-style="{ padding: 0 }">
            <div class="numberDiv">
              <div class="fourDiv" type="primary">
                <div>四级单词每日背诵量</div>
                <div class="dailyReciteDiv">
                  <a-input-number v-model="fourNumber"></a-input-number>
                </div>
                <a-button type="primary" @click="Submit(0, fourNumber)">提交</a-button>
              </div>
              <div class="sexDiv">
                <div>六级单词每日背诵量</div>
                <div>
                  <a-input-number v-model="sexNumber">{{ sexNumber }}</a-input-number>
                </div>
                <a-button type="default" @click="Submit(1, sexNumber)">提交</a-button>
              </div>
              <div class="kaoYanDiv">
                <div>考研单词每日背诵量</div>
                <div>
                  <a-input-number v-model="kaoYanNumber">{{ kaoYanNumber }}</a-input-number>
                </div>
                <a-button type="primary" @click="Submit(2, kaoYanNumber)">提交</a-button>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card  style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div slot="extra">
              <a-row class="more-info">
                <a-col :span="7">
                  <head-info title="今日单词" :content=todayWord :center="true" :bordered="false"/>
                </a-col>
                <a-col :span="8">
                  <head-info title="剩余天数" :content=remainDay :center="true" :bordered="false"/>
                </a-col>
                <a-col :span="8">
                  <head-info title="学习进度" :content=studyProcess :center="true" />
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <div style="padding-left: 180px;padding-top: 20px;">
                    <a @click="setPlan" v-if="setPlanState === false">去设置计划</a>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-card>
          <a-card title="开始学习" style="margin-bottom: 24px" :bordered="false" :body-style="{ padding: 0 }">
            <div style="min-height: 115px;margin-left: 80px;margin-top:40px;" >
              <a-button size="small" type="primary" slot="extra" style="margin-right: 20px;" @click="goRecite">背诵单词</a-button>
              <a-button size="small" type="primary" slot="extra"  @click="goReview">复习生词</a-button>
            </div>
          </a-card>

        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'


  export default {
    name: 'MakePlan',
    data () {
      return {
        avatar: '',
        user: {},
        setPlanState: false,
        loading: false,
        // 今日单词量
        todayWord:'',
        // 剩余天数
        remainDay:'',
        // 学习进度
        studyProcess:'',
        // 四级单词每日背诵量
        fourNumber: 200,
        // 六级单词每日背诵量
        sexNumber:null,
        // 考研单词每日背诵量
        kaoYanNumber: null,
        baseUrl : 'http://localhost:8888'
      }
    },
    mounted(){
      this.getgetStatitics()
    },
    components: {
      ACol,
      ARow,
      PageView,
      HeadInfo
    },
    methods: {
      getgetStatitics(){
        this.$http.get(this.baseUrl+"/plan/getStatiticsById")
          .then(res => {
            this.todayWord = res.data[0]+''
            this.remainDay = res.data[1]+''
            this.studyProcess = (res.data[2] - res.data[1])*res.data[0]+"/"+res.data[2]*res.data[0]
            console.log(res)
          })
      },
      setPlan(){
        // 显示计划框
        this.setPlanState = true;
      },
      Submit(type, number){
        this.setPlanState = false;
        this.$http.put(this.baseUrl+"/plan/updateDailyWordInPlan/"+number+"/"+type)
          .then(res => {
            console.log(res)
            this.$message.success(
              '计划设置成功'
            )
            this.getgetStatitics()
        })
      },
      goRecite(){
        this.$router.push({
            path: "/words/recite_words",
          }
        )
      },
      goReview(){
        this.$router.push({
            path: "/words/review_new_words",
          }
        )
      }
    }
  }
</script>

<style lang="less" scoped>
  .numberDiv{
    display: flex;
    justify-content: flex-start;
    padding: 40px;
    .fourDiv{
      padding: 20px;
      width: 200px;
      height: 200px;
      background: #e8e8e8;
      div{
        margin-bottom: 20px;
      }
    }
    .sexDiv{
      padding: 20px;
      width: 200px;
      height: 200px;
      background: #13c2c2;
      div{
        margin-bottom: 20px;
      }
    }
    .kaoYanDiv{
      padding: 20px;
      width: 200px;
      height: 200px;
      background: #909399;
      div{
        margin-bottom: 20px;
      }
    }
  }
    .more-info {
      border: 0;
      padding-top: 16px;
      /*margin: 16px 0 16px;*/
    }
    .headerContent .title .welcome-text {
      display: none;
  }
</style>
