<template>
  <div class="progress">
      <header>
          <p>事项提醒</p>
      </header>
      <div class="content">
          <div class='tableList'>
            <el-table :data='tableData' height="450" border style='width: 100%'>
                <el-table-column fixed type='index' label='序号' align='center' width='80'></el-table-column>
                <!-- <el-table-column prop='number' label='项目编号' ></el-table-column> -->
                <el-table-column prop='category' label='事项类别' ></el-table-column>
                <el-table-column prop='name' label='事项名称' ></el-table-column>
                <!-- <el-table-column prop='target' label='项目目标' width='120'></el-table-column> -->
                <el-table-column prop='planTime' label='完成期限' ></el-table-column>
                <!-- <el-table-column prop='expectedReturn' label='预期收益' width='120'></el-table-column> -->
                <el-table-column prop='manager' label='负责人' ></el-table-column>
                <!-- <el-table-column prop='corePersonnel' label='核心成员' width='120'></el-table-column>
                <el-table-column prop='keyPersonnel' label='主要成员' width='120'></el-table-column> -->
                <!-- <el-table-column prop='progress' label='项目进度' width='120'></el-table-column> -->
                <el-table-column fixed='right' label='操作' width='200'>
                <template slot-scope='scope'>
                    <el-button @click='handleClick(scope.row)' type='text' size='small'>查看/编辑</el-button>
                    <!-- <el-button @click='projectSchedule(scope.row)' type='text' size='small'>提交进度</el-button> -->
                    <!-- <el-button type='text' size='small'>编辑(暂无)</el-button> -->
                </template>
                </el-table-column>
            </el-table>
            </div>
      </div>
  </div>
</template>

<script>
import * as Urls from '@/components/url'
export default {
    data() {
        return {
            tableData:null,
            dataUrl: Urls.dataUrl,
        }
    },
    mounted(){
        this.searchList();
    },
    methods:{
        searchList (){
            let that = this
            let timestamp = Date.parse(new Date());
            this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
            this.axios
                .get(
                this.dataUrl +
                    `/projectApi/reminder?time=${timestamp}`,
                )
                .then((response) => {
                    console.log(response,"response")
                    if (response.data.code == "1") {
                        let dataList = response.data.data
                        that.tableData = dataList;
                        console.log(that.tableData,"tableDate")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        handleClick (data) {
            this.$router.push({
                path: '/projectApplication',
            })
            data.subPro = "1";
            localStorage.setItem("itemData", JSON.stringify(data));
        },
    }
}
</script>
<style lang="scss" scoped>
.progress{
    header{
        width: 100%;
        height: 60px;
        background-color: #ebf8f7;
        box-shadow: 0 0 5px #888888;
        p{
            font-size: 14px;
            color: #333333;
            background-color: #ebf8f7;
            font-weight: bold;
            line-height: 50px;
            padding-left: 20px;
        }
    }
    .content{
        margin: 10px 20px;
        &.tableList {
            margin: 10px 20px;
        }
    }


}
</style>>

