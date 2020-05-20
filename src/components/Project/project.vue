<template>
  <div class='project'>
    <header>
      <div class='searchCondition'>
        <div class='searchItemTwo department'>
          <!-- <span class='text'>立项部门</span> -->
          <div class='searchInput'>
            <treeselect v-model='department' :multiple='true' :options='options' placeholder='请输入立项部门'/>
          </div>
        </div>
        <div class='searchItem' style='margin-left:240px'>
          <div class='searchInput'>
            <el-input v-model='searchCondition.number' size='small' placeholder='请输入项目编号'></el-input>
          </div>
        </div>
        <div class='searchItem'>
          <div class='searchInput'>
            <el-input v-model='searchCondition.name' size='small' placeholder='请输入项目名称'></el-input>
          </div>
        </div>
        <div class='searchItem'>
          <div class='searchInput'>
            <el-date-picker v-model='searchCondition.time' size='small' unlink-panels type='daterange'
              range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' value-format='timestamp'></el-date-picker>
          </div>
        </div>
        <div class='searchItemTwo'>
          <!-- <span class='text'>项目经理</span> -->
          <div class='searchInput'>
            <el-input v-model='searchCondition.manager' size='small' placeholder='请输入项目经理'></el-input>
          </div>
        </div>
        <div class='searchItem'>
          <div class='searchInput'>
            <!-- <el-input v-model='searchCondition.projectStatus'  size='small' placeholder='项目状态' ></el-input> -->
            <el-select v-model='searchCondition.projectStatus' placeholder='项目状态' size='small' clearable>
              <el-option v-for='item in projectStatus' :key='item.value' :label='item.label' :value='item.value'>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class='searchBtn'>
          <el-button type='primary' class='Btn' size='small' @click='searchList'>搜索</el-button>
        </div>
        <div class='searchBtn'>
          <el-button type='text' class='Btn_2' @click='resetList'>重置</el-button>
        </div>
        <div class='clear'></div>
      </div>
    </header>
    <div class='tableList'>
      <el-table :data='tableData' height="450" border style='width: 100%'>
        <el-table-column fixed type='index' label='序号' align='center' width='50'></el-table-column>
        <el-table-column prop='number' label='项目编号'></el-table-column>
        <el-table-column prop='category' label='项目类别'></el-table-column>
        <el-table-column prop='name' label='项目名称'></el-table-column>
        <el-table-column prop='projectStatus' label='项目状态' width='120' :formatter="formatterStatus"></el-table-column>
        <el-table-column prop='planTime' label='完成期限' :formatter="formatterEndTime"></el-table-column>
        <!-- <el-table-column prop='expectedReturn' label='预期收益' width='120'></el-table-column> -->
        <el-table-column prop='manager' label='项目经理'></el-table-column>
        <!-- <el-table-column prop='corePersonnel' label='核心成员' width='120'></el-table-column>
        <el-table-column prop='keyPersonnel' label='主要成员' width='120'></el-table-column> -->
        <!-- <el-table-column prop='progress' label='项目进度' width='120'></el-table-column> -->
        <el-table-column prop='subTime' label='提交时间' :formatter="formatterSubTime"></el-table-column>
        <el-table-column fixed='right' label='操作' width='200'>
          <template slot-scope='scope'>
            <el-button @click='handleClick(scope.row)' type='text' size='small'>查看/编辑</el-button>
            <el-button @click='projectSchedule(scope.row)' type='text' size='small'>提交进度</el-button>
            <!-- <el-button type='text' size='small'>编辑(暂无)</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  // import the component
  import moment from 'moment'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import * as Urls from '@/components/url'
  export default {
    components: {
      Treeselect
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dataUrl: Urls.dataUrl,
        department: null,
        searchCondition: {
          number: '', // 项目编号
          name: '', // 项目名称
          time: null, // 立项时间
          department: '', // 立项部门
          manager: '', // 项目经理
          projectStatus: null// 项目状态
        },
        projectStatus: [{
            value: '1',
            label: '已完成项目'
          },{
            value: '2',
            label: '已奖励项目'
          },{
            value: '3',
            label: '正在进行'
          },
          {
            value: '4',
            label: '异常项目'
          },
          {
            value: '5',
            label: '暂停项目'
          },{
             value: '6',
            label: '失败项目'
          },
          
        ],
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
            label: '设备部',
            children: [{
                id: '2_1',
                parentId: 2,
                label: '设备处'
              },
              {
                id: '2_2',
                parentId: 2,
                label: '自控'
              }, {
                id: '2_3',
                parentId: 2,
                label: '计量'
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
        tableData: null
      }
    },
    mounted: function () {
      this.searchList();
      localStorage.setItem("itemData",null);
    },
    methods: {
      formatterEndTime(row){
        let time = row.planTime
        if(time){
          return moment(time).format('YYYY-MM-DD');
        }
      },
      formatterSubTime(row){
        let time = row.subTime
        if(time){
          return moment(time).format('YYYY-MM-DD');
        }
      },
      formatterStatus(row){
        if (row.projectStatus == "1") return "已完成" 
        if (row.projectStatus == "2") return "已奖励" 
        if (row.projectStatus == "3") return "正在进行" 
        if (row.projectStatus == "4") return "异常项目" 
        if (row.projectStatus == "5") return "暂停项目" 
        if (row.projectStatus == "5") return "失败项目" 
      },
      handleClick(data) {
        this.$router.push({
          path: '/projectApplication',
        })
        data.subPro = "1";
        let subData = data
        //console.log(data, "data");
        console.log(JSON.parse(JSON.stringify(subData)), "JSON.parse(JSON.stringify(subData))");
        localStorage.setItem("itemData", JSON.stringify(subData));
      },
      searchList() {
        let data = this.searchCondition
        data.department = this.department
        console.log(data,"搜索条件");
        let that = this
        this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        this.axios
          .post(
            this.dataUrl +
            `/projectApi/findAll?pageSize=${this.pageSize}&&pageNun=${this.currentPage}`,
            data
          )
          .then((response) => {
            if (response.data.code === 1) {
              let data = response.data.data
              data.forEach((item,index) => {
                data[index].numberAuto = item.number.split('-').join('').slice(2);
              });
              // data.numberAuto = data.number.split('-').join('').slice(2);
              let compare = function (prop) {
                  return function (obj1, obj2) {
                      var val1 = obj1[prop];
                      var val2 = obj2[prop];
                      if (val1 < val2) {
                          return -1;
                      } else if (val1 > val2) {
                          return 1;
                      } else {
                          return 0;
                      }            
                  } 
              }
              data = data.sort(compare("numberAuto"));
              that.tableData = data;
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      resetList() {
        this.department = null;
        this.searchCondition = {
          number: '', // 项目编号
          projectName: '', // 项目名称
          time: '', // 立项时间
          department: '', // 立项部门
          manager: '' // 申请人
        }
      },
      projectSchedule(data) {
        data.subPro = "2";
        this.$router.push({
          path: '/projectApplication'
        })
        //console.log(data, "projectScheduleData");
        //console.log(JSON.parse(JSON.stringify(data)), "JSON.parse(JSON.stringify(data))");
        localStorage.setItem("itemData", JSON.stringify(data));

      }
    }
  }
</script>
<style lang='scss' scoped>
  .project {
    min-width: 1100px;

    header {
      width: 100%;
      height: 100px;
      background-color: #ebf8f7;
      box-shadow: 0 0 5px #888888;
      overflow: hidden;

      .searchCondition {
        position: absolute;
        z-index: 1000;
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

        .searchItemTwo {
          float: left;
          margin: 10px 20px 10px 10px;

          //position: relative;
          .searchInput {
            // margin-top: 20px;
            // max-width: 140px;
            display: block;
          }
        }

        .department {
          max-width: 200px;
          position: absolute;
          //top: 50px;
          font-size: 13px;
          z-index: 10000;
        }

        .searchBtn {
          // position: absolute;
          margin: 0 25px;
          float: right;
        }

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