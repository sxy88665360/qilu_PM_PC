<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
}
</script>

<style lang='scss'>
html,body,ul,li,ol,h1,h2,h3,h4,h5,h6,span,input{
  margin:0;padding:0;
}
body{font:12px/1.5em "宋体",arial; color:#3c3c3c;}
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
.clear{
  clear:both;
}
.project .searchItemTwo .vue-treeselect__control{
  height: 32px;
}
/* 客服管理 */
.userSettings .el-form-item__content .el-form-item__error {
  width: 120px;
  margin-left:25px;
  margin-top:-10px;
  position: absolute;
  top: 20% ;
  transform: translateX(120px);
}
</style>
