<template>
  <div class='projectApplication'>
    <div class="header">
      <div class="title">{{isView?'查看':'新增'}}</div>
    </div>
    <div class='content'>
      <div class="showInfo" v-if="!itemData||itemData.subPro==='1'">
        <div class='formList' >
          <span class='text'>{{isProject ? "项目名称：" : '事项名称：'}}</span>
          <el-input v-model='projectForm.name' class='listStyle' size='small' placeholder='请输入项目名称' v-bind:disabled="isView" ></el-input>
        </div>
        <div class='formList' v-if="isProject">
          <span class='text'>项目编号：</span>
          <el-input v-model='projectForm.number' class='listStyle' size='small' placeholder='请输入项目编号' v-bind:disabled="isView"></el-input>
        </div>
        <div class='formList'>
          <span class='text'>{{isProject ? "项目状态：" : '事项状态：'}}</span>
          <el-select v-model='projectForm.projectStatus' placeholder='项目状态' size='small' @change="monitorStatus">
            <el-option v-for='item in projectStatus' :key='item.value' :label='item.label' :value='item.value'>
            </el-option>
          </el-select>
        </div>
        <div class='formList' v-if="projectForm.projectStatus == 2">
          <span class='text'>奖励金额：</span>
          <el-input v-model='projectForm.prize' class='listStyle' size='small' ></el-input>
        </div>
        <div class='formList' >
          <span class='text'>{{isProject ? "立项部门：" : '事项状态：'}}</span>
          <treeselect v-model='department' class='listStyle' :multiple='true' :options='options' placeholder='请输入立项部门' v-bind:disabled="isView"/>
        </div>
        <div class='formList'  v-if="isProject">
          <span class='text'>项目类别：</span>
          <el-radio v-model='projectForm.category' label='改造项目' >改造项目</el-radio>
          <el-radio v-model='projectForm.category' label='工艺革新项目'>工艺革新项目</el-radio>
          <el-radio v-model='projectForm.category' label='安舜重点工作项目'>安舜重点工作项目</el-radio>
          <el-radio v-model='projectForm.category' label='申请政府奖补资金及专项税免项目'>申请政府奖补资金及专项税免项目</el-radio>
          <el-radio v-model='projectForm.category' label='专利申请'>专利申请</el-radio>
          <el-radio v-model='projectForm.category' label='其他项目'>其他项目</el-radio>
        </div>
        <div class='formList'  v-if="isProject">
          <span class='text'>计划投资总额：</span>
          <el-input v-model='projectForm.totalInvestment' class='listStyle' size='small' placeholder='请输入计划投资总额'>
          </el-input>
        </div>
        <div class='formList'  v-if="isProject">
          <span class='text'>预期收益：</span>
          <el-input v-model='projectForm.expectedReturn' class='listStyle' size='small' placeholder='请输入预期收益'></el-input>
        </div>
        <div class='formList'>
          <span class='text'>{{isProject ? "项目背景：" : '事项背景：'}}</span>
          <el-input v-model='projectForm.backGround' class='listStyle' size='small' placeholder='请输入项目背景' 
          type="textarea" :rows="4" @change="valueChange"></el-input>
        </div>
        <div class='formList'>
          <span class='text'>{{isProject ? "项目目标：" : '事项目标：'}}</span>
          <el-input v-model='projectForm.target' class='listStyle' size='small' placeholder='请输入目标'
          type="textarea" :rows="5"></el-input>
        </div>
        <div class='formList'>
          <span class='text'>计划完成时间：</span>
          <el-date-picker v-model="projectForm.planTime" class='listStyle' type="date" placeholder="选择日期" value-format="timestamp" v-bind:disabled="isView"> </el-date-picker>
        </div>
        <div class='formList'>
          <span class='text'>{{isProject ? "项目经理：" : '事项负责人：'}}</span>
          <el-input v-model='projectForm.manager' class='listStyle' size='small' placeholder='请输入项目经理' v-bind:disabled="isView"></el-input>
        </div>
        <div class='formList'  v-if="isProject">
          <span class='text'>核心人员：</span>
          <el-input v-model='projectForm.corePersonnel' class='listStyle' size='small' placeholder='请输入核心人员' v-bind:disabled="isView"></el-input>
        </div>
        <div class='formList'  v-if="isProject">
          <span class='text'>主要人员：</span>
          <el-input v-model='projectForm.keyPersonnel' class='listStyle' size='small' placeholder='请输入主要人员' v-bind:disabled="isView"></el-input>
        </div>
        <div class='formList'  v-if="isProject">
          <span class='text'>申请人：</span>
          <el-input v-model='projectForm.proposer' class='listStyle' size='small' placeholder='请输入申请人' v-bind:disabled="isView"></el-input>
        </div>
      </div>
      <div class='formList progress'>
        <span class='text'>里程碑计划：</span>
        <div class="btn">
          <el-button type='primary' size='medium' class='Btn_2' @click='addProgress'>添加分项</el-button>
        </div>
        <!-- 项目章程列表 -->
        <div class="progress">
          <el-table :data='projectForm.progress' border style='width: 100%'>
            <el-table-column fixed type='index' label='序号' align='center' width='50'></el-table-column>
            <el-table-column prop='name' label='分项名称'></el-table-column>
            <el-table-column prop='principal' label='责任人'></el-table-column>
            <el-table-column prop='startTime' label='计划开始时间' :formatter="formatterStartTime"></el-table-column>
            <el-table-column prop='endTime' label='计划结束时间' :formatter="formatterEndTime"></el-table-column>
            <el-table-column prop='isEnd' label='是否完成' :formatter="formatterIsEnd"></el-table-column>
             <el-table-column prop='realStartTime' label='实际开始时间' :formatter="formatterRealStartTime"></el-table-column>
            <el-table-column prop='realEndTime' label='实际结束时间' :formatter="formatterRealEndTime"></el-table-column>
            <el-table-column prop='process' label='进展'></el-table-column>
            <el-table-column prop='unDoneReason' label='延期原因'></el-table-column>
            <el-table-column fixed='right' label='操作' width='120'>
              <template slot-scope='scope'>
                <el-button type="primary" icon="el-icon-edit" circle @click='editProgress(scope.row)'>编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" circle    @click='delProgress(scope.$index)'>删除</el-button>
                <el-button type="info" icon="el-icon-message" circle    @click='subLog(scope.row)'>提交记录</el-button>
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
          <span class="delete">{{editList?"修改进度表":"添加进度表"}}</span><a href="javascript:;" class="close"><span @click="resetForm"></span></a>
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
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import moment from 'moment'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import * as Urls from '@/components/url'
  export default {
    beforeRouteEnter(to, from, next) {
        console.log(from.path,"from");
        next(vm => {
           if(from.path === '/'){
            vm.eventType = '1';
            console.log(vm.eventType,"vm.eventType");
            // sessionStorage.setItem("eventType", vm.eventType);
            }else if(from.path === '/importMatter'){
              vm.eventType = '2';
            }
            sessionStorage.setItem("eventType", vm.eventType)
            vm.judge();
        });
    },
    components: {
      Treeselect
    },
    data() {
      return {
        projectEnd: false, // 项目是否完成
        isProject: true,
        eventType: '1', // 事项类型
        itemData:null,
        isDelay:false,
        editList:false,
        dbUrl:'',
        proData: {},
        proForm: {
          name: '', // 分项名称
          principal: '', //负责人
          startTime: null, // 开始时间
          endTime: null, // 完成时间
          realStartTime: null, // 开始时间
          realEndTime: null, // 完成时间
          isEnd: '',
          isStart:'',
          process:'',
          unDoneReason:''
        },
        proRules: {},
        progressList: [],
        isAddprogress: false,
        isEdit: false,
        isView: false,
        dataUrl: Urls.dataUrl,
        department: null,
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
          planTime:null, //计划完成时间
          manager: '', // 项目经理
          corePersonnel: '', // 核心成员
          keyPersonnel: '', // 主要成员
          corePersonnelArr: null, // 核心成员
          keyPersonnelArr: null, // 主要成员
          progress: [], // 项目进度
          department: '', // 立项部门
          proposer: '', // 申请人
          projectStatus: "", // 项目状态
          prize: null, // 奖励金额
        },
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
        projectStatus: [{
            value: '1',
            label: '已完成'
          },{
            value: '2',
            label: '已奖励'
          },{
            value: '3',
            label: '正在进行'
          },
          {
            value: '4',
            label: '异常'
          },
          {
            value: '5',
            label: '暂停'
          },{
             value: '6',
            label: '失败'
          },
          
        ],
      }
    },
    mounted() {
      console.log(this.eventType,"mounted");
      let msg = this.itemData = JSON.parse(sessionStorage.getItem('itemData'));
      // console.log(this.itemData,"itemData");
      if(this.itemData) {
        if ( this.itemData.subPro === "1" || this.itemData.subPro ==="2") {
          this.isView = true;
          //this.projectForm  = this.$route.query.itemData;
          this.projectForm  = JSON.parse(sessionStorage.getItem('itemData'));
          console.log(this.projectForm,'处于编辑状态');
          let depArr = [];
          depArr.push(this.itemData.department);
          this.department = depArr;
          // console.log(this.projectForm,'projectForm')
        } else if(this.itemData.subPro && this.itemData.subPro === "2") {
          this.projectForm  = this.itemData;
          console.log(this.projectForm,'项目简报提报');
        }
      }
      else {
        this.isView = false
      }
    },
    methods: {
      monitorStatus(value) { // 监测事项状态
        console.log(value);
        if(value == '1') this.projectEnd = true
      },
      judge() {
        console.log(this.eventType,"this.eventType ")
        this.eventType = sessionStorage.getItem("eventType")
        if(this.eventType == '1'){
          //console.log('项目');
          this.isProject = true;
        }else if(this.eventType == '2') {
          //console.log('督办')
          this.isProject = false;
        }
      },
      subLog(data){
        // console.log(data);
        this.$router.push({path:'/subLog',query:{dataList:data.subLog}})
      },
      valueChange(){
         console.log(this.itemData,"this.itemData");
      },
      calculationDelay(){ // 计算是否延期
        // console.log("计算拖延时间")
        // 开始时间推迟
        if(this.proForm.isStart == 2){
          this.proForm.isEnd = '2'
          this.proForm.realStartTime = null
          this.proForm.realEndTime = null
        }
        if(Number(this.proForm.realStartTime) > Number(this.proForm.startTime)) {
          this.isDelay = true;
          //console.log(Number(this.proForm.realStartTime),Number(this.proForm.startTime),"开始时间yanqi")
        }
        else if(Number(this.proForm.realEndTime) > Number(this.proForm.endTime)){
          this.isDelay = true;
          //console.log(Number(this.proForm.realEndTime),Number(this.proForm.endTime),"完成时间yanqi")
        }
        else if((Date.parse(new Date()) > Number(this.proForm.endTime))){ // 截止当前未完成
          this.isDelay = true;
          console.log((Date.parse(new Date()),Number(this.proForm.endTime),"完成时间yanqi"))
        }
        else if((Date.parse(new Date()) > Number(this.proForm.startTime))&&this.proForm.isStart =='2'){ // 截止当前未完成
          this.isDelay = true;
          //console.log((Date.parse(new Date()),Number(this.proForm.endTime),"完成时间yanqi"))
        }
        else{
          this.isDelay = false;
          this.proForm.unDoneReason = '';
        }
      },
      formatterRealStartTime(row) {
        let time = row.realStartTime
        if(time){
          return moment(time).format('YYYY-MM-DD');
        }
      },
      formatterRealEndTime(row) {
        let time = row.realEndTime
        if(time){
          return moment(time).format('YYYY-MM-DD');
        }
      },
      formatterStartTime(row) {
        let time = row.startTime
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
      formatterIsEnd (row) {
        if (row.isEnd === "1")return "是"
        if (row.isEnd === "2") return "否"
      },
      editProgress (value) {
        this.editList = true;
        this.proForm = value;
        this.isAddprogress = !this.isAddprogress;
        this.calculationDelay();
        // @change="calculationDelay"
      },
      delProgress(index) {
        console.log(index,"index");
        this.$confirm('删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(index,"index");
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
         sessionStorage.setItem("itemData",null);
      },
      addProjectList() {
        let that = this
        let data = this.projectForm;
        // console.log(this.itemData,"this.itemData")
        // console.log(data,"data");
        // console.log(JSON.stringify(data),"JSON.stringify");
        // data.subTime = Number(new Date());
        // if(JSON.stringify(this.itemData) == JSON.stringify(data)) {
        //   console.log("xiangtong")
        //   // this.$message({
        //   //         showClose: true,
        //   //         message: '请勿重复提交',
        //   //         type: 'warning'
        //   //       }) 
        // }else{
        // }
        // console.log(this.department,"this.department");
        if(this.isView){
           this.dbUrl = '/projectApi/edit'
           data.eventType = this.eventType
           data.department = this.department[0];
          // console.log(JSON.stringify(data) ,"data");

        }
        else {
           this.dbUrl = '/projectApi/new'
           data.department = this.department[0];
           data.eventType = this.eventType
           data.progress.forEach((item,index)=>{
             item.subLog = [{
               subTime:  Number(new Date()),
               subPro: item.process ? item.process:'新增'
             }]
           })
        }
        console.log(data,"data");
        console.log(JSON.stringify(data),"JSON.stringify");
        // 提交判断
        this.axios.post(this.dataUrl + this.dbUrl, data)
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
                sessionStorage.setItem("itemData", JSON.stringify(data));
              }
             
            }
          })
          .catch(err => {
            console.log(err)
          })
          sessionStorage.setItem("itemData",null);
      },
      addProgress() {
        // this.isAddprogress = !this.isAddprogress
        // this.$router.push({ path: '/progress' }) // 
        ///this.isEdit = false;
        this.editList = false;
        this.isAddprogress = !this.isAddprogress;
      },
      resetForm() {
        this.isAddprogress = !this.isAddprogress;
        this.proForm = {}
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
    // .btndisabled{
    //   disabled:
    // }
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
        width: 400px;
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
            width: 300px;
            display: inline-block;
            margin-left: 20px
          }
          & .el-select{
            width: 300px;
          }
          & .el-input{
            width: 300px;
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