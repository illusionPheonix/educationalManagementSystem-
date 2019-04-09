<template>
  <div class="PasswordModify">
    <!-- 面板 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span class="el-icon-d-arrow-right"></span>
        <span>修改密码</span>
      </div>
      <div class="text item">
        <el-form
          :model="passwordForm"
          status-icon
          :rules="rules"
          ref="passwordForm"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
          style="width:400px"
        >
            <!-- 旧密码 -->
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="text" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="newPassword">
            <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 确定密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="passwordForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button type="danger" @click="submitForm('passwordForm')">提交</el-button>
            <el-button @click="resetForm('passwordForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入验证用户名函数
import { passwordReg} from "@/utils/validator/validator.js"
export default {
    data(){     
        // 密码验证
        const validatePassword=(rule, value, callback) => {
            if(!value){
                callback(new Error("密码不能为空"));//输出错误提示
            }else if(!passwordReg(value)){
                callback(new Error("密码不能含有非法字符，长度在4-10之间"));//输出错误提示
            }else{
                if(this.passwordForm.checkPass){//如果确认密码不为空触发一致性验证
            // 触发一致性验证
                    this.$refs.passwordForm.validateField("checkPass");
                 }
                callback();//成功回调
            }
        }
         // 确认密码验证
        const validateCheckPass=(rule, value, callback) => {
            if(!value){
                callback(new Error("确认密码不能为空"));//输出错误提示
            }else if(value !== this.passwordForm.password){
                callback(new Error("两次输入不一致"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        return{
            // 表单数据
            passwordForm:{
                oldPassword:"",
                newPassword:"",
                checkpass:""  
            },
            // 验证规则
            rules:{
                // 旧密码验证
                oldPassword:[
                     {required:true,message: '请输入原密码',trigger: 'blur'}
                ],
                // 密码验证
                newPassword:[
                    {required:true,validator: validatePassword, trigger: 'blur' }
                ],
                // 确认密码验证
                checkPass:[
                     {required:true,validator: validateCheckPass, trigger: 'blur' }
                ]
            }   
        }
    },
    methods:{
        // 重置按钮事件
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //   提交按钮事件
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            // 如果成功
          if (valid) {
            // 提交数据给后端
            let params = {
                oldPassword:this.passwordForm.oldPassword,
                newPassword:this.passwordForm.newPassword
            };            
            alert("登录成功");
            // 路由跳转
            this.$router.push("/home/systeminfo")
          } else {
            return false;
          }
        });
      },
    }
}
</script>

<style lang="less">
    @import "./PasswordModify.less";
</style>
