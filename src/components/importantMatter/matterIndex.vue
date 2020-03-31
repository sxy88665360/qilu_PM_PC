<template>
  <div class="matterIndex">
    <header>
      <!-- <p>督办事项</p> -->
      <div class="searchCondition">
        <div class="searchItem">
           <!-- <span class="text">事項名稱</span> -->
          <div class="searchInput">
            <el-input v-model="searchCondition.name"  placeholder="事项名称"></el-input>
          </div>
        </div>
        <div class="searchItem">
           <!-- <span class="text">责任人</span> -->
          <div class="searchInput">
            <el-input v-model="searchCondition.principal"  placeholder="责任人"></el-input>
          </div>
        </div>
        <div class="searchItem">
           <!-- <span class="text">责任人</span> -->
          <div class="searchInput">
            <el-select v-model="statusValue" placeholder="进行状态选择">
              <el-option v-for="item in statusItem" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchBtn">
          <el-button type="primary" class="Btn"  @click="searchList">搜索</el-button>
        </div>
        <div class="searchBtn">
          <el-button type="text" class="Btn_2" @click="resetList">重置</el-button>
        </div>
        <div class="clear"></div>
      </div>
    </header>
    <div class="tableList">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="description" label="事项描述" ></el-table-column>
        <el-table-column prop="real_progress" label="实时进度" ></el-table-column>
        <el-table-column prop="plan_progress" label="计划进度" ></el-table-column>
        <el-table-column prop="plan_time" label="计划时间" ></el-table-column>
        <el-table-column prop="real_time" label="完成时间" ></el-table-column>
        <el-table-column prop="category" label="责任人"  width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <!-- <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="projectSchedule(scope.row)" type="text" size="small">提交进度</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
    <div class="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:{},
      searchCondition:{ // 搜索列表
        name: '',
        principal: ''
      },
      statusItem: [{  // 事项状态
          value: 1,
          label: '正在进行'
        }, {
          value: 2,
          label: '已完结'
        }],
      statusValue: '', // 状态值
    }
  },
  methods: {
    searchList () {  // 搜索列表

    },
    resetList () {  // 重置列表

    }
  }
};
</script>
<style lang="scss" scoped>
.matterIndex {
  header {
    width: 100%;
    height: 65px;
    background-color: #ebf8f7;
    box-shadow: 0 0 5px #888888;
    p {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      line-height: 50px;
      margin-left: 20px;
    }
    .searchCondition {
      position: absolute;
      z-index: 10000;
      background-color: #ebf8f7;
      .searchItem {
        float: left;
        margin: 10px 20px 10px 10px;
        .text {
          font-size: 14px;
          color: #999;
        }
        .searchInput {
          // max-width: 140px;
          display: inline-block;
        }
      }
    }
    .searchBtn {
      // position: absolute;
      margin: 10px 25px 0 25px;
      float: right;
      .Btn {
      min-width: 100px;
      max-width: 150px;
      right: 50px;
      }
      .Btn_2 {
        width: 50px;
        right: 150px;
      }
    }
  }
  .tableList {
    margin: 10px 20px;
  }
}
</style>