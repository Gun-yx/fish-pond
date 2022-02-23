<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avator_box">
        <img src="../assets/咸鱼爱生活.jpg" alt=""/>
      </div>
      <!--登录表单区域-->
      <el-form ref="loginFormRef" :model="loginForm"  label-width="0px" class="login_form" :rules="loginFormRules">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-search" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" v-on:click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        //此处为登录表单的数据绑定对象
        loginForm:{
          username:'',
          password:''
        },
        //这是表单的验证规则
        loginFormRules:{
          //验证用户名是否合法
          username:[
            { reuqire:true, message:"请输入登录昵称", trigger:"blur" },
            { min:3, max:9, message:"长度在3到9个字符", trigger:"blur"}
          ],
          //验证密码是否合法
          password:[
            { reuqire:true, message:"请输入登录密码", trigger:"blur" },
            { min:3, max:9, message:"长度在6到15个字符", trigger:"blur"}
          ]
        }
      }

    },
    methods:{
      //重置按钮，重置登录表单
      resetLoginForm(){
        this.$refs.loginFormRef.resetFields();
      },
      login(){
        //调用API接口，获取数据库中的数据
          //将登录之后的token，保存到客户端的sessionStorage中
          //项目中除了登录之外的其他API接口，必须在登录之后才能访问
          //token只应在当前网站打开期间生效，所以将token保存在sessionstorage中
        this.$refs.loginFormRef.validate( async valid =>{
          if(!valid) return;
          const {data : res} = await this.$http.post('login',this.loginForm);
          if(res.meta.status !== 200) return this.$message.error('登录失败')
          this.$message.success('登录成功');
          console.log(res);
          //传token的值，如果有token的话，就进行跳转
          window.sessionStorage.setItem('token',res.data.token);
          //通过编程式导航跳转到后台主页，路由地址是/home
          this.$router.push('/home')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.avator_box{
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position:absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ddd;
  }
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btn{
  display: flex;
  justify-content: flex-end;

}

</style>