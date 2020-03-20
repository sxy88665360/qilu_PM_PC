<template>
  <div class='project'>
    <header>
      <div class='searchCondition'>
        <div class='searchItemTwo department'>
          <!-- <span class='text'>立项部门</span> -->
          <div class='searchInput'>
            <treeselect v-model='value' :multiple='true' :options='options' placeholder='请输入立项部门' />
          </div>
        </div>
        <div class='searchItem' style='margin-left:240px'>
          <!-- <span class='text'>项目编号</span> -->
          <div class='searchInput'>
            <el-input v-model='searchCondition.number' size='small' placeholder='请输入项目编号'></el-input>
          </div>
        </div>
        <div class='searchItem'>
          <!-- <span class='text'>项目名称</span> -->
          <div class='searchInput'>
            <el-input v-model='searchCondition.name' size='small' placeholder='请输入项目名称'></el-input>
          </div>
        </div>
        <div class='searchItem'>
          <!-- <span class='text'>项目时间</span> -->
          <div class='searchInput'>
            <el-date-picker
              v-model='searchCondition.time'
              size='small'
              unlink-panels
              type='daterange'
              range-separator='至'
              start-placeholder='开始日期'
              end-placeholder='结束日期'
            ></el-date-picker>
          </div>
        </div>
        <div class='searchItemTwo'>
          <!-- <span class='text'>项目经理</span> -->
          <div class='searchInput'>
            <el-input v-model='searchCondition.proposer' size='small' placeholder='请输入项目经理'></el-input>
          </div>
        </div>
        <div class='searchItem'>
          <!-- <span class='text'>立项部门</span> -->
          <div class='searchInput'>
            <!-- <el-input v-model='searchCondition.projectStatus'  size='small' placeholder='项目状态' ></el-input> -->
            <el-select v-model='projectStatus' placeholder='项目状态' size='small'>
              <el-option
                v-for='item in projectStatus'
                :key='item.value'
                :label='item.label'
                :value='item.value'
              ></el-option>
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
        <el-table-column prop='number' label='项目编号' ></el-table-column>
        <el-table-column prop='category' label='项目类别' ></el-table-column>
        <el-table-column prop='name' label='项目名称' ></el-table-column>
        <!-- <el-table-column prop='target' label='项目目标' width='120'></el-table-column> -->
        <el-table-column prop='deadline' label='完成期限' ></el-table-column>
        <!-- <el-table-column prop='expectedReturn' label='预期收益' width='120'></el-table-column> -->
        <el-table-column prop='manager' label='项目经理' ></el-table-column>
        <!-- <el-table-column prop='corePersonnel' label='核心成员' width='120'></el-table-column>
        <el-table-column prop='keyPersonnel' label='主要成员' width='120'></el-table-column> -->
        <!-- <el-table-column prop='progress' label='项目进度' width='120'></el-table-column> -->
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
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as Urls from '@/components/url'
export default {
  components: { Treeselect },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dataUrl: Urls.dataUrl,
      value: null,
      searchCondition: {
        number: '', // 项目编号
        name: '', // 项目名称
        time: '', // 立项时间
        department: '', // 立项部门
        proposer: '', // 申请人
        projectStatus: null // 项目状态
      },
      projectStatus: [
        {
          value: '1',
          label: '进行中项目'
        },
        {
          value: '2',
          label: '暂停项目'
        },
        {
          value: '3',
          label: '异常项目'
        },
        {
          value: '4',
          label: '全部项目'
        }
      ],
      options: [
        {
          id: 'a',
          label: '生产系统',
          children: [
            {
              id: 'aa',
              label: '101车间'
            },
            {
              id: 'ab',
              label: '102车间'
            }
          ]
        },
        {
          id: 'b',
          label: 'b'
        },
        {
          id: 'c',
          label: 'c'
        }
      ],
      tableData: null
    }
  },
  mounted: function () {
    this.searchList()
  },
  methods: {
    handleClick (itemId) {
      // console.log(itemId,'itemId');
      this.$router.push({
        path: '/projectApplication',
        query: { itemId: itemId }
      })
    },
    searchList () {
      var data = this.searchCondition
      // data.array.forEach(element => {
      //     // if(element)
      // });
      var that = this
      this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      this.axios
        .post(
          this.dataUrl +
            `/projectApi/findAll?pageSize=${this.pageSize}&&pageNun=${this.currentPage}`,
          data
        )
        .then((response) => {
          // console.log(response.data.data);
          if (response.data.code === 1) {
            var data = response.data.data
            // data.forEach((item, index) => {
            //     item.index = index + 1;
            // });
            console.log(data, 'data')
            that.tableData = data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetList () {
      this.searchCondition = {
        number: '', // 项目编号
        projectName: '', // 项目名称
        time: '', // 立项时间
        department: '', // 立项部门
        proposer: '' // 申请人
      }
    },
    projectSchedule () {

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
