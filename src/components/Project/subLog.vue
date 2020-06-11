<template>
  <div class="subLog">
    <div class='mask'>
      <div class="boom">
        <div class="header">
          <div class="title">
            日志记录
          </div>
        </div>
        <div class="content">
            <!-- <div class="listTD">
              <el-table :data="dataList" border style="width: 100%" :default-sort = "{prop: 'supTime'}">
                <el-table-column
                  prop="subTime"
                  align="center"
                  width="180"
                  :formatter="formatterTime"
                  label="提交时间">
                </el-table-column>
                <el-table-column
                  prop="subPro"
                  align="center"
                  :formatter="formatterTime"
                  label='事项进展'>
                </el-table-column>
               
              </el-table>
              
            </div> -->
             <div class="block">
              
              <el-timeline>
                <el-timeline-item timestamp="data.subTime" v-for="(data, index) in dataList" placement="top" >
                  <el-card>
                    <h4>{{data.subPro}}</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
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

export default {
    data() {
      return {
        dataList:[]
      }
    },
    mounted:{},
    methods(){

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
          height: calc(100% - 100px);
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
      height: 40px;
      background-color: #999;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
    }
  }
  .content{
    .listTD{
      margin: 10px 20px;
    }
  }
}
</style>