<template>
  <div class="userSettings">
    <header>
      <div class="searchCondition">
        <div class="searchItem">
          <div class="searchInput">
            <el-input v-model="searchCondition.loginName" placeholder="请输入账号" ></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <el-input v-model="searchCondition.realName" placeholder="请输入真实姓名" ></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput" style= 'position: relative; top: 13px;'>
            <treeselect  v-model='department' :multiple='true' :options='options' placeholder='请输入立项部门'/>
          </div>
        </div>
      </div>
      <div class="search">
        <div class="addUserBtn Btn">
          <el-button type="primary" size="small" class="addUserB" :disabled="packageType === 1 ? true : false"
            @click="addNewUsers">新增用户</el-button>
        </div>
        <div class="addUser Btn_2">
          <el-button type="text" @click="resetList">重置</el-button>
        </div>
        <div class="searchBtn Btn">
          <el-button type="primary" class="searchB" size="small" @click="searchList">搜索</el-button>
        </div>
        <div class="clear"></div>
      </div>
    </header>
    <div class="listTable">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="loginName" label="账号">
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名">
        </el-table-column>
        <el-table-column prop="department" :formatter="formatterDepartment" label="所在部门">
        </el-table-column>
        <el-table-column prop="roleId" :formatter="formatterRoleId" label="用户类型">
        </el-table-column>
        <el-table-column label="编辑" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="editList(scope.$index, scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="删除" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteList(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="编辑" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="changePassword_sub(scope.$index, scope.row)" size="small">修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tFoot">
      <div colspan="6">
        <div class="block">
          <el-pagination @size-change='handleSizeChange' @current-change="handleCurrentChange"
            :current-page.sync='cPage' :page-sizes="[10, 25, 50, 100]" :page-size="pSize"
            layout="sizes, prev, pager, next" :total='total'>
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="mask" v-if="addUser">
      <el-form :model="addData" :rules="addRules" ref="addData" label-width="120px" class="demo-ruleForm">
        <div class="boom">
          <div class="top"><span class="delete">信息</span><a href="javascript:;" class="close"><span
                @click="resetForm('addData')">×</span></a>
          </div>
          <div class="inner">
            <div class="orderName orderModityPublic">
              <el-form-item label="真实姓名" prop="realName">
                <div class="orderInput">
                  <el-input type="text" v-model="addData.realName" auto-complete="off"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
                <el-form-item label="所属部门" prop="addDepartment">
                <div class="orderInput">
                  <treeselect  v-model='addDepartment' :multiple='true' :options='options' style="width：150px" placeholder='请输入立项部门' />
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
                <el-form-item label="用户类型" prop="roleId">
                <div class="orderInput">
                  <!-- <treeselect  v-model='addDepartment' :multiple='true' :options='options' style="width：150px" placeholder='请输入立项部门' /> -->
                  <el-select v-model="addData.roleId" placeholder="" @change="roleChange">
                    <el-option label="管理员" value="1" ></el-option>
                    <el-option label="部门领导" value="2"></el-option>
                    <el-option label="员工" value="3"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="登录账号" prop="loginName">
                <div class="orderInput">
                  <el-input type="text" v-model="addData.loginName" auto-complete="off"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="设置密码" prop="pass">
                <div class="orderInput">
                  <el-input type="password" v-model="addData.pass" auto-complete="off"></el-input>
                </div>

              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="确认密码" prop="checkPass">
                <div class="orderInput">
                  <el-input type="password" v-model="addData.checkPass" auto-complete="off"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="input orderModityPublicBtn">
              <el-button type="primary" @click="submitForm('addData')" class="chooseTrue">确认</el-button>
              <el-button @click="resetForm('addData')">取消</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="editMask" v-if="editFlag">
      <div class="boom">
        <div class="top"><span class="delete">信息</span><a href="javascript:;" class="close"><span
              @click="resetForm('editData')">×</span></a>
        </div>
        <div class="inner">
          <el-form :model="editData" :rules="editRules" ref="editData" label-width="120px" class="demo-ruleForm">
            <div class="orderName orderModityPublic">
              <el-form-item label="真实姓名" prop="realName">
                <div class="orderInput">
                  <el-input type="text" v-model="editData.realName" auto-complete="off"></el-input>
                </div>
              </el-form-item>
            </div>
            <!-- <div class="orderName orderModityPublic">
                            <el-form-item label="昵称" prop="nickName">
                                    <div class="orderInput" >
                                        <el-input type="text" v-model="editData.nickName" auto-complete="off"></el-input>
                                    </div>
                                </el-form-item>
                        </div> -->
            <div class="orderName orderModityPublic">
              <el-form-item label="角色" prop="roleId">
                <div class="orderInput">
                  <el-select v-model="editData.roleId" placeholder="" @change="roleChange">
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="普通客服" value="2"></el-option>
                    <el-option label="质检人员" value="3"></el-option>
                    <el-option label="开发人员" value="4"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="接待量" prop="maxVisitors">
                <div class="orderInput">
                  <el-input type="text" v-model="editData.maxVisitors" auto-complete="off"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="账号" prop="loginName">
                <div class="orderInput">
                  <el-input type="text" v-model="editData.loginName" auto-complete="off" :disabled="true"></el-input>
                </div>
              </el-form-item>
            </div>
          </el-form>
          <div class="input orderModityPublicBtn">
            <el-button type="primary" @click="submitForm('editData')" class="chooseTrue">确认</el-button>
            <el-button @click="resetForm('editData')">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="deleteMask" v-show="isDelete">
      <div class="boom">
        <div class="top"><span class="delete">删除</span><a href="javascript:;" class="close"><span
              @click="returnDelete">×</span></a></div>
        <div class="inner">确认删除该客服 ？</div>
        <div class="bottom">
          <a href="javascript:;" class="chooseTrue" @click="deleteTrue">确定</a>
          <a href="javascript:;" class="chooseFalse" @click="returnDelete">取消</a>
        </div>
      </div>
    </div>
    <div class="passWordMask" v-if="changePassWord">
      <div class="boom">
        <div class="top"><span class="delete">信息</span><a href="javascript:;" class="close"><span
              @click="resetForm('editData')">×</span></a>
        </div>
        <div class="inner">
          <el-form :model="editData" :rules="changePassWordRules" ref="editData" label-width="120px"
            class="demo-ruleForm">
            <div class="orderName orderModityPublic">
              <el-form-item label="新密码" prop="pass">
                <div class="orderInput">
                  <el-input type="password" v-model="editData.pass" auto- complete="off"></el-input>
                </div>

              </el-form-item>
            </div>
            <div class="orderName orderModityPublic">
              <el-form-item label="确认密码" prop="checkPass">
                <div class="orderInput">
                  <el-input type="password" v-model="editData.checkPass" auto-complete="off"></el-input>
                </div>
              </el-form-item>
            </div>

            <div class="input orderModityPublicBtn">
              <el-button type="primary" @click="submitForm('editData')" class="chooseTrue">确认</el-button>
              <el-button @click="resetForm('editData')">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import md5 from 'js-md5'
  
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import * as Urls from '@/components/url'
  export default {
    components: {
      Treeselect
    },
    data() {
      var validateRealName = (rule, value, callback) => {
        // console.log(value,"value")
        var charReg = /(^[a-zA-Z0-9\u4e00-\u9fa5]+$)/
        if (!value) {
          callback(new Error('请输入真实姓名'))
        } else {
          if (value.length > 6) {
            callback(new Error('真实姓名长度为6个字符'))
          } else if (value.match(charReg) === null) {
            callback(new Error('只允许汉字、字母、数字'))
          }
          callback()
        }
      }
      var validateLoginName = (rule, value, callback) => {
        // console.log(value,"value")
        var charReg = /(^[a-zA-Z0-9][a-zA-Z0-9_]{4,15}$)/;

        if (!value) {
          callback(new Error("请输入账号"))
        } else {
          if (value.length > 16 || value.length < 5) {
            callback(new Error('账户字符长度需介于5-16'))
          } else if (value.match(charReg) === null) {
            callback(new Error('账户应由字母、数字及_组成，首字符必须是字母或数字'));
          }
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        // console.log(value,"value2");
        var reg = /.*[ ,'\"\\\\].*/
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length > 18 || value.length < 6) {
          callback(new Error('密码长度介于6~18个字符'))
        } else if (value.match(reg) !== null) {
          callback(new Error('密码由除空格、逗号、单双引号、反斜杠外的任意字符组成'))
        } else {
          if (this.addData.checkPass !== '') {
            this.$refs.addData.validateField('checkPass');
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.addData.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      //   修改密码
      var validatePassChange = (rule, value, callback) => {
        // console.log(value,"value2");
        var reg = /.*[ ,'\"\\\\].*/
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length > 18 || value.length < 6) {
          callback(new Error('密码长度介于6~18个字符'))
        } else if (value.match(reg) !== null) {
          callback(new Error('密码由除空格、逗号、单双引号、反斜杠外的任意字符组成'))
        } else {
          if (this.editData.checkPass !== '') {
            this.$refs.editData.validateField('checkPass');
          }
          callback()
        }
      };
      var validatePassChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.editData.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateMaxVisitors = (rule, value, callback) => {
        var val = parseInt(value);
        //console.log(!Number.isInteger(val))
        if (!Number.isInteger(val)) {
          callback(new Error('最大接待量必须是数字'))
        } else if (val > 999 || val < 1) {
          callback(new Error('最大接待量需介于1~999'))
        } else {
          callback()
        }
      };
      return {
        addDepartment: null,
        department: null,
        packageType: null,
        changePassword_id: null,
        changePassWord: false,
        editFlag: false,
        addUser: false,
        roleId: null,
        deleteRow: null,
        isDelete: false,
        addRules: {
          loginName: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur change'
            },
            // {
            //   validator: validateLoginName,
            //   trigger: 'blur change'
            // },
          ],
          pass: [
            //{min: 6, max: 18, message: '密码长度介于6~18个字符', trigger: 'blur change'},
            {
              required: true,
              message: '输入密码',
              trigger: 'blur change'
            },
            {
              validator: validatePass,
              trigger: 'blur change'
            },
          ],
          checkPass: [{
              required: true,
              message: '请再次输入密码',
              trigger: 'blur change'
            },
            {
              validator: validatePass2,
              trigger: 'blur change'
            },
          ],
          realName: [{
              required: true,
              message: '请输入真实姓名',
              trigger: 'blur change'
            },
            {
              min: 1,
              max: 6,
              message: '真实姓名长度为6个字符',
              trigger: 'blur change'
            },
            {
              validator: validateRealName,
              trigger: 'blur change'
            },
          ],
          // nickName:[
          //     {required: true, message: '请输入昵称', trigger: 'blur' },
          //     {min: 1, max: 16, message: '长度需介于1~16 个字符', trigger: 'blur change'},
          // ],


        },
        editRules: {
          loginName: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur change'
            },

          ],
          realName: [{
              required: true,
              message: '请输入真实姓名',
              trigger: 'blur change'
            },
            {
              min: 1,
              max: 6,
              message: '真实姓名长度为6个字符',
              trigger: 'blur,change'
            },
          ],
          // nickName:[
          //     {required: true, message: '请输入昵称', trigger: 'blur change' },
          //     {min: 1, max: 16, message: '长度需介于1~16 个字符', trigger: 'blur,change'},
          // ],
          maxVisitors: [{
              required: true,
              message: '请输入接待量',
              trigger: 'blur, change'
            },
            {
              validator: validateMaxVisitors,
              trigger: 'blur,change'
            },

          ],
          roleId: [{
            required: true,
            message: '请选择角色',
            trigger: 'blur change'
          }, ]
        },
        changePassWordRules: {
          pass: [{
              min: 6,
              max: 18,
              message: '密码长度介于6~18个字符',
              trigger: 'blur change'
            },
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur change'
            },
            {
              validator: validatePassChange,
              trigger: 'blur change'
            },
          ],
          checkPass: [{
              required: true,
              message: '请输入确认密码',
              trigger: 'blur change'
            },
            {
              validator: validatePassChange,
              trigger: 'blur change'
            },
          ],
        },
        basicUrl: Urls.dataUrl,
        //dataUrl: Urls.dataUrl,
        pSize: 10,
        cPage: 1,
        total: null,
        isModify: false,
        searchCondition: {
          loginName: '',
          realName: '',
          // nickName:'',
          Character: '',
          status: ''
        },
        addData: {
          loginName: '',
          pass: '',
          checkPass: '',
          realName: '',
          // nickName:'',
          maxVisitors: '1',
          roleId: ''
        },
        editData: {
          loginName: '',
          pass: '',
          checkPass: '',
          realName: '',
          // nickName:'',
          maxVisitors: '',
          roleId: ''
        },
        tableData: [],
        Characters: [
            {
            value: '1',
            label: '管理员'
            }, {
            value: '2',
            label: '普通客服'
            }, {
            value: '3',
            label: '质检员'
            }, {
            value: '4',
            label: '开发人员'
            }
        ],
        status: [
            {
            value: '2',
            label: '在线'
            }, {
            value: '3',
            label: '挂起'
            }, {
            value: '1',
            label: '离线'
            }
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
          }, {
            id: '7',
            parentId: null,
            label: '人力资源部'
          }, {
            id: '8',
            parentId: null,
            label: '总经理办公室'
          }
        ],
      }
    },
    mounted() {
      // var vm = this;
      // var url = this.basicUrl + `/admin/package/find`;
      // axios({
      //     method: 'get',
      //     url,
      //     headers: {
      //       'X-Requested-With': 'XMLHttpRequest'
      //     },
      //     requestHeader: {
      //       'Content-Type': 'application/json'
      //     },
      //   }).then(function (response) {
      //     console.log(response);
      //     if (JSON.parse(response.request.response).code === 1) {
      //       vm.packageType = JSON.parse(response.request.response).data.packageType;
      //       console.log(vm.packageType, 'this.packageType')
      //       if (vm.packageType === 3) {
      //         document.getElementById('permissions').style.backgroundColor = "gray";
      //         document.getElementById('permissions').style.cursor = "not-allowed";
      //       }
      //     }
      //   }.bind(this))
      //   .catch(function (err) {
      //     console.log(err)
      //     console.log(url)
      //   }.bind(this))
      this.getTableListAll(this.basicUrl +
        `/userApi/userList/paginate?realName=&loginName=&department=&roleId=`
        );
    },
    methods: {
      changePassword_sub(index, row) {
        this.changePassWord = true;
        this.changePassword_id = row.id;
      },
      roleChange(value) {
        console.log(value);
      },
      addNewUsers() {
        if (this.packageType === 1) return

        this.addUser = true;
        this.isModify = true;
        this.roleId = null;
        this.addData = {
          available: true,
          loginName: "",
          roleId: "",
          maxVisitors: "1",
          realName: "",
          status: "",
        }

      },
      resetList() {
        this.searchCondition = {
            loginName: '',
            realName: '',
            // nickName:'',
            Character: '',
            status: ''
          }
          // this.getTableListAll(this.basicUrl +
          //   `/api/auth/user/paginate?realName=&nickName=&loginName=&roleId=&status=&pageSize=10&currentPage=1&orderColumn=&dir=`
          //   );
      },
      searchList() {
        //console.log(this.basicUrl+`/api/auth/user/paginate?realName=${this.searchCondition.realName}&nickName=${this.searchCondition.nickName}&loginName=${this.searchCondition.loginName}&roleId=${this.searchCondition.Character}&status=${this.searchCondition.status}&pageSize=10&currentPage=1&orderColumn=&dir=`)
        this.getTableListAll(this.basicUrl +
          `/userApi/userList/paginate?realName=${this.searchCondition.realName}&loginName=${this.searchCondition.loginName}&roleId=${this.searchCondition.Character}&department=`+this.department
          )
      },
      submitForm(formName) {
        // console.log(this.editData)
        //console.log(this.$refs[formName].validate,"tijiao")
        var vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addUser) { // 添加
              this.isModify = false;
              var value = {
                password: this.addData.pass,
                encPassword: md5(this.addData.pass),
                loginName: this.addData.loginName,
                roleId: this.addData.roleId,
                realName: this.addData.realName,
                department: this.addDepartment,
              }
              console.log(value,"value");
              // POST 请求
              var data = JSON.stringify(value);
              //var url= this.basicUrl+`/api/auth/user/update/${this.editData.id}`;
              var url = this.basicUrl + `/userApi/userList/add`
              axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
              axios.post(url, data)
                .then(function (response) {
                  console.log(response,"response")
                  if (response.data.code === 1) {
                    vm.getTableListAll(vm.basicUrl +
                      `/userApi/userList/paginate?realName=${vm.searchCondition.realName}&loginName=${vm.searchCondition.loginName}&department=${vm.department}`
                      )
                    vm.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    vm.addData = {
                      password: "",
                      encPassword: "",
                      loginName: "",
                      roleId: "",
                      realName: "",
                    }
                    vm.department = null
                    vm.addUser = false;
                  }else if (response.data.code=== 1009) {
                    vm.$message({
                      message: '账号已存在',
                      type: 'warning'
                    });
                    vm.addData = {
                      password: "",
                      encPassword: "",
                      loginName: "",
                      roleId: "",
                      realName: "",
                    }
                    vm.addDepartment = null
                    vm.addUser = false;
                  } else {
                    vm.$message({
                      message: '添加失败',
                      type: 'warning'
                    });
                    vm.addData = {
                      password: "",
                      encPassword: "",
                      loginName: "",
                      roleId: "",
                      realName: "",
                    }
                    vm.addDepartment = null
                    this.addUser = false;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                  vm.$message({
                    message: '添加失败',
                    type: 'warning'
                  });
                  vm.addData = {
                      password: "",
                      encPassword: "",
                      loginName: "",
                      roleId: "",
                      realName: "",
                     
                    }
                  vm.addDepartment = null
                  vm.editData = null;
                  vm.addUser = false;
                }.bind(this));
            } else if (this.editFlag) { //  修改
              // console.log(this.roleId);
              this.isModify = false;
              var roleIds = [];
              if (this.editData.roleId === "管理员") this.editData.roleId = "1"
              else if (this.editData.roleId === "普通客服") this.editData.roleId = "2"
              else if (this.editData.roleId === "质检人员") this.editData.roleId = "3"
              else if (this.editData.roleId === "开发人员") this.editData.roleId = "4"
              roleIds.push(this.editData.roleId)
              var value = {
                loginName: this.editData.loginName,
                maxVisitors: this.editData.maxVisitors,
                // nickName : this.editData.nickName,
                realName: this.editData.realName,
                roleId: this.editData.roleId
              }
              console.log(value, "value");
              // POST 请求
              var data = JSON.stringify(value);
              var url = this.basicUrl + `/api/auth/user/update/${this.editData.id}`; // 修改url
              //var url= this.basicUrl+`/api/auth/user/create/`
              axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
              axios.post(url, data)
                .then(function (response) {
                  this.editFlag = false;
                  this.editData = null;
                  this.isModify = false;
                  if (response) {

                    if (JSON.parse(response.request.response).code === 1) {
                      vm.getTableListAll(vm.basicUrl +
                        `/api/auth/user/paginate?realName=${vm.searchCondition.realName}&nickName=${vm.searchCondition.nickName}&loginName=${vm.searchCondition.loginName}&roleId=${vm.searchCondition.Character}&status=${vm.searchCondition.status}&pageSize=${vm.pSize}&currentPage=${vm.cPage}&orderColumn=&dir=`
                        )

                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });

                    } else {
                      this.$message({
                        message: '修改失败',
                        type: 'warning'
                      });
                      this.editData = null;
                      this.isModify = false;
                    }

                  }

                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                  this.$message({
                    message: '添加失败',
                    type: 'warning'
                  });
                  this.editData = null;
                  this.isModify = false;
                }.bind(this));
            } else if (this.changePassWord) { //修改密码
              var obj = {
                encPwd: md5(this.editData.pass)
              }
              vm.axios.post(vm.basicUrl + `/api/auth/user/update/pwd/${this.changePassword_id}`, obj)
                .then(function (response) {
                  if (response.data.code === 1) {
                    vm.changePassWord = false;
                    vm.$message({
                      message: '密码修改成功',
                      type: 'success'
                    })
                    vm.editData.pass = '';
                    vm.editData.checkPass = ''

                  } else {
                    vm.changePassWord = false;
                    vm.$message({
                      message: '密码修改失败',
                      type: 'warning'
                    })
                    vm.editData.pass = '';
                    vm.editData.checkPass = ''
                  }

                }).catch(function (error) {
                  console.log(error);
                  vm.changePassWord = false;
                });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        //console.log("quxiao");
        this.addUser = false;
        this.editFlag = false;
        this.changePassWord = false;
      },
      getTableListAll(url) { // 获取全部列表
        var self = this;
        /* get请求 */
        axios({
            method: 'get',
            url,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            requestHeader: {
              'Content-Type': 'application/json'
            },
          }).then(function (response) {

            if (response.data.code === 1) {
              //console.log()
              console.log(response.data.data,"data")
              var data = response.data.data;
              // console.log(response.data.data.total, "data.total")
              this.total = response.data.data.total;
              // this.cPage = response.data.data.pageNum;
              // this.pSize = response.data.data.pageSize;
              this.tableData = response.data.data;
              
            }
          }.bind(this))
          .catch(function (err) {
            console.log(err);
            console.log(url)
          }.bind(this))
      },
      formatterDepartment(row) {
        // console.log(row,"row")
        // let department = row.department
        // let A = department.splice(0,1)
        // let B = department.splice(1,1)
        // console.log(A,B,"A-B");
        if (row.department == 1)return "生产部"
        if (row.department == 2) return "设备部"
        if (row.department == 3) return "质量系统"
        if (row.department == 4) return "技术部"
        if (row.department == 5) return "SHE"
        if (row.department == 6) return "运营管理部"
        if (row.department == 7) return "人力资源部"
        if (row.department == 8) return "总经理办公室"
      },
      formatterRoleId (row) {
        if (row.roleId == 1)return "管理员"
        if (row.roleId == 2) return "部门领导"
        if (row.roleId == 3) return "员工"
      },
      editList(index, row) {
        this.editFlag = true;
        this.editData = row;
        this.editData.maxVisitors = row.maxVisitors + "";
        //this.roleId = row.roleId;
        // console.log(row,"rrrrrrrrrrrrr")
        this.editData.roleId = row.roleName;
        //console.log(this.editData,"this.editData");
        this.isModify = true;
      },
      deleteList(index, row) {
        console.log(row,"ddddddddd")
        this.deleteRow = row;
        this.isDelete = true;
      },
      returnDelete() {
        this.isDelete = false;
      },
      deleteTrue() {
        var vm = this;
        //var url = this.basicUrl + `/userList/delete?id=${this.deleteRow._id}`
        var url = this.basicUrl + `/userApi/userList/delete`
        // var url = this.basicUrl + `/userApi/userList/add`
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        /* get请求 */
        // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        let data = {id:this.deleteRow._id};
        axios.post(url,data)
        .then
        (function (response) {
            this.isDelete = false;
            if (response.data.code === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.getTableListAll(vm.basicUrl +
                      `/userApi/userList/paginate?realName=${vm.searchCondition.realName}&loginName=${vm.searchCondition.loginName}&department=${vm.department}`
                      )
            }
          }.bind(this))
          .catch(function (err) {
            this.isDelete = false;
            this.$message({
              message: '删除失败',
              type: 'warning'
            });
            console.log(err);
          }.bind(this))
      },
      handleSizeChange(val) {
        var self = this;
        console.log(`每页 ${val} 条`);
        this.pSize = val;
        this.getTableListAll(this.basicUrl +
          `/api/auth/user/paginate?realName=${this.searchCondition.realName}&nickName=${this.searchCondition.nickName}&loginName=${this.searchCondition.loginName}&roleId=${this.searchCondition.Character}&status=${this.searchCondition.status}&pageSize=${val}&currentPage=${this.cPage}&orderColumn=&dir=`
          )
      },
      handleCurrentChange(val) {
        var self = this;
        console.log(`当前页: ${val}`);
        this.cPage = val;
        console.log(`每页 ${this.pSize} 条`)
        this.getTableListAll(this.basicUrl +
          `/api/auth/user/paginate?realName=${this.searchCondition.realName}&nickName=${this.searchCondition.nickName}&loginName=${this.searchCondition.loginName}&roleId=${this.searchCondition.Character}&status=${this.searchCondition.status}&pageSize=${this.pSize}&currentPage=${val}&orderColumn=&dir=`
          )
      },
      onSubmit() {
        console.log('submit!');
      },
    }
  }
</script>
<style lang="scss" scoped>
  .clear{
      clear: both;
  }
  .userSettings {

    //min-width: 1100px;
    //overflow: auto;
    header {
      //width: 100%;
      height: 100px;
      background-color: #ebf8f7;
      box-shadow: 0 0 5px #888888;
      .searchCondition {
        margin: 0 20px 5px;
        min-width: 1100px;
        .searchItem {
          display: inline-block;
          .text {
            font-size: 14px;
            color: #999;
          }

          .searchInput {
            width: 150px;
            margin-right: 20px;
            display: inline-block;
          }
        }
      }

      .search {
        margin: 0 20px;
        .Btn {
          display: inline-block;
          width: 120px;
          background: #36c6d3;
          color: #ffffff;
          text-align: center;
          font-size: 14px;
          border-radius: 5px;
        }

        .Btn_2 {
          //display: inline-block;
          color: #000;
          float: right;
          margin-right: 10px;
        }

        .addUserBtn {
          float: left;

          .addUserB {
            width: 120px;
          }
        }

        .searchBtn {
          float: right;
          margin-right: 20px;

          .searchB {
            width: 120px;
          }
        }
      }
    }

    .listTable {
      margin: 20px 20px 0 20px;
    }

    .tFoot {
      margin-left: 20px
    }

    .mask {
      height: 100%;
      width: 100%;
      position: absolute;
      _position: absolute;
      top: 0;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.5);
      filter: alpha(opacity=30);

      .boom {
        position: fixed;
        width: 420px;
        height: 420px;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border: 1px solid #999999;
        font-size: 14px;
        color: #999999;
        border-radius: 5px;

        & .top {
          height: 40px;
          background: #ebf8f7;
          line-height: 23px;
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
            padding-left: 330px;
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
          padding-bottom: 8px;
          padding-left: 22px;
          height: 40px;
          //line-height: 50px;
          //background: #ffffff;
          border-bottom: 1px solid #CCCCCC;

          & .orderInput {
            width: 167px;
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
          margin-top: 10px;

          & .chooseTrue {
            text-decoration: none;
            margin: 0 64px 10px 100px;
          }
        }
      }

    }

    .editMask {
      height: 100%;
      width: 100%;
      position: absolute;
      _position: absolute;
      top: 0;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.5);
      filter: alpha(opacity=30);

      .boom {
        position: fixed;
        width: 420px;
        height: 325px;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border: 1px solid #999999;
        font-size: 14px;
        color: #999999;
        border-radius: 5px;

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
            padding-left: 330px;
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
          height: 40px;
          //line-height: 50px;
          //background: #ffffff;
          border-bottom: 1px solid #CCCCCC;

          & .orderInput {
            width: 120px;
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
          margin-top: 10px;

          & .chooseTrue {
            margin: 0 64px 10px 100px;
          }
        }
      }

    }

    .passWordMask {
      height: 100%;
      width: 100%;
      position: absolute;
      _position: absolute;
      top: 0;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.5);
      filter: alpha(opacity=30);

      .boom {
        position: fixed;
        width: 420px;
        height: 200px;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border: 1px solid #999999;
        font-size: 14px;
        color: #999999;
        border-radius: 5px;

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
            padding-left: 330px;
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
          height: 40px;
          //line-height: 50px;
          //background: #ffffff;
          border-bottom: 1px solid #CCCCCC;

          & .orderInput {
            width: 120px;
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
          margin-top: 10px;

          & .chooseTrue {
            margin: 0 64px 10px 100px;
          }
        }
      }

    }

    .deleteMask {
      // min-height: 100vh; width:100%; position:fixed;  top:0; z-index:100;
      // background-color: rgba(0,0,0,0.5); filter: alpha(opacity=30);
      // top: 0;
      // left: 0;
      // right: 0;
      // bottom: 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;

      .boom {
        // position:absolute;
        // margin-top:-150px;
        // margin-left:-80px;
        // width:350px;
        // height:150px;
        // left:50%;
        // top:50%;
        // background-color:#ffffff;
        // border:1px solid #999999;
        // font-size: 14px;
        // color: #999999;
        // border-radius: 5px;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        width: 350px;
        background-color: #ffffff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
        font-size: 14px;
        color: #666666;

        & .top {
          height: 40px;
          background: #ebf8f7;
          line-height: 40px;
          /*font-weight: bold;*/
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
            padding-left: 260px;
            text-decoration: none;
            color: #999;
          }
        }

        & .inner {
          padding-left: 22px;
          height: 50px;
          line-height: 50px;
          //background: #ffffff;
          border-bottom: 1px solid #CCCCCC;
        }

        & .bottom {
          /*vertical-align: middle;*/
          height: 60px;

          /*line-height: 60px;*/
          //background: #ffffff;
          &>.chooseTrue {
            text-decoration: none;
            display: inline-block;
            width: 70px;
            height: 30px;
            line-height: 30px;
            margin: 15px 46px 0 82px;
            text-align: center;

            border-radius: 5px;
            background: #36c6d3;
            color: #ffffff;
          }

          &>.chooseFalse {
            color: #000;
            text-decoration: none;
            display: inline-block;
            width: 70px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #CCCCCC;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>