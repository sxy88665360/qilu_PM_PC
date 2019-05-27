<template>
    <div class="projectApplication">
        <header>
            <p>{{isView?"查看项目":"项目申请——新增"}}</p>
        </header>
        <!-- <div class="title">项目申请——新增</div> -->   
        <div class="content">
            <div class="formList">
                <span class="text">项目名称：</span>
                <el-input v-model="projectForm.name" class="listStyle"  size="small" placeholder="请输入项目名称" ></el-input>
            </div>
            <div class="formList">
                <span class="text">立项部门：</span>
                <treeselect v-model="value" class="listStyle" :multiple="true" :options="options" placeholder="请输入立项部门"/>
            </div>
            <div class="formList">
                <span class="text">项目类别：</span>
                <el-radio v-model="projectForm.category" label="1">改造项目</el-radio>
                <el-radio v-model="projectForm.category" label="2">工艺革新项目</el-radio>
                <el-radio v-model="projectForm.category" label="3">天和（乐陵）重点工作项目</el-radio>
                <el-radio v-model="projectForm.category" label="4">申请政府奖补资金及专项税免项目</el-radio>
                <el-radio v-model="projectForm.category" label="5">专利申请</el-radio>
                <el-radio v-model="projectForm.category" label="6">其他项目</el-radio>
            </div>
            <div class="formList">
                <span class="text">计划投资总额：</span>
                <el-input v-model="projectForm.totalInvestment" class="listStyle"  size="small" placeholder="请输入计划投资总额" ></el-input>
            </div>            
            <div class="formList">
                <span class="text">预期收益：</span>
                <el-input v-model="projectForm.expectedReturn" class="listStyle"  size="small" placeholder="请输入预期收益" ></el-input>
            </div>
            <div class="formList">
                <span class="text">项目背景：</span>
                <el-input v-model="projectForm.backGround" class="listStyle"  size="small" placeholder="请输入项目背景" ></el-input>
            </div>
            <div class="formList">
                <span class="text">项目目标：</span>
                <el-input v-model="projectForm.target" class="listStyle"  size="small" placeholder="请输入项目目标" ></el-input>
            </div>
            <div class="formList">
                <span class="text">项目经理：</span>
                <el-input v-model="projectForm.manager" class="listStyle"  size="small" placeholder="请输入项目经理" ></el-input>
            </div>
            <div class="formList">
                <span class="text">核心人员：</span>
                <el-input v-model="projectForm.corePersonnel" class="listStyle"  size="small" placeholder="请输入核心人员" ></el-input>
            </div>
            <div class="formList">
                <span class="text">主要人员：</span>
                <el-input v-model="projectForm.keyPersonnel" class="listStyle"  size="small" placeholder="请输入主要人员" ></el-input>
            </div>
            <div class="formList">
                <span class="text">申请人：</span>
                <el-input v-model="projectForm.proposer" class="listStyle"  size="small" placeholder="请输入申请人" ></el-input>
            </div>
            <div class="searchBtn" v-if = !isView>
                <el-button type="primary" size="medium" class="Btn_2" @click="addProjectList">新增</el-button>
            </div>
            <div class="searchBtn">
                <el-button  class="Btn_2" size="medium" @click="resetList">取消</el-button>
            </div>
            <div class="marginBottom">

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
    components: { Treeselect },
    data() {
        return {
            isEdit:false,
            isView:false,
            dataUrl: Urls.dataUrl,
            value: null,
            projectForm:{
                number:'', // 项目编号
                name:'', // 项目名称
                category: null,// 项目类别
                totalInvestment:'', // 计划投资总额
                backGround:'', // 项目背景
                time:'', // 立项时间
                target: '', // 项目目标
                deadline: null,//完成期限
                expectedReturn: null, // 预期收益
                manager:'', // 项目经理
                corePersonnel: "",// 核心成员
                keyPersonnel:"",// 主要成员
                corePersonnelArr: null,// 核心成员
                keyPersonnelArr: null,// 主要成员
                progress:"", // 项目进度
                department:'', // 立项部门
                proposer:'', // 申请人
                projectStatus:null, // 项目状态
            },
            options: [ {
                id: 'a',
                label:'生产系统',
                children: [ {
                    id: 'aa',
                    label: '101车间',
                }, {
                    id: 'ab',
                    label: '102车间',
                } ],
                }, {
                id: 'b',
                label: 'b',
                }, {
                id: 'c',
                label: 'c',
            } ],

        }
    },
    mounted () {
        if(this.$route.query.itemId){ //
            this.isView = true;
            var data = this.$route.query.itemId;
            this.projectForm = data;
            // console.log(data,this.projectForm,"处于编辑状态");
            // console.log(this.projectForm,"projectForm")
        }else{
            this.isView = false;
        }
    },
    methods: {
        resetList(){
            //this.$router.go(-1);
            this.$router.push({path:"/"}); // 返回首页
        },
        addProjectList(){
            var that = this;
            var data = this.projectForm;
            // data.department = this.value[0]? this.value[0]: "";
            // console.log(data,"projectForm");
            this.axios.post(this.dataUrl+'/projectApi/new', data)
            .then((response) => {
                 if(response.data.code === 1) {
                     // element 弹出
                     // 跳转页面
                    that.$message({
                        message: '项目提交成功',
                        type: 'success'
                    });
                    that.$router.push({path:"/"}); // 返回首页
                 }
            }).catch( (err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.projectApplication{
    
    // background: #ffffff;
    border-radius: 5px;
    // height: 400px;
    header{
        width: 100%;
        height: 50px;
        background-color: #ebf8f7;
        box-shadow: 0 0 5px #888888;
        p{
            font-size: 14px;
            color: #333333;
            font-weight: bold;
            line-height: 50px;
            margin-left: 20px;
        }
    }
    .content{
        position: relative;
        margin: 20px;
        background-color: #fff;
        min-height: calc(100% - 92px);
        font-size: 14px;
        color: #999;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .title{
        padding: 10px 20px;
        font-size: 18px;
    }
    .formList{
        margin: 0 20px;
        padding: 10px 40px 10px 20px;
        border-bottom: 1px solid #ccc;
        .listStyle{
            width: 300px;
            margin-left: 20px;
            display: inline-block;
        }
        .text{
            display: inline-block;
            width: 100px;
        }
    }
    .searchBtn{
        float: left;
        margin:10px 80px 0 100px;
    }
    .marginBottom{
        margin-bottom: 60px;
    }
}
</style>
