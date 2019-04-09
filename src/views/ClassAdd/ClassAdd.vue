<template>
  <div class="ClassAdd">
    <!-- 面板 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix title">
            <span class="el-icon-d-arrow-right"></span>
            <span>新增班级</span>
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
                <!-- 班级名称 -->
                <el-form-item label="班级名称" prop="className">
                        <el-input type="text" v-model="studentAddForm.className" auto-complete="off"></el-input>
                </el-form-item>
                <!-- 相关课程 -->
                <el-form-item label="相关课程" prop="classCourse">
                    <el-select v-model="studentAddForm.classCourse" placeholder="请选择相关课程">
                        <el-option 
                        v-for="(item,index) in courseOptions"
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                  <!--班型 -->
                <el-form-item label="班型" prop="classSet">
                    <el-select v-model="studentAddForm.classSet" placeholder="请选择班型">
                        <el-option 
                        v-for="(item,index) in classSetOptions"
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <!--班级类别 -->
                <el-form-item label="班级类别" prop="classType">
                    <el-radio-group v-model="studentAddForm.classType">
                    <el-radio label="春季班"></el-radio>
                    <el-radio label="暑假班"></el-radio>
                    <el-radio label="秋季班"></el-radio>
                    <el-radio label="寒假班"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 周课次数 -->
                <el-form-item label="周课次数" prop="classCourses">
                    <el-input-number 
                    v-model="studentAddForm.classCourses" 
                    :min="1" 
                    :max="10"
                    label="描述文字">
                    </el-input-number>
                </el-form-item>
                 <!-- 每周上课日期 -->
                <el-form-item label="上课日期" prop="classDate">
                     <el-select v-model="studentAddForm.classDate" multiple placeholder="请选择每周上课日期">
                        <el-option 
                        v-for="(item,index) in weekOptions"
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 每天上课时间 -->
                <el-form-item label="上课时间" prop="classTime">
                     <el-time-select
                        v-model="studentAddForm.classTime"
                        :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '20:00'
                        }"
                        placeholder="选择上课时间">
                        </el-time-select>
                </el-form-item>
                <!-- 上课教室 -->
                <el-form-item label="上课教室" prop="classroom">
                     <el-select v-model="studentAddForm.classroom" placeholder="请选择上课教室">
                        <el-option 
                        v-for="(item,index) in classroomOptions"
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 上课老师 -->
                <el-form-item label="上课老师" prop="teacher">
                     <el-select v-model="studentAddForm.teacher" placeholder="请选择上课老师">
                        <el-option 
                        v-for="(item,index) in teacherOptions"
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                    </el-select>
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
export default {
    data(){
        return{
            // 表单数据
            studentAddForm:{
                className:"",
                classCourse: "",
                classSet:"",
                classType:"",
                classCourses:"",
                classDate:[],
                classTime:"",
                classroom:"",
                teacher:""
            },
            // 验证规则
            rules:{
                // 班级名称验证
                className:[
                    {required:true,message: '请填写班级名称', trigger: 'blur'}
                ],
                // 相关课程验证
                classCourse:[
                     {required:true,message: '请选择性别',trigger: 'change'}
                ],
                // 班型验证
                classSet:[
                    {required:true,message: '请选择班型', trigger: 'change'}
                ],
                // 班级类型验证
                classType:[
                     {required:true,message: '请选择班级类型',trigger: 'change'}
                ],
                // 周课次数
                classCourses:[
                     {required:true,message: '请选择周课次数',trigger: 'change'}
                ],
                // 上课日期
                classDate:[
                     {required:true,message: '请选择上课日期',trigger: 'change'}
                ],
                // 教室验证
                classroom:[
                     {required:true,message: '请选择上课教室',trigger: 'change'}
                ],
                 // 老师验证
                teacher:[
                     {required:true,message: '请选择上课老师',trigger: 'change'}
                ],
                  // 上课时间
                classTime:[
                     {required:true,message: '请选择上课时间',trigger: 'change'}
                ]
            } ,
            // 课程选择
            courseOptions: [
                {
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
                }
            ], 
            // 班型选择
            classSetOptions:[
                {
                    label:"4~8人精品班",
                    value:"4~8人精品班"
                },
                {
                    label:"9~20人小班",
                    value:"9~20人小班"
                },
                 {
                    label:"20~40人大班",
                    value:"20~40人大班"
                },
            ],
            // 星期选择
            weekOptions:[
                {
                    label:"星期日",
                    value:"星期日"
                },
                {
                    label:"星期一",
                    value:"星期一"
                },
                {
                    label:"星期二",
                    value:"星期二"
                },
                {
                    label:"星期三",
                    value:"星期三"
                },
                {
                    label:"星期四",
                    value:"星期四"
                },
                {
                    label:"星期五",
                    value:"星期五"
                },
                {
                    label:"星期六",
                    value:"星期六"
                },

            ],
              // 教室选择
            classroomOptions:[
                {
                    label:"教室一",
                    value:"教室一"
                },
                {
                    label:"教室二",
                    value:"教室二"
                },
                {
                    label:"教室三",
                    value:"教室三"
                },
                {
                    label:"教室四",
                    value:"教室四"
                },
                {
                    label:"教室五",
                    value:"教室五"
                },
                {
                    label:"教室六",
                    value:"教室六"
                },
                {
                    label:"教室七",
                    value:"教室七"
                },

            ],
              // 教师选择
            teacherOptions:[
                {
                    label:"张老师",
                    value:"张老师"
                },
                {
                    label:"王老师",
                    value:"王老师"
                },
                {
                    label:"李老师",
                    value:"李老师"
                },
                {
                    label:"马老师",
                    value:"马老师"
                },
                {
                    label:"陈老师",
                    value:"陈老师"
                }
            ]
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
                className:this.studentAddForm.className,
                classCourse:this.studentAddForm.classCourse,
                classSet:this.studentAddForm.classSet,
                classType: this.studentAddForm.classType,
                classCourses:this.studentAddForm.classCourses,
                classDate:this.studentAddForm.classDate,
                classTime:this.studentAddForm.classTime,
                classroom:this.studentAddForm.classroom,
                teacher:this.studentAddForm.teacher
            };    
            console.log(params);
                    
            alert("登录成功");
            // 路由跳转
            this.$router.push("/home/classmanage")
          } else {
            return false;
          }
        });
      },
    }
}
</script>

<style lang="less">
    @import "./ClassAdd.less";
</style>
