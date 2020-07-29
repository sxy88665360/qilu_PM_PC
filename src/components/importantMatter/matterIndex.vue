<template>
  <div class="matterIndex">
    <header>
      <!-- <p>督办事项</p> -->
      <div class="searchCondition">
        <div class="searchItem">
          <div class='searchInput'>
            <treeselect v-model='department' :multiple='true' :options='options' placeholder='请输入立项部门'/>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <el-select v-model="searchCondition.matterType" placeholder="督办类型" clearable @change="searchList">
              <el-option v-for="item in matterType" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <el-input v-model="searchCondition.name"  placeholder="事项名称"></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <el-input v-model="searchCondition.manager"  placeholder="责任人"></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <el-select v-model="searchCondition.projectStatus" placeholder="进行状态选择">
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
        <el-table-column prop="mattterType" label="督办类型" align="center" width="120" :formatter="formatterType"></el-table-column>
        <el-table-column prop="name" label="事项描述" ></el-table-column>
        <!-- <el-table-column prop="real_progress" label="实时进度" ></el-table-column> -->
        <!-- <el-table-column prop="plan_progress" label="计划进度" ></el-table-column> -->
        <el-table-column prop="projectStatus" label='事项状态'  :formatter="formatterStatus"></el-table-column>
        <el-table-column prop="planTime" label="计划完成时间"  :formatter="formatterPlanTime"></el-table-column>
        <el-table-column prop="real_time" label="完成时间" :formatter="formatterEndTime"></el-table-column>
        <el-table-column prop="manager" label="责任人"  width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="projectSchedule(scope.row)" type="text" size="small">提交进度</el-button>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content"></div>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as Urls from '@/components/url'
  import moment from 'moment'
export default {
  components: {
    Treeselect
  },
  data() {
    return {
      dataUrl: Urls.dataUrl,
      pageSize:10,
      currentPage:1,
      department: null,
      tableData:[],
      matterType:[
          {
            value: '1',
            label: '攻关课题'
          }, {
            value: '2',
            label: '会议督办'
          },{
             value: '3',
            label: '管理提升'
          },
          {
             value: '4',
            label: '一般督办'
          }
      ],
      searchCondition:{ // 搜索列表
         number: '', // 项目编号
         name: '', // 项目名称
         time: null, // 立项时间
         department: '', // 立项部门
         manager: '', // 项目经理
         projectStatus: '', // 项目状态
         eventType:'2'
      },
       statusItem: [{
            value: '1',
            label: '已完成'
          },{
            value: '3',
            label: '正在进行'
          }
        ],
      statusValue: '', // 状态值
     options: [{
            id: '1',
            label: '生产部',
            children: [{
                id: '1_1',
                parentId: '1',
                label: '101车间'
              },
              {
                id: '1_2',
                parentId: '1',
                label: '102车间'
              },
              {
                id: '1_3',
                parentId: '1',
                label: '104车间'
              },
              {
                id: '1_4',
                parentId: '1',
                label: '201车间'
              },
              {
                id: '1_5',
                parentId: '1',
                label: '401车间'
              },
              {
                id: '1_6',
                parentId: '1',
                label: '402车间'
              },
              {
                id: '1_7',
                parentId: '1',
                label: '仓库'
              },
            ]
          },
          {
            id: '2',
            parentId: 2,
            label: '设备动力部',
            children: [{
                id: '2_1',
                parentId: 2,
                label: '设备处'
              },
              {
                id: '2_2',
                parentId: 2,
                label: '自控仪表中心'
              }, {
                id: '2_3',
                parentId: 2,
                label: '计量中心'
              },{
                id: '2_4',
                parentId: 2,
                label: '技术服务中心'
              },{
                id: '2_5',
                parentId: 2,
                label: '动力车间'
              }
            ]
          },
          {
            id: '3',
            label: '质量系统',
            children: [{
                id: '3_1',
                parentId: '3',
                label: 'QA'
              },
              {
                id: '3_2',
                parentId: '3',
                label: 'QC'
              }
            ]
          }, 
          {
            id: '4',
            parentId: null,
            label: '技术部'
          },
          {
            id: '5',
            parentId: null,
            label: 'SHE'
          },
          {
            id: '6',
            parentId: null,
            label: '运管管理部'
          },{
            id: '7',
            parentId: null,
            label: '人力资源部'
          },{
            id: '8',
            parentId:null,
            label: '总经理办公室'
          }
        ],
    }
  },
  mounted() {
    sessionStorage.setItem("itemData",null);
    this.searchList();
  },
  methods: {
    formatterStatus (row) {
       let status = row.projectStatus
       if(status === '1') return '已完成'
       if(status === '3') return '正在进行'
    },
    projectSchedule(data) {
      data.subPro = "2"; // 提交进度
      this.$router.push({
        path: '/projectApplication'
      })
      //console.log(data, "projectScheduleData");
      //console.log(JSON.parse(JSON.stringify(data)), "JSON.parse(JSON.stringify(data))");
      sessionStorage.setItem("itemData", JSON.stringify(data));
    },
    handleClick(data) { // 查看事项
    let subData = data
      this.$router.push({
        path: '/projectApplication',
      })
      subData.subPro = "1";
      
      //console.log(data, "data");
      // console.log(JSON.parse(JSON.stringify(subData)), "JSON.parse(JSON.stringify(subData))");
      sessionStorage.setItem("itemData", JSON.stringify(subData));
    },
    formatterType(row) {
        // console.log(row.matterType,"matterType")
        if(row.matterType === "1") return "攻关课题"
        if(row.matterType === "2") return "会议督办"
        if(row.matterType === "3") return "管理提升"
        if(row.matterType === "4") return "一般督办"
    },
    formatterPlanTime(row){
        let time = row.planTime
        if(time){
          return moment(time).format('YYYY-MM-DD');
        }
      },
    formatterEndTime(row){
        let time = row.endTime 
        if(time){
          return moment(time).format('YYYY-MM-DD');
        }
      },
    searchList() {
      let searchData = this.searchCondition
      searchData.department = this.department
      // console.log(searchData,"搜索条件");
      let that = this
      this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      this.axios
      .post(
        this.dataUrl +
        `/projectApi/findAll?pageSize=${this.pageSize}&&pageNun=${this.currentPage}`, searchData)
      .then((response) => {
        if (response.data.code === 1) {
          // let data = 
          console.log(response.data,"response.data");
          that.tableData = response.data.data
          console.log(that.tableData);
          // data.forEach((item,index) => {
          //   data[index].numberAuto = item.number.split('-').join('').slice(2);
          // });
          // let compare = function (prop) {
          //     return function (obj1, obj2) {
          //         var val1 = obj1[prop];
          //         var val2 = obj2[prop];
          //         if (val1 < val2) {
          //             return -1;
          //         } else if (val1 > val2) {
          //             return 1;
          //         } else {
          //             return 0;
          //         }            
          //     } 
          // }
          // data = data.sort(compare("numberAuto"));
          // that.tableDataAuto = data;
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
    margin: 70px 20px 10px 20px;
    // margin: 10px 20px;
  }
}
</style>