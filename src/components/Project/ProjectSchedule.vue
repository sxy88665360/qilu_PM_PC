<template>
  <div class="projectSchedule">
    <header>
      <p>项目简报</p>
    </header>
    <div class="content">
      <div class="progress">
        <el-table :data='progressList' border style='width: 100%'>
          <el-table-column fixed type='index' label='序号' align='center' width='50'></el-table-column>
          <el-table-column prop='name' label='分项名称'></el-table-column>
          <el-table-column prop='principal' label='责任人'></el-table-column>
          <el-table-column prop='startTime' label='开始时间' :formatter="formatterStartTime"></el-table-column>
          <el-table-column prop='endTime' label='结束时间' :formatter="formatterEndTime"></el-table-column>
          <el-table-column prop='isEnd' label='是否完成' :formatter="formatterIsEnd"></el-table-column>
          <el-table-column prop='unDonePro' label='分项进展'></el-table-column>
          <el-table-column prop='unDoneReason' label='未完成原因'></el-table-column>
          <el-table-column fixed='right' label='操作' width='120'>
            <template slot-scope='scope'>
              <el-button type="primary" icon="el-icon-edit" circle @click='editProgress(scope.row)'></el-button>
              <el-button type="danger" icon="el-icon-delete" circle    @click='delProgress(scope.$index)'></el-button>
              <!-- <el-button  type='text' size='small'>修改</el-button>
              <el-button type='text' size='small'>删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="formList">
        <span class="text">项目进展：</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div> -->
      <div class="formList">
        <span class="text">下周工作计划：</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="nextPlan"></el-input>
      </div>
      <div class="formList">
        <span class="text">需要领导给与帮助：</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="needHelp"></el-input>
      </div>
      <div class="searchBtn">
        <el-button type="primary" size="medium" class="Btn_2" @click="searchList">提交</el-button>
      </div>
      <div class="searchBtn">
        <el-button class="Btn_2" size="medium" @click="resetList">返回</el-button>
      </div>
      <div class="marginBottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      progressList:[],

    }
  },
  methods: {
    searchList(){

    },
    resetList(){
      this.$router.back();
    },

  }
}
</script>
<style lang="scss" scoped>
.projectSchedule {
  header {
    width: 100%;
    height: 50px;
    background-color: #ebf8f7;
    box-shadow: 0 0 5px #888888;
    p {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      line-height: 50px;
      margin-left: 20px;
    }
  }
  .content {
    position: relative;
    margin: 20px;
    background-color: #fff;
    min-height: calc(100% - 92px);
    font-size: 14px;
    color: #999;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .title {
    padding: 10px 20px;
    font-size: 18px;
  }
  .formList {
    margin: 0 20px;
    padding: 10px 40px 10px 20px;
    border-bottom: 1px solid #ccc;
    .listStyle {
      width: 300px;
      margin-left: 20px;
      display: inline-block;
    }
    .text {
      display: inline-block;
      width: 100px;
    }
  }
  .searchBtn {
    float: left;
    margin: 10px 80px 0 100px;
  }
  .marginBottom {
    margin-bottom: 60px;
  }
}

</style>
