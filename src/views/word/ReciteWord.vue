<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
    </div>

    <a-card>
      <div>
        <div class="wordDiv" >{{ wordinfo.englishWord }}
        </div>
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

      <br>
      <div class="buttonGroup">
        <a-button type="primary" class="a-button"  @click="nextWord">认识</a-button>
        <a-button type="default"  class="a-button" @click="nextWord">下一个</a-button>
        <a-button type="danger"  class="a-button" @click="saveNewWord">陌生</a-button>
      </div>
    </a-card>
<br/>
    <a-card  v-if="len !== 0">
      <a-row>
        <a-col :span="24">
          <div style="color: #002140;font-size: 15px;"><img src="https://s1.ax1x.com/2020/06/10/tolXXd.png" alt="" style="padding-right: 15px;"/>今日单词</div>
          <hr><br/>
          <div v-for="item in wordList" :key="item.id" @click="getWordDetail(item)" class="wordListDiv">
            <a-row class="wordRow">
              <a-col :span="5">
                <div class="wordDivRight">{{ item.englishWord }}</div>
              </a-col>
              <a-col :span="15"><p style="color: black" class="wordRightMean">{{ item.chineseWord }}</p></a-col>
            </a-row>
            <br>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </page-view>
</template>

<script>
  import { timeFix, isSuccess } from '@/utils/util'
  import { mapState } from 'vuex'
  import { PageView } from '@/layouts'
  import HeadInfo from '@/components/tools/HeadInfo'
  import { queryWordList } from '@/api/wordApi'

  export default {
    data(){
      return {
        avatar:'',
        wordinfo:{
          // 单词拼写
          englishWord:'Project',
          // 单词含义
          chineseWord:'vi.项目够不够昵称',
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
        baseUrl : 'http://106.15.237.74:8888',
        // 单词列表
        wordList:[],
        // 单词数量
        len:0,
        index: 0
      }
    },
    components: {
      PageView,
      HeadInfo
    },
    created() {
      this.getWord()
    },
    methods: {
      // 获取单词数据
      getWord() {
        this.$http.get(this.baseUrl+"/plan/queryDailyWord")
          .then( res => {
            console.log(res)
            this.wordList = res.data;
            this.len = res.data.length;
            this.wordinfo = this.wordList[this.index];
        })
      },
      //下一个单词，如果用户背到计划的最后一个单词，提示用户完成计划！将数据库今日的数据变成复习数据
      //,若完成，获取新的一组数据学习
      nextWord(){
        if(this.index === this.len - 1){
          this.$http.post(this.baseUrl + "/plan/updateDailyWordState")
            .then(res => {
                console.log(res)
              this.$message.success(
                '很棒，计划已完成！您可以继续学习~'
              )
              // 重置索引
              this.index =  0
              // 取得数据
              this.getWord()
            })
        }else{
          this.index = this.index + 1;
          this.wordinfo = this.wordList[this.index];
        }
      },
      // 添加新词
      saveNewWord(){
        const word_id = this.wordinfo.id;
        this.$http.post(this.baseUrl + "/word/saveWord/"+word_id)
          .then(res => {
              console.log(res)
            this.$message.success(
              '已加入生词表 √'
            )
          })
      },
      // audio的play事件
      play() {
        this.$refs.audio.play()
      },
      getWordDetail(item){
        this.wordinfo = item
      }
    }
  }
</script>

<style lang="less" scoped>
  .a-button{
    margin-right: 30px;
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
    color:black;
    font-size: 10px;
  }
  .exampleP{
    font-family: "Microsoft Sans Serif";
    font-size: 15px;
    color: black;
    /*font-weight: bold;*/
  }
  .myaudio {
    width: 800px;
    height: 40px;
    margin-top: 5px;
    outline: none;
    background-color: #f1f3f4;
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
