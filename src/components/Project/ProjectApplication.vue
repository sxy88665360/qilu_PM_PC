<template>
  <div class='projectApplication'>
    <div class="header">
      <div class="title">{{isView?'查看项目':'项目申请——新增'}}</div>
    </div>
    <div class='content'>
      <div class='formList'>
        <span class='text'>项目名称：</span>
        <el-input v-model='projectForm.name' class='listStyle' size='small' placeholder='请输入项目名称'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>项目编号：</span>
        <el-input v-model='projectForm.number' class='listStyle' size='small' placeholder='请输入项目名称'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>立项部门：</span>
        <treeselect v-model='value' class='listStyle' :multiple='true' :options='options' placeholder='请输入立项部门'/>
      </div>
      <div class='formList'>
        <span class='text'>项目类别：</span>
        <el-radio v-model='projectForm.category' label='改造项目'>改造项目</el-radio>
        <el-radio v-model='projectForm.category' label='工艺革新项目'>工艺革新项目</el-radio>
        <el-radio v-model='projectForm.category' label='安舜重点工作项目'>安舜重点工作项目</el-radio>
        <el-radio v-model='projectForm.category' label='申请政府奖补资金及专项税免项目'>申请政府奖补资金及专项税免项目</el-radio>
        <el-radio v-model='projectForm.category' label='专利申请'>专利申请</el-radio>
        <el-radio v-model='projectForm.category' label='其他项目'>其他项目</el-radio>
      </div>
      <div class='formList'>
        <span class='text'>计划投资总额：</span>
        <el-input v-model='projectForm.totalInvestment' class='listStyle' size='small' placeholder='请输入计划投资总额'>
        </el-input>
      </div>
      <div class='formList'>
        <span class='text'>预期收益：</span>
        <el-input v-model='projectForm.expectedReturn' class='listStyle' size='small' placeholder='请输入预期收益'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>项目背景：</span>
        <el-input v-model='projectForm.backGround' class='listStyle' size='small' placeholder='请输入项目背景'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>项目目标：</span>
        <el-input v-model='projectForm.target' class='listStyle' size='small' placeholder='请输入项目目标'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>项目经理：</span>
        <el-input v-model='projectForm.manager' class='listStyle' size='small' placeholder='请输入项目经理'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>核心人员：</span>
        <el-input v-model='projectForm.corePersonnel' class='listStyle' size='small' placeholder='请输入核心人员'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>主要人员：</span>
        <el-input v-model='projectForm.keyPersonnel' class='listStyle' size='small' placeholder='请输入主要人员'></el-input>
      </div>
      <div class='formList'>
        <span class='text'>申请人：</span>
        <el-input v-model='projectForm.proposer' class='listStyle' size='small' placeholder='请输入申请人'></el-input>
      </div>
      <div class='formList progress'>
        <span class='text'>项目章程：</span>
        <div class="btn">
          <el-button type='primary' size='medium' class='Btn_2' @click='addProgress'>添加分项</el-button>
        </div>
        <!-- 项目章程列表 -->
        <div class="progress">
          <el-table :data='projectForm.progress' border style='width: 100%'>
            <el-table-column fixed type='index' label='序号' align='center' width='50'></el-table-column>
            <el-table-column prop='name' label='分项名称'></el-table-column>
            <el-table-column prop='principal' label='责任人'></el-table-column>
            <el-table-column prop='startTime' label='开始时间'></el-table-column>
            <el-table-column prop='endTime' label='结束时间'></el-table-column>
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
        <!-- 结束 -->
      </div>
      <div class='searchBtn' >
        <el-button type='primary' size='medium' class='Btn_2' @click='addProjectList'>{{!isView ? "提交":"修改" }}</el-button>
      </div>
      <div class='searchBtn' v-if='!isView'>
        <!-- <el-button type='primary' size='medium' class='Btn_2' @click='addProgress'>下一步</el-button> -->
      </div>
      <div class='searchBtn'>
        <el-button class='Btn_2' size='medium' @click='resetList'>取消</el-button>
      </div>
      <div class='marginBottom'></div>
    </div>
    <!-- 弹窗 -->
    <div class="mask" v-if="isAddprogress">
      <div class="boom">
        <div class="top">
          <span class="delete">添加进度表</span><a href="javascript:;" class="close"><span @click="resetForm"></span></a>
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
              <el-form-item label="开始时间" prop="startTime">
                <div class="orderInput">
                  <el-date-picker v-model="proForm.startTime" type="date" placeholder="选择日期" value-format="timestamp">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
             <div class="orderName orderModityPublic">
              <el-form-item label="结束时间" prop="endTime">
                <div class="orderInput">
                  <el-date-picker v-model="proForm.endTime" type="date" placeholder="选择日期" value-format="timestamp">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
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
        editList:false,
        dbUrl:'',
        proData: {},
        proForm: {
          name: '', // 分项名称
          principal: '', //负责人
          startTime: null, // 开始时间
          endTime: null // 完成时间
        },
        proRules: {},
        progressList: [],
        isAddprogress: false,
        isEdit: false,
        isView: false,
        dataUrl: Urls.dataUrl,
        value: null,
        projectForm: {
          number: '', // 项目编号
          name: '', // 项目名称
          category: null, // 项目类别
          totalInvestment: '', // 计划投资总额
          backGround: '', // 项目背景
          time: Number, // 立项时间
          target: '', // 项目目标
          deadline: null, // 完成期限
          expectedReturn: null, // 预期收益
          manager: '', // 项目经理
          corePersonnel: '', // 核心成员
          keyPersonnel: '', // 主要成员
          corePersonnelArr: null, // 核心成员
          keyPersonnelArr: null, // 主要成员
          progress: [], // 项目进度
          department: '', // 立项部门
          proposer: '', // 申请人
          projectStatus: null // 项目状态
        },
        options: [{
            id: '1',
            label: '生产系统',
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
            label: '设备',
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
                label: '自控'
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
          }, ,
          {
            id: '4',
            parentId: null,
            label: 'SHE'
          },
          {
            id: '5',
            parentId: null,
            label: '运管管理'
          }
        ]
      }
    },
    mounted() {
      let itemData = JSON.parse(localStorage.getItem('itemData'));
      console.log(itemData,"itemData");
      if (this.$route.query.itemData) {
        //
        this.isView = true
        //this.projectForm  = this.$route.query.itemData;
         this.projectForm  = this.$route.query.itemData;
        console.log(this.projectForm,'处于编辑状态');
        // console.log(this.projectForm,'projectForm')
      } else {
        this.isView = false
      }
    },
    methods: {
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
      submitForm(value){
        if(this.editList){
          this.editList = false;
        }
        else this.projectForm.progress.push(value);
        // console.log(this.projectForm,"this.projectForm");
        this.isAddprogress = !this.isAddprogress;
        this.proForm = {}
      },
      groupNameChange(value) {
        console.log(value)
        this.proData.name = value.trim()
      },
      resetList() {
        // this.$router.go(-1)
        this.$router.push({
          path: '/'
        }) // 返回首页
      },
      addProjectList() {
        var that = this
        var data = this.projectForm;
        if(this.isView)
             this.dbUrl = '/projectApi/edit'
        else 
            this.dbUrl = '/projectApi/new'
        this.axios
          .post(this.dataUrl + this.dbUrl, data)
          .then(response => {
            if (response.data.code === 1) {
              // element 弹出
              // 跳转页面

              if(that.isView){
                that.$message({
                  message: '项目修改成功',
                  type: 'success'
                })
              }else{
                that.$message({
                  message: '项目提交成功',
                  type: 'success'
                })
                that.$router.push({
                  path: '/'
                }) // 返回首页
                localStorage.setItem("itemData", JSON.stringify(data));
              }
             
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      addProgress() {
        // this.isAddprogress = !this.isAddprogress
        // this.$router.push({ path: '/progress' }) // 
        this.isAddprogress = !this.isAddprogress;
      },
      resetForm() {
        this.isAddprogress = !this.isAddprogress;
      },
      cancel() {
        this.isAddprogress = !this.isAddprogress
      }
    }
  }
</script>
<style lang='scss' scoped>
  .projectApplication {
    border-radius: 5px;

    .header {
      width: 100%;
      background-color: #ebf8f7;
      -webkit-box-shadow: 0 0 5px #888888;
      box-shadow: 0 0 5px #888888;
      overflow: hidden;

      .title {
        position: absolute;
        width: 100%;
        z-index: 100;
        font-size: 14px;
        color: #333333;
        background-color: #ebf8f7;
        font-weight: bold;
        line-height: 50px;
        padding-left: 20px;
      }
    }

    .content {
      margin: 59px 20px 20px 20px;
      background-color: #fff;
      min-height: calc(100% - 92px);
      font-size: 14px;
      color: #999;
      border: 1px solid #ccc;
      border-radius: 4px;
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

      // .btn{
      //   display: inline-block;
      // }
    }

    .progress {
      overflow: hidden;

      .text {
        float: left;
      }

      .btn {
        margin: 0px 20px 10px 32px;
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

              // & .el-form-item__content{
              //     transform:  translateX(30px); 
              // }
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