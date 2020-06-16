<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
    </div>
    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <!--开始学习页面-->
          <a-card v-if="setPlanState === false && watchWord === false"
                  :loading="loading"
                  style="margin-bottom: 24px;"
                  :bordered="false"
                  title=""
                  :body-style="{ padding: 0 }">

            <img src="https://s1.ax1x.com/2020/06/06/tyY3Is.gif" alt="" :loading="loading" style="width: 100%;height: 100%;">
          </a-card>
          <!--设置计划框-->
          <a-card v-if="setPlanState === true"
                  :loading="loading"
                  style="margin-bottom: 24px;"
                  :bordered="false"
                  title="设置计划"
                  :body-style="{ padding: 0 }">
            <a-tag style="margin-left: 40px;margin-top:30px;">请在对应的框中填写每日单词量！</a-tag>
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
            <div style="margin-left: 40px;margin-bottom:30px;"><a @click="returnMain"> 返回</a></div>
            <br/>
          </a-card>
          <a-card v-if="watchWord === true"
                  :loading="loading"
                  style="margin-bottom: 24px;padding: 20px;"
                  :bordered="false"
                  title=""
                  :body-style="{ padding: 0 }">
            <div>
              <div class="wordDiv" >{{ wordinfo.englishWord }}</div>
              <br/>
              <div class="labaDiv">
                <div style="margin-right: 40px;color: black" >/{{ wordinfo.pa }}/</div>

                <img src="https://s1.ax1x.com/2020/06/05/trULSP.png" alt="" style="width: 25px;height: 25px;" @click="play" class="img"/>
                <audio ref='audio' :src="wordinfo.pron" style="display: none"></audio>
              </div>

              <br/><p style="color: black">{{ wordinfo.chineseWord }}</p>
            </div>
            <hr/>
            <br/>
            <div>
              <div>
                <div style="font-size: 15px;color:#002140;" >例句1</div><br/>
                <p class="exampleP">
                  {{ wordinfo.englishInstance1 }}
                </p>
                <p class="meanP">
                  {{ wordinfo.chineseInstance1 }}
                </p>
              </div>
              <br>
              <div>
                <div style="font-size: 15px;color:#002140;">例句2</div><br/>
                <p  class="exampleP">
                  {{ wordinfo.englishInstance2 }}
                </p>
                <p class="meanP">
                  {{ wordinfo.chineseInstance2 }}
                </p>
              </div>
            </div>
            <br/>
            <div style="margin-bottom:30px;"><a @click="returnMain"> 返回</a></div>
            <br/>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <!--右上角学习进度单词量剩余天数-->
          <a-card title="" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div slot="extra">
              <a-row><a-col :span="1"></a-col><a-col :span="11" style="font-size: 15px;color:#002140;">您的计划</a-col></a-row>
              <hr STYLE="color: #e8e8e8;">
              <a-row class="more-info">
                <a-col :span="7">
                  <head-info title="今日单词" :content=todayWord :center="true" :bordered="false"/>
                </a-col>
                <a-col :span="8">
                  <head-info title="剩余天数" :content=remainDay :center="true" :bordered="false"/>
                </a-col>
                <a-col :span="8">
                  <head-info title="学习进度" :content=studyProcess :center="true"/>
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
          <!--右下角复习单词生词框-->
          <a-card title="" style="margin-bottom: 24px;padding:12px;" :bordered="false" :body-style="{ padding: 0 }">
            <a-row><a-col :span="1"></a-col><a-col :span="11" style="font-size: 15px;color:#002140;">开始学习</a-col></a-row>
            <hr STYLE="color: #e8e8e8;">
            <a-row>
              <a-col>
                <div style="min-height: 55px;margin-left: 80px;margin-top:30px;">
                <a-button size="small" type="primary" slot="extra" style="margin-right: 20px;" @click="goRecite">背诵单词
                </a-button>
                <a-button size="small" type="primary" slot="extra" @click="goReview">复习生词</a-button>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <div style="padding-left:20px;padding-right: 20px;color:#002140;font-family: 'Microsoft Sans Serif';">To be both a speaker of words and a doer of deeds.</div>
              </a-col>
            </a-row>
            <br>
            <a-row>
              <a-col>
                <div style="margin-left: 80px;">——既做演说家，又做实干家。</div>
              </a-col>
            </a-row>
            <br>
            <br>
          </a-card>
        </a-col>
      </a-row>
      <!--搜索框-->
      <div style="width: 400px;" class="searchDiv" v-if="setPlanState === false && watchWord === false">
        <a-input-search placeholder="搜索单词" @change="searchWord(wordsearch)" v-model="wordsearch">搜索</a-input-search>
        <br>
        <div v-if="word.length !== 0" style="max-height: 200px; overflow:scroll;background-color:white;overflow-x:hidden;">
          <a-row v-for="item in word" :key="item.id">
            <div @click="getWordDetail(item)" class="wordRowDiv">
              <a-col :span="1"></a-col>
              <a-col :span="6">{{item.englishWord}}</a-col>
              <a-col :span="16">{{ item.chineseWord }}</a-col>
              <a-col :span="1"></a-col>
            </div>
          </a-row>
        </div>
      </div>
    </div>
  </page-view>
</template>

<script>
  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'
  import Vue from 'vue'
  import AInputSearch from 'ant-design-vue/es/input/Search'


  export default {
    name: 'MakePlan',
    data() {
      return {
        avatar: '',
        user: {},
        // 是否设置计划
        setPlanState: false,
        // 查看单词
        watchWord:false,
        loading: true,
        // 今日单词量
        todayWord: '',
        // 剩余天数
        remainDay: '',
        // 学习进度
        studyProcess: '',
        // 四级单词每日背诵量
        fourNumber: null,
        // 六级单词每日背诵量
        sexNumber: null,
        // 考研单词每日背诵量
        kaoYanNumber: null,
        baseUrl: 'http://106.15.237.74:8888',
        // 搜索单词
        wordsearch:'',
        // 返回搜索数据列表
        word:[],
        // 详细单词数据
        wordinfo:{}
      }
    },
    mounted() {
      this.getStatitics()
      this.loading = false
    },
    created(){
      this.getStatitics()
      this.loading = false
    },
    components: {
      AInputSearch,
      ACol,
      ARow,
      PageView,
      HeadInfo
    },
    methods: {
      //拿到学习进度 每日单词量 剩余天数
      getStatitics() {
        this.$http.get(this.baseUrl + '/plan/getStatiticsById')
          .then(res => {
            this.todayWord = res.data[0] + ''
            this.remainDay = res.data[1] + ''//没有背的单词需要时间 data[2]所有单词需要时间
            this.studyProcess = (res.data[2] - res.data[1]) * res.data[0] + '/' + res.data[2] * res.data[0]
            if(res.data[2] < res.data[1]){
              this.getStatitics()
            }

            console.log(res)
          })
      },
      setPlan() {
        // 显示计划框
        this.setPlanState = true
      },
      // 提交计划
      Submit(type, number) {
        this.setPlanState = false
        var tt=/^[1-9]\d*$/
        if(!tt.test(number)){
          this.$message.error(
            '计划设置不合理，请输入正整数！'
          )
          return
        }
        this.$message.info("设置计划需要一点时间，请等待~")

        this.$http.post(this.baseUrl + '/plan/updateDailyWordInPlan/' + number + '/' + type)
          .then(res => {
            console.log(res)
            this.$message.success(
              '计划设置成功'
            )
            this.getStatitics()
          }, setTimeout(() => {
            this.$message.info("我正在拼命设置计划，您可以去小站其他地方学习~")
            this.getStatitics()
            this.$message.info("您可以刷新一下哦~")
          }, 10000))
      },
      // 去背诵单词页
      goRecite() {
        this.$router.push({
            path: '/words/recite_words'
          }
        )
      },
      // 去复习生词页
      goReview() {
        this.$router.push({
            path: '/words/review_new_words'
          }
        )
      },
      // 搜索单词
      searchWord(wordsearch){
        if(wordsearch === ''){
          this.word = []
          return
        }
        this.$http.get(this.baseUrl + '/word/getMeanByWord/' + wordsearch)
          .then(res => {
            console.log(res)
            this.word = res.data
          })
      },
      // 拿到单词详细数据
      getWordDetail(item){
        this.setPlanState = false
        this.watchWord = true
        this.wordinfo = item
      },
      // 返回主界面
      returnMain(){
        this.watchWord = false
        this.setPlanState = false
      },
      // audio的play事件
      play() {
        this.$refs.audio.play()
      }
    }
  }
</script>

<style lang="less" scoped>
  .numberDiv {
    display: flex;
    justify-content: flex-start;
    padding: 40px;
    .fourDiv {
      padding: 20px;
      width: 200px;
      height: 200px;
      background: #e8e8e8;
      div {
        margin-bottom: 20px;
      }
    }
    .sexDiv {
      padding: 20px;
      width: 200px;
      height: 200px;
      background: #13c2c2;
      div {
        margin-bottom: 20px;
      }
    }
    .kaoYanDiv {
      padding: 20px;
      width: 200px;
      height: 200px;
      background: #909399;
      div {
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
  .searchDiv{
    position: absolute;
    top: 350px;
    left: 420px;
    outline:none;
  }
  .wordDiv{
    font-weight: bold;
    font-size: 30px;
    color: black;
  }
  .labaDiv{
    display: flex;
    justify-content: flex-start;
  }
  .meanP{
    color:#909399;
    font-size: 10px;
  }
  .exampleP{
    font-family: "Microsoft Sans Serif";
    font-size: 15px;
    color: black;
    /*font-weight: bold;*/
  }
  .wordRowDiv:hover{
    cursor: pointer;
    background-color:#1890ff;
  }
</style>
