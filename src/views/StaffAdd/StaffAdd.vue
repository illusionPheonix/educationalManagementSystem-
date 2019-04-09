<template>
  <div class="StaffAdd">
    <!-- 面板 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span class="el-icon-d-arrow-right"></span>
        <span>新增员工</span>
      </div>
      <div class="text item">
        <el-form
          :model="staffAddForm"
          status-icon
          :rules="rules"
          ref="staffAddForm"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
          style="width:400px"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="staffAddForm.account" auto-complete="off"></el-input>
          </el-form-item>
            <!-- 姓名 -->
          <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="staffAddForm.name" auto-complete="off"></el-input>
          </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="staffAddForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
             <!-- 电话号码 -->
          <el-form-item label="电话号码" prop="tel">
                <el-input type="text" v-model="staffAddForm.tel" auto-complete="off"></el-input>
          </el-form-item>
             <!-- 出生年月 -->
          <el-form-item label="出生年月" prop="birthDate">
                <el-date-picker
                    v-model="staffAddForm.birthDate"
                    type="date"
                    placeholder="选择出生年月"
                    format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
          </el-form-item>
           <!-- 入职时间 -->
          <el-form-item label="入职时间" prop="entryDate">
                <el-date-picker
                    v-model="staffAddForm.entryDate"
                    type="date"
                    placeholder="选择入职时间"
                    format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
          </el-form-item>
           <!-- 员工分组 -->
          <el-form-item label="员工分组" prop="staffGrounp">
              <el-select v-model="staffAddForm.staffGrounp" placeholder="请选择员工分组">
              <el-option label="老师" value="老师"></el-option>
              <el-option label="咨询师" value="咨询师"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="店长" value="店长"></el-option>
              </el-select>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="staffAddForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 确定密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="staffAddForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button type="info" @click="submitForm('staffAddForm')">添加</el-button>
            <el-button @click="resetForm('staffAddForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入验证用户名函数
import { accountReg,passwordReg,nameReg,telReg } from "@/utils/validator/validator.js"
export default {
    data(){
        // 用户名验证
        const validateAccount=(rule, value, callback) => {
            if(!value){
                callback(new Error("账号不能为空"));//输出错误提示
            }else if(!accountReg(value)){
                callback(new Error("只能输入5-20个以字母开头、可带数字、“_”、“.”"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        // 姓名验证
        const validateName=(rule, value, callback) => {
            if(!value){
                callback(new Error("姓名不能为空"));//输出错误提示
            }else if(!nameReg(value)){
                callback(new Error("姓名不合法"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        // 验证电话号码
        const validateTel=(rule, value, callback) => {
            if(!value){
                callback(new Error("电话号码不能为空"));//输出错误提示
            }else if(!telReg(value)){
                callback(new Error("电话号码不合法"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        // 密码验证
        const validatePassword=(rule, value, callback) => {
            if(!value){
                callback(new Error("密码不能为空"));//输出错误提示
            }else if(!passwordReg(value)){
                callback(new Error("密码不能含有非法字符，长度在4-10之间"));//输出错误提示
            }else{
                if(this.staffAddForm.checkPass){//如果确认密码不为空触发一致性验证
            // 触发一致性验证
                    this.$refs.staffAddForm.validateField("checkPass");
                 }
                callback();//成功回调
            }
        }
         // 确认密码验证
        const validateCheckPass=(rule, value, callback) => {
            if(!value){
                callback(new Error("确认密码不能为空"));//输出错误提示
            }else if(value !== this.staffAddForm.password){
                callback(new Error("两次输入不一致"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        return{
            // 表单数据
            staffAddForm:{
                name:"",
                account:"",
                password:"",
                checkpass:"",
                sex: "",
                birthDate:"",
                entryDate:"",
                staffGrounp:"",
                tel:""
            },
            // 验证规则
            rules:{
                // 账号验证
                account:[
                    {required:true,validator: validateAccount, trigger: 'blur' }
                ],
                // 姓名验证
                name:[
                    {required:true,validator: validateName, trigger: 'blur'}
                ],
                // 性别验证
                sex:[
                     {required:true,message: '请选择性别',trigger: 'change'}
                ],
                // 电话号码验证
                tel:[
                    {required:true,validator: validateTel, trigger: 'blur'}
                ],
                // 出生年月
                birthDate:[
                     {required:true,message: '请选择出生年月',trigger: 'blur'}
                ],
                 // 入职日期
                entryDate:[
                     {required:true,message: '请选择入职日期',trigger: 'blur'}
                ],
                // 员工分组
                staffGrounp:[
                     {required:true,message: '请选择员工分组',trigger: 'change'}
                ],
                // 密码验证
                password:[
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
                account:this.staffAddForm.account,
                password:this.staffAddForm.password,
                name:this.staffAddForm.name,
                sex: this.staffAddForm.sex,
                birthDate:this.staffAddForm.birthDate.toLocaleDateString(),
                entryDate:this.staffAddForm.entryDate.toLocaleDateString(),
                staffGrounp:this.staffAddForm.staffGrounp,
                tel:this.staffAddForm.tel
            };            
            alert("登录成功");
            // 路由跳转
            this.$router.push("/home/staffmanage")
          } else {
            return false;
          }
        });
      },
    }
}
</script>

<style lang="less">
    @import "./StaffAdd.less";
</style>
