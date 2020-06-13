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
    <!-- 弹窗 -->
    <div class="mask" v-if="isAddprogress">
      <div class="boom">
        <div class="top">
          <span class="delete">{{"项目简报"}}</span><a href="javascript:;" class="close"><span @click="resetForm"></span></a>
        </div>
        <div class="inner">
          <el-form :model="proForm" :rules="proRules" ref="proData" label-width="120px" class="demo-ruleForm">
            <div class="orderName orderModityPublic">
              <el-form-item label="分项名称" prop="name">
                <div class="orderInput">
                  <el-input type="text" v-model="proForm.name" auto-complete="off" @change="groupNameChange"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="责任人" prop="principal">
                <div class="orderInput">
                  <el-input type="text" v-model="proForm.principal" auto-complete="off" @change="groupNameChange">
                  </el-input>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="计划开始时间" prop="startTime">
                <div class="orderInput">
                  <el-date-picker v-model="proForm.startTime" type="date" placeholder="选择日期" value-format="timestamp" @change="calculationDelay">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
             <div class="orderName orderModityPublic">
              <el-form-item label="计划结束时间" prop="endTime">
                <div class="orderInput">
                  <el-date-picker v-model="proForm.endTime" type="date" placeholder="选择日期" value-format="timestamp" @change="calculationDelay">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="是否开始" prop="isStart">
                <div class="orderInput">
                  <el-select v-model="proForm.isStart" placeholder="分项是否开始" @change="calculationDelay">
                    <el-option label="是" value= "1"></el-option>
                    <el-option label="否" value= "2"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic" v-if="proForm.isStart=='1'">
              <el-form-item label="实际开始时间" prop="realStartTime">
                <div class="orderInput">
                  <el-date-picker v-model="proForm.realStartTime" type="date" placeholder="选择日期" value-format="timestamp" @change="calculationDelay">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic" v-if="proForm.isStart=='1'">
              <el-form-item label="是否完成" prop="isEnd">
                <div class="orderInput">
                  <el-select v-model="proForm.isEnd" placeholder="请选择是否完成" @change="calculationDelay">
                    <el-option label="是" value= "1"></el-option>
                    <el-option label="否" value= "2"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            
             <div class="orderName orderModityPublic" v-if="proForm.isEnd=='1'">
              <el-form-item label="实际结束时间" prop="realEndTime">
                <div class="orderInput">
                  <el-date-picker v-model="proForm.realEndTime" type="date" placeholder="选择日期" value-format="timestamp" @change="calculationDelay">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>

            <div class="orderName orderModityPublic" v-if="isDelay" >
              <el-form-item label="延期原因" prop="unDoneReason">
                <div class="orderInput">
                  <el-input type="textarea" v-model="proForm.unDoneReason" rows="1"></el-input>
                </div>
              </el-form-item>
            </div>
             <div class="orderName orderModityPublic" v-if="proForm.isEnd ==='2'&&proForm.isStart=='1'">
              <el-form-item label="事项进展" prop="process">
                <div class="orderInput">
                  <el-input type="textarea" v-model="proForm.process" rows="1"></el-input>
                </div>
              </el-form-item>
            </div>
            <!-- <div class="orderName orderModityPublic" v-if="proForm.isEnd ==='2'&& proForm.isStart=='1'"> -->
            <div class="innerBottom">
              <!-- <el-form-item  prop="loginNameChoose">
                      <el-transfer
                          class="transfer"
                          @change="transferChange"
                          filterable
                          filter-placeholder="请输入"
                          v-model="form.loginNameChoose"
                          :titles="['选择成员', '已选择']"
                          :data="loginNameArr">
                      </el-transfer>
                  </el-form-item> -->
            </div>
          </el-form>
          <div class="input orderModityPublicBtn">
            <el-button type="primary" @click="submitForm(proForm)" class="chooseTrue">确认</el-button>
            <el-button @click="resetForm">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      projectForm:null,
      progressList:[],
      editList:null,
      proForm:null,
      isAddprogress:null,
    }
  },
  mounted(){
    let itemData = JSON.parse(sessionStorage.getItem('itemData'));
    if (itemData.subPro === "2") {
        this.isView = true
         this.progressList  = itemData.progress;
        console.log(this.projectForm,'处于编辑状态');
      }
  },
  methods: {
    searchList(){

    },
    resetList(){
      this.$router.back();
    },
    editProgress (value) {
        this.editList = true;
        this.proForm = value;
        this.isAddprogress = !this.isAddprogress;
    },
    delProgress(index) {
      console.log(index,"index")
      this.$confirm('删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      console.log(index,"index")
      // console.log(this.proForm,"index")
        this.projectForm.progress.splice(index, 1);
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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
    // 弹出层
  .mask {
    height: 100%;
    width: 100%;
    position: fixed;
    _position: absolute;
    top: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    filter: alpha(opacity=30);
    .boom {
      position: fixed;
      // margin-top:-360px;
      margin-left: -260px;
      // transform: translateX(-50%);
      transform: translateY(-50%);
      width: 674px;
      left: 50%;
      top: 50%;
      background-color: #ffffff;
      border: 1px solid #999999;
      font-size: 14px;
      color: #999999;
      border-radius: 5px;
      .inner {
        & .innerBottom {
          // height: 270px;
          position: relative;
          & .errorMsg {
            position: absolute;
            bottom: 10px;
            left: 200px;
            color: #ff4949;
            font-size: 12px;
          }
          & .transfer {
            width: 700px;
            overflow: hidden;
            margin: 20px auto;
            padding-left: -100px;
            position: relative;
            & .el-transfer-panel__body {
              & .el-checkbox-group {
                height: 150px;
                overflow: auto;
              }
            }
            & .el-transfer-panel__footer {
              border-top: 1px solid #CCCCCC;
            }
            & .el-transfer-panel {
              width: 200px;
              float: left;
              margin-left: 74px;
              border: 1px solid #CCCCCC;
              border-radius: 5px;
              height: 200px;
              padding: 10px;
              & .el-transfer-panel__header {
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
              & .el-transfer-panel__body {
                & .el-input {
                  padding: 10px 10px;
                  width: 180px;
                  // border-top: 1px solid #CCCCCC;
                  //border-bottom: 1px solid #CCCCCC;
                  position: relative;
                  & .el-input__icon {
                    position: absolute;
                    right: 10px;
                  }
                }
                & .el-transfer-panel__list {
                  height: 98px;
                  & .el-checkbox {
                    margin-left: 0;
                    //width: 100px;
                    display: block !important;
                    // padding: 6px 0 3px 10px;
                    border-top: 1px solid #CCCCCC;
                    height: 35px;
                    line-height: 35px;
                  }
                }
              }
            }

            & .el-transfer__buttons {

              position: absolute;
              left: 295px;
              top: 120px;
            }
          }
        }
      }

      & .top {
        height: 40px;
        background: #ebf8f7;
        line-height: 40px;
        color: #000;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #CCCCCC;

        & .delete {
          padding-left: 22px;
          vertical-align: middle;
          color: #999;
          font-weight: bold;
        }

        & .close {
          vertical-align: middle;
          font-size: 25px;
          padding-left: 580px;
          text-decoration: none;
          color: #999;
        }
      }

      & .addOrderTypeTop {
        position: absolute;
        height: 200px;
        width: 120px;
        left: 140px;
        z-index: 10;
      }

      & .orderModityPublic {
        margin-top: 5px;
        padding-left: 22px;
        height: 48px;
        //line-height: 50px;
        //background: #ffffff;
        border-bottom: 1px solid #CCCCCC;

        & .orderInput {
          width: 220px;
          display: inline-block;
          margin-left: 20px
        }

        & .orderInputText {
          width: 270px;
          display: block;
          margin-left: 120px;
          font-size: 12px;
        }

        & .namePublic {
          display: inline-block;
          width: 90px;
          text-align: right;
        }
      }

      & .orderModityPublicBtn {
        border-top: 1px solid #ccc;
        padding-top: 10px;

        & .chooseTrue {
          margin: 0 64px 10px 230px;
        }
      }
    }

  }
}

</style>
