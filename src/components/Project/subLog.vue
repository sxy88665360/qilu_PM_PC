<template>
  <div class="subLog">
    <div class='mask'>
      <div class="boom">
        <div class="header">
          <div class="title">
            <i class="text">日志记录</i>
            <i class="el-icon-circle-close closeBtn" @click="closeMask"></i>
          </div>
        </div>
        <div class="content">
             <div class="block">
              <el-timeline :reverse='true'>
                <el-timeline-item :timestamp="formatterTime(data.subTime)" v-for="(data, index) in dataList" placement="top" :key="index" >
                  <el-card>
                    <h4>{{data.subPro}}</h4>
                    <!-- <p>王小虎 提交于{{formatterTime(data.subTime)}}</p> -->
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
    data() {
      return {
        dataList:[
          {
            subTime:1122222220,
            subPro:"新增"
          },
          {
            subTime:1222222221,
            subPro:"新增2"
          },
          {
            subTime:1322222222,
            subPro:"新增3"
          },
          {
            subTime:1422222223,
            subPro:"新增4"
          },
          {
            subTime:1522222224,
            subPro:"新增2"
          },
          {
            subTime:1622222225,
            subPro:"新增2"
          },
          {
            subTime:1722222226,
            subPro:"新增2"
          },
          {
            subTime:1822222227,
            subPro:"新增2"
          }
        ]
      }
    },
    mounted(){
      console.log()
     this.dataList = this.$route.query.dataList;
    },
    methods:{
      formatterTime(time) {
        return moment(time).format('YYYY-MM-DD');
      },
      closeMask(){
        this.$router.back()
      }
    }
}
</script>
<style lang="scss">
.subLog{
  .mask{
    min-height: 100vh; width: 100vw; position: fixed; _position:fixed;z-index: 1000;
    background-color: rgba(0,0,0,0.5);  filter: alpha(opacity = 30);
    top: 0; left: 0; bottom: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    & .boom{
      width: 100%;
          height: calc(100% - 200px);
          margin: 80px 300px 80px 300px;
          border:1px solid #ccc;
          border-radius: 4px;
          // background-color: #e7ebee;
          background-color: #ffffff;
          position: relative;
    }
  }
  .header{
   
    .title{
     // position: relative;
      height: 40px;
      background-color: #999;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      .text{
        display: inline-block;

      }
      .closeBtn{
      // position: fixed;
      float: right;
      margin: 10px 20px;
      // margin-left: 500px;
    }
    }
   
  }
  .content{
    height: calc(100% - 100px);
    margin: 30px;
    overflow: auto;
  }
}
</style>