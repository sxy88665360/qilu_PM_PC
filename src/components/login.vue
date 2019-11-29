<template>
  <div class="loginBox">
    <img src="/static/assets/loginlogo.png" class="logo" />
    <div class="login-form">
      <div class="userName">
        <label>账号</label>
        <el-input v-model="userName"></el-input>
        <div class="clear"></div>
      </div>
      <div class="psd">
        <label>密码</label>
        <el-input v-model="psd" type="password" @keydown.enter.native="login"></el-input>
        <div class="clear"></div>
      </div>
      <div class="tips">
        <!-- <el-checkbox v-model="checked" class="remberPwd">记住密码</el-checkbox> -->
        <el-popover
          ref="popover1"
          placement="top-start"
          width="200"
          trigger="hover"
          content="超级管理员专用，其他角色联系超级管理员修改密码"
        ></el-popover>
        <!-- <el-button v-popover:popover1 class="forgetPwd"><a href="http://www.one.cn/forgetcode.html">忘记密码</a></el-button> -->
        <!--   <a href="http://www.one.cn/forgetcode.html" @ class="forgetPwd">忘记密码</a> -->
      </div>
      <button class="btn" @click="login" @keydown.enter="add">登录</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as Urls from "@/components/url";
import md5 from "js-md5";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      userName: "",
      psd: "",
      checked: false,
      domain: "",
      basicUrl: Urls.dataUrl
    };
  },
  methods: {
    neverBack() {
      window.history.forward(1);
    },
    getDimain() {
      var _host = window.location.host;
      this.domain = _host.split("//")[0].split("/")[0];
      // console.log("domain", this.domain)
    },
    login() {
      // console.log(this.userName,this.psd,this.checked)
      if (this.userName === "" && this.psd === "") {
        this.$message({
          message: "账号,密码不能为空",
          type: "warning"
        });
      } else if (this.userName === "") {
        this.$message({
          message: "账号不能为空",
          type: "warning"
        });
      } else if (this.psd === "") {
        this.$message({
          message: "密码不能为空",
          type: "warning"
        });
      } else {
        let md5Pwd = md5(this.psd);
        // let md5Pwd = this.psd
        console.log(this.userName, md5Pwd);
        axios
          .post(
            this.basicUrl +
              "/login?username=" +
              this.userName +
              "&password=" +
              md5Pwd +
              "&domain=" +
              this.domain +
              ""
          )
          .then(
            function(response) {
              console.log(response);
              if (response.data.code === 20004) {
                // document.cookie="access_token="+ response.data.data.access_token+";expires="+response.data.data.expires_in
                sessionStorage.removeItem("currentIndex");
                window.location.href = "/";
                // console.log(md5Pwd)
              } else if (response.data.code === 20001) {
                this.$message({
                  message: "账号不存在",
                  type: "warning"
                });
              } else if (response.data.code === 20002) {
                this.$message({
                  message: "账号或者密码错误",
                  type: "error"
                });
              } else if (response.data.code === 1102) {
                this.$message({
                  message: "ip登录受限制",
                  type: "error"
                });
              }
            }.bind(this)
          )
          .catch(err => {
            console.log(err);
            // window.location.href = '/'
          });
      }
    }
  },
  mounted: function() {
    this.getDimain();
    this.neverBack();
  }
};
</script>

<style scoped lang="scss">
.loginBox {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(/static/assets/dl_bj.jpg) no-repeat;
  background-size: 100%;
  .clear {
    clear: both;
  }
  & > .logo {
    position: fixed;
    top: 160px;
    left: 50%;
    transform: translateX(-50%);
  }
  .login-form {
    width: 350px;
    position: fixed;
    top: 300px;
    left: 50%;
    transform: translateX(-50%);
    label {
      width: 50px;
      height: 36px;
      line-height: 36px;
      float: left;
      font-size: 20px;
      color: #999;
    }
    .el-input {
      width: 300px;
      float: left;
    }
    .userName {
      margin-bottom: 20px;
    }
  }
  .tips {
    .remberPwd {
      float: left;
      margin-left: 50px;
    }
    .forgetPwd {
      float: right;
      color: #666;
      font-size: 14px;
      border: none;
    }
  }
  .btn {
    width: 300px;
    height: 36px;
    line-height: 36px;
    color: #fff;
    background: #35c7d2;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-left: 50px;
    // margin-top: 25px;
  }
}
</style>
