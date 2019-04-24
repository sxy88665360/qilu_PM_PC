<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <header>

    </header>
    <div class="head-top"></div>
    <div class="main-box ">
      <div class="left-nav">
        <ul class="navList">
           <router-link :to="{path: item.route}" v-for="(item, index) in navList" :key="index">
            <li class="list" :class="[index==currentIndex ? 'liActive' : '']" @click="chose(index)">
                <img v-if="index==currentIndex" class="dh" :src="imgbaseUrl+item.imgActive+'.png'">
                <img v-else class="dh" :src="imgbaseUrl+item.img+'.png'">
                <span class="listName">{{item.name}}</span>
                
                <span v-if="item.subList.length!=0 && isOpen && index==currentIndex" class="up_down el-icon-caret-top"></span>
                <span v-else-if="item.subList.length!=0" class="up_down el-icon-caret-bottom"></span>
            </li>
        </router-link>
        </ul>
           
      </div>
      <div class="main-view">
        <router-view></router-view>
      </div>
      <div class="clear"></div>
    </div>
    
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      currentIndex:0,
      imgbaseUrl: '/static/assets/dh-',
      navList: [
        {name: '立项项目', route: '/project',img:'khzx01', imgActive:'khzx02', subList: []},
        {name: '用户设置',route: '/userSettings', img:'jlsz01', imgActive:'jlsz02',  subList: [],}
      ]
    }
  },
  methods: {
    chose(index) {
      if (this.currentIndex == index) {
        this.isOpen = !this.isOpen
      }
      this.currentIndex = index
      sessionStorage.setItem('currentIndex',this.currentIndex);
    }
  }
}
</script>

<style lang='scss'>
html,body,div,ul,li,ol,h1,h2,h3,h4,h5,h6,span,input{
  margin:0;padding:0;
}
//body{font:12px/1.5em "宋体",arial; color:#3c3c3c;}
h1,h2,h3,h4,h5,h6{
  font-size:100%;
}
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
    z-index: 1000;
  }
  .head-top{
      width:100%;
      height:60px;
  }
  .main-box{
    //background: #e7ebee;
    background: #e7ebee;
    min-height:calc(100% - 60px);
    .clear{
      clear:both;
    }
    .left-nav{
      width: 240px;
      min-height: 100%;
      float:left;
      background: #fff;
      box-shadow: 2px 2px 5px #666;
      z-index: 12;
       & .navList{
          height:100%;
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
      float: left;
      position:fixed;
      left: 240px;
      width: calc(100% - 240px);
      background-color: #e7ebee;
      height: 100%;
    }
  }
}
</style>
