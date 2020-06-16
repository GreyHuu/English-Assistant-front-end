<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
    </div>

    <a-card v-if="len === 0" style="text-align: center;min-height: 500px;">
      这里空空如也，快去记单词吧~
    </a-card>
    <a-card v-else>
      <a-row :space="2">
        <a-col :span="24"  class="wordLeftCol">
          <div>
            <div class="wordDiv">{{ wordinfo.englishWord }}</div>
            <br/>
            <div class="labaDiv">
              <div style="padding-right: 40px;color: black">/{{ wordinfo.pa }}/</div>
              <img src="https://s1.ax1x.com/2020/06/05/trULSP.png" alt="" style="width: 25px;height: 25px;" @click="play"/>
              <audio ref='audio' :src="wordinfo.pron" style="display: none"></audio>
            </div>

            <br/>
            <p style="color: black">{{ wordinfo.chineseWord }}</p>
          </div>
          <br/>
          <div>
            <div>
              <div style="font-size: 15px;color:#002140;">例句1</div>
              <br/>
              <p class="exampleP">
                {{ wordinfo.englishInstance1 }}
              </p>
              <p class="meanP">
                {{ wordinfo.chineseInstance1 }}
              </p>
            </div>
            <br>
            <div>
              <div style="font-size: 15px;color:#002140;">例句2</div>
              <br/>
              <p class="exampleP">
                {{ wordinfo.englishInstance2 }}
              </p>
              <p class="meanP">
                {{ wordinfo.chineseInstance2 }}
              </p>
            </div>
          </div>
          <br>
          <div class="buttonGroup">
            <a-button type="primary" class="a-button" @click="removeWord(wordinfo.id)">认识</a-button>
            <a-button type="default" class="a-button" @click="newWord">下一个</a-button>
            <a-button type="danger" class="a-button" @click="newWord">陌生</a-button>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <br/>
    <a-card  v-if="len !== 0">
      <a-row>
        <a-col :span="24">
          <div style="color: #002140;font-size: 15px;"><img src="https://s1.ax1x.com/2020/06/10/tolXXd.png" alt="" style="padding-right: 15px;"/>全部生词</div>
          <hr><br/>
          <div v-for="item in newWordList" :key="item.id" @click="getNewWordDetail(item)" class="wordListDiv">
            <a-row class="wordRow">
              <a-col :span="5">
                <div class="wordDivRight">{{ item.englishWord }}</div>
              </a-col>
              <a-col :span="15"><p style="color: black" class="wordRightMean">{{ item.chineseWord }}</p></a-col>
              <a-col :span="2"><a-button type="primary" @click="removeWord(item.id)">认识</a-button></a-col>
            </a-row>
            <br>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </page-view>
</template>

<script>
  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'

  export default {
    data(){
      return {
        wordinfo:{
          id:0,
          // 单词拼写
          englishWord:'Project',
          // 单词含义
          chineseWord:[],
          // 单词发音
          pa:'ˌweərˈæz',
          // 单词发音URL
          pron:'',
          // 单词例子1英语
          englishInstance1:'The engineers are discussing the construction constructs.',
          // 单词例子1中文
          chineseInstance1:'工程师正在讨论这个建筑问题。',
          // 单词例子2英语
          englishInstance2:'The engineers are discussing the construction constructs.',
          // 单词例子2中文
          chineseInstance2:'工程师正在讨论这个建筑问题。'
        },
        // 生词
        newWordList:[],
        baseUrl : 'http://106.15.237.74:8888',
        avatar:'',
        index:0,
        len:0
      }
    },
    components: {
      ACol,
      ARow,
      PageView,
      HeadInfo
    },
    created(){
      this.getNewWordList()
    },
    mounted(){
      this.getNewWordList()
    },
    methods: {
      // 拿到生词
      getNewWordList(){
        this.$http.get(this.baseUrl + "/word/queryNewWord")
          .then( res => {
            console.log(res)
            this.newWordList = res.data
            this.len = res.data.length
            this.wordinfo = this.newWordList[this.index]
          })
      },
      removeWord(word_id){
        this.$http.post(this.baseUrl + "/word/deleteWord/" + word_id)
          .then(res => {
            console.log(res)
            this.getNewWordList()
          })
      },
      newWord(){
        if(this.index === this.len - 1){
          this.$http.put(this.baseUrl + "/plan/updateDailyWordState")
            .then(res => {
              console.log(res)
              this.$message.info(
                '已经是最后一个单词了~'
              )
            })
        }else{
          this.index = this.index + 1;
          this.wordinfo = this.newWordList[this.index];
        }
      },
      // audio的play事件
      play() {
        this.$refs.audio.play()
      },
      getNewWordDetail(item){
        this.wordinfo = item
      }
    }
  }
</script>

<style lang="less" scoped>
  .a-button {
    margin-right: 30px;
  }

  .wordDiv {
    font-weight: bold;
    font-size: 30px;
    color: black;
  }

  .labaDiv {
    display: flex;
    justify-content: flex-start;
  }

  .meanP {
    color: black;
    font-size: 10px;
  }

  .exampleP {
    font-family: "Microsoft Sans Serif";
    font-size: 15px;
    color: black;
    /*font-weight: bold;*/
  }
  .wordDivRight{
    font-size: 18px;
    font-family: "Times New Roman";
    color: #000;
  }
  .wordRightMean{
    font-size: 15px;
    font-family: "Adobe 楷体 Std R";
  }
  .wordListDiv:hover{
    font-weight: bold;
    cursor:pointer;
  }

</style>
