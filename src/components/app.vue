<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <header>
      <div class='userName'>
        <img :src="imgbaseUrl+'jlsz01.png'"/>
        {{userName}}
        <!-- <span class="drop_down"></span> -->
        <span style="cursor:pointer;"  class="log login" @click="login">登录</span>
        <span style="cursor:pointer;" class="log logout">退出</span>
      </div>
      <!-- <div class="userName" @click.stop="showState">
        <img :src="basicURL+'dh_gq.png'" v-if="status == 3">
        <img :src="basicURL+'dh_zx.png'" v-else-if="status == 2">
        {{userName}}
        <span></span>
        <ul class="loginState" v-show="stateIsShow">
          <li v-for="(item,index) in loginState" :key="index" @click="choseState(index)"><img :src="basicURL+item.src">{{item.state}}</li>
        </ul>
      </div> -->
    </header>
    <div class="head-top">
    </div>
    <div class="main-box clear">
      <div class="left-nav">
        <ul class="navList">
           <router-link :to="{path: item.route}" v-for="(item, index) in navList" :key="index">
            <li class="list" :class="[index==currentIndex ? 'liActive' : '']" @click="choose(index)">
                <img v-if="index==currentIndex" class="dh" :src="imgbaseUrl+item.imgActive+'.png'">
                <img v-else class="dh" :src="imgbaseUrl+item.img+'.png'">
                <span class="listName">{{item.name}}</span>
                <span v-if="item.subList.length!=0 && isOpen && index==currentIndex" class="up_down el-icon-caret-top"></span>
                <span v-else-if="item.subList.length!=0" class="up_down el-icon-caret-bottom"></span>
            </li>
            <transition enter-active-class="slideInDown" leave-active-class="slideInUp">
              <ul v-show="index==currentIndex && isOpen">
                <router-link v-for="(i,index) in item.subList" :to="{path:i.route}" :key="index" >
                  <li @click="scrtop">{{i.name}}</li>
                </router-link>
              </ul>
            </transition>
        </router-link>
        </ul>
      </div>
      <div class="main-view">
        <router-view></router-view>
      </div>
      <div class="clear"></div>
    </div>
     <div class="loginFlag" v-if='loginFlag'>
        <div class="boom">
            <div class="top"><span class="delete">用户登录</span><a href="javascript:;" class="close"><span @click="close">×</span></a>
            </div>
            <div class="inner">
                <el-form ref="login_msg" :model="login_msg" label-width="120px" class="demo-ruleForm">
                    <div class="loginMsg orderModityPublic">
                        <el-form-item label="用户名" prop="login_name">
                          <div class="orderInput">
                              <el-input type="text" v-model="login_msg.login_name" auto-complete="off"></el-input>
                          </div>
                        </el-form-item>
                    </div>
                    <div class="loginMsg orderModityPublic">
                        <el-form-item label="密码" prop="login_passWord">
                          <div class="orderInput">
                              <el-input type="text" v-model="login_msg.login_passWord" auto-complete="off"></el-input>
                          </div>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="input orderModityPublicBtn">
                    <el-button type="primary" @click="LoginForm()" class="chooseTrue">登录</el-button>
                    <el-button @click="LogoutForm()">取消</el-button>
                </div>
            </div>
        </div>
      </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      login_msg: {
        login_name: '',
        login_passWord: null
      },
      loginFlag: false,
      userName: '',
      currentIndex: 0,
      isOpen: true,
      imgbaseUrl: '/static/assets/dh-',
      navList: [
        {
          name: '立项项目',
          route: '/',
          img: 'jlsz01',
          imgActive: 'jlsz02',
          subList: [{
            name: '申请项目', route: '/projectApplication', img: 'jlsz01', imgActive: 'jlsz02', subList: []}
          ]
        },
        {
          name: '用户设置', route: '/userSettings', img: 'khzx01', imgActive: 'khzx02', subList: []
        }
      ]
    }
  },
  methods: {
    LoginForm () {

    },
    LogoutForm () {

    },
    close () {
      this.loginFlag = false
    },
    login () {
      // this.loginFlag = true
      this.$router.push({path: '/login'})
    },
    choose (index) {
      if (this.currentIndex === index) {
        this.isOpen = !this.isOpen
      }
      this.currentIndex = index
      sessionStorage.setItem('currentIndex', this.currentIndex)
    },
    scrtop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang='scss' scoped>
html,body,ul,li,ol,h1,h2,h3,h4,h5,h6,span,input{
  margin:0;padding:0;
}
//body{font:12px/1.5em "宋体",arial; color:#3c3c3c;}
// h1,h2,h3,h4,h5,h6{
//   font-size:100%;
// }
img{
  border:0;display:block;
}
ul,ol{
  list-style:none;
}
a{
  text-decoration:none;color:#fff;
}
// a:hover{
//   text-decoration:underline;
// }
.clearfix:after{content:"";display:block;height:0;visibility:hidden;clear:both;}
.clearfix{zoom:1;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
}
#app {
  header{
    width:100%;
    height:60px;
    background: #009688;
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    .userName{
      float:right;
      margin:20px 60px;
      img{
        display:inline-block;
      }
      .log{
        display:inline-block;
        margin:0 10px;
        font-size:16px;
        color:#fff;
      }
      .log:hover{

      }
      // span{
      //     display: inline-block;
      //     float:right;
      //     width: 10px;
      //     height:10px;
      //     background: url(/static/assets/user_name.png) no-repeat center;
      //     margin:4px 30px 0 20px;
      //   }
    }
  }
  .head-top{
      width:100%;
      height:60px;
  }
  .main-box{
    //background: #e7ebee;
    background: #e7ebee;
    min-height:calc(100% - 60px);
    height: calc(100vh - 60px);
    overflow-x: hidden;
    .clear{
      clear:both;
    }
    .left-nav{
      width: 240px;
      //min-height: 100%;
      float:left;
      background: #fff;
      box-shadow: 2px 2px 5px #666;
      z-index: 12;
       & .navList{
        // height:100%;
          & .list{
            min-height:50px;
            line-height: 50px;
            color: #999;
            font-size: 14px;
            font-family: 微软雅黑;
            border-left: 4px solid #fff;
            position: relative;
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            & .dh{
              width: 20px;
              height:20px;
              margin:0 20px;
              top:14px;
            }
            & .up_down{
              position: absolute;
              top:20px;
              right:20px;
              font-size: 10px;
              width: 10px;
              height:10px;
            }
            .listName{
              margin-left: 20px;
              display: inline-block;
            }
          }
          & li:hover{
            background: #e6f5f3;
            // box-shadow: 2px 2px 1px #009688;
          }
          & .liActive{
            border-left: 4px solid #009688;
            background: #beeae4;
            color:#009688;
          }
          & ul{
            background: #eee;
            & li{
              list-style: none;
              height:50px;
              line-height: 50px;
              color: #999;
              font-size: 14px;
              font-family: 微软雅黑;
              padding-left: 80px;
              border-bottom: 1px solid #beeae4;
            }
          }
        }
    }
    .main-view{
      // float: left;
      // left: 240px;
      // width: calc(100% - 240px);
      // background-color: #e7ebee;
      width: auto;
      height: 100%;
      overflow: auto;
      z-index: 13;
      background: #e7ebee;
      box-shadow: 0 0 2px 0 rgba(0,0,0,.2);
    }
  }
  // 登录
  .loginFlag{
    height:100%; width:100%; position:absolute; _position:absolute; top:0; z-index:10000;
    background-color: rgba(0,0,0,0.5); filter: alpha(opacity=30);
    .boom{
            position: fixed;
            width:420px;
            height: 200px;
            margin: auto;
            top: 0;bottom: 0;left:0;right: 0;
            background-color:#ffffff;
            border:1px solid #999999;
            font-size: 14px;
            color: #999999;
            border-radius: 5px;
            .loginMsg{
              .el-form-item {
                  margin-bottom: 10px;
              }
            }
            & .top{
                height: 40px;
                background: #ebf8f7;
                line-height: 40px;
                color: #000;
                border-radius: 5px 5px 0 0;
                border-bottom: 1px solid #CCCCCC;
                & .delete{
                padding-left: 22px;
                vertical-align: middle;
                color: #999;
                font-weight: bold;
                }
                & .close{
                vertical-align: middle;
                font-size: 25px;
                padding-left: 300px;
                text-decoration:none;
                color: #999;
                }
            }
            & .orderModityPublic{
                padding: 5px;
                padding-left: 22px;
                height: 40px;
                //line-height: 50px;
                //background: #ffffff;
                border-bottom: 1px solid #CCCCCC;
                & .orderInput{
                width: 180px;
                display:inline-block;
                margin-left:0px;
                }
            }
            & .orderModityPublicBtn{
                margin-top: 10px;
                & .chooseTrue{
                margin: 0 64px 10px 100px;
                }
            }
        }
  }
}
</style>
