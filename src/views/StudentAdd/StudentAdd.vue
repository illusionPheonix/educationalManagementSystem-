<template>
  <div class="StudentAdd">
    <!-- 面板 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix title">
            <span class="el-icon-d-arrow-right"></span>
            <span>新增学员</span>
        </div>
        <div class="text item">
            <el-form
            :model="studentAddForm"
            status-icon
            :rules="rules"
            ref="studentAddForm"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
            style="width:400px"
            >
                <!-- 姓名 -->
                <el-form-item label="学生姓名" prop="name">
                        <el-input type="text" v-model="studentAddForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <!-- 性别 -->
                <el-form-item label="学生性别" prop="sex">
                    <el-radio-group v-model="studentAddForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 电话号码 -->
                <el-form-item label="电话号码" prop="tel">
                        <el-input type="text" v-model="studentAddForm.tel" auto-complete="off"></el-input>
                </el-form-item>
                    <!-- 出生年月 -->
                <el-form-item label="出生年月" prop="birthDate">
                        <el-date-picker
                            v-model="studentAddForm.birthDate"
                            type="date"
                            placeholder="选择出生年月"
                            format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                </el-form-item>
                <!-- 课程选择 -->
                <el-form-item label="课程选择" prop="courseDate">
                    <el-select v-model="studentAddForm.courseDate" multiple placeholder="请选择课程">
                        <el-option
                        v-for="item in courseOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <!-- 所在学校 -->
                <el-form-item label="所在学校" prop="school">
                    <el-select v-model="studentAddForm.school" placeholder="请选择所在学校">
                        <el-option label="成华区实验小学" value="成华区实验小学"></el-option>
                        <el-option label="华阳实验小学" value="华阳实验小学"></el-option>
                        <el-option label="泡桐树小学" value="泡桐树小学"></el-option>
                        <el-option label="龙江路小学" value="龙江路小学"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 所在年级 -->
                <el-form-item label="所在年级" prop="classData">
                    <el-select v-model="studentAddForm.classData" placeholder="请选择所在年级">
                        <el-option label="一年级" value="一年级"></el-option>
                        <el-option label="二年级" value="二年级"></el-option>
                        <el-option label="三年级" value="三年级"></el-option>
                        <el-option label="四年级" value="四年级"></el-option>
                        <el-option label="五年级" value="五年级"></el-option>
                        <el-option label="六年级" value="六年级"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 初始积分 -->
                <el-form-item label="初始积分" prop="score">
                    <el-input type="text" v-model="studentAddForm.score" auto-complete="on"></el-input>
                </el-form-item>
                <!-- 按钮组 -->
                <el-form-item>
                    <el-button type="info" @click="submitForm('studentAddForm')">添加</el-button>
                    <el-button @click="resetForm('studentAddForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
  </div>
</template>

<script>
// 引入验证用户名函数
import { accountReg,passwordReg,nameReg,telReg,feesReg } from "@/utils/validator/validator.js"
export default {
    data(){
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
         // 积分验证
        const validateScore=(rule, value, callback) => {
            if(!value){
                callback(new Error("积分不能为空"));//输出错误提示
            }else if(!feesReg(value)){
                callback(new Error("积分必须为大于0的正整数"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        return{
            // 表单数据
            studentAddForm:{
                name:"",
                sex: "",
                birthDate:"",
                courseDate:[],
                tel:"",
                school:"",
                classData:"",
                score:""
            },
            // 验证规则
            rules:{
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
                // 课程选择
                courseDate:[
                     {required:true,message: '请选择课程',trigger: 'change'}
                ],
                // 学校
                school:[
                     {required:true,message: '请选择学生学校',trigger: 'change'}
                ],
                // 年级
                classData:[
                     {required:true,message: '请选择学生所在年级',trigger: 'change'}
                ],
                // 年级
                score:[
                     {required:true,validator: validateScore,trigger: 'blur'}
                ]
            } ,
            // 课程选择
            courseOptions: [{
                value: '少儿英语',
                label: '少儿英语'
            }, {
                value: '小学奥数',
                label: '小学奥数'
            }, {
                value: '小学数学同步',
                label: '小学数学同步'
            }, {
                value: '小学作文',
                label: '小学作文'
            }],  
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
                name:this.studentAddForm.name,
                sex: this.studentAddForm.sex,
                birthDate:this.studentAddForm.birthDate.toLocaleDateString(),
                courseDate:this.studentAddForm.courseDate.join("-"),
                tel:this.studentAddForm.tel,
                school:this.studentAddForm.school,
                classData:this.studentAddForm.classData,
                score:this.studentAddForm.score
            };     
            console.log(params);
                   
            alert("登录成功");
            // 路由跳转
            this.$router.push("/home/studentmanage")
          } else {
            return false;
          }
        });
      },
    }
}
</script>

<style lang="less">
    @import "./StudentAdd.less";
</style>
