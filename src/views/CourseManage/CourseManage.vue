<template>
    <div class="CourseManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>课程管理</span>
            </div>
            <div class="text item">
                     <!-- 弹出编辑模态框 -->
                <el-dialog title="编辑课程信息" 
                :visible.sync="dialogFormVisible" 
                width="450px"
                top="5vh"
                modal-append-to-body
                >
                    <el-form :model="editFormData" size="small" ref="editFormData" :rules="rules">
                         <!-- 课程名称 -->
                        <el-form-item label="课程名称" prop="courseName">
                            <el-input type="text" v-model="editFormData.courseName" auto-complete="off"></el-input>
                        </el-form-item>
                        <!-- 总课时数 -->
                        <el-form-item label="总课时数" prop="coursePeriod">
                            <el-input-number 
                            v-model="editFormData.coursePeriod" 
                            :min="1" 
                            label="描述文字">
                            </el-input-number>
                        </el-form-item>
                        <!-- 课时时长 -->
                        <el-form-item label="课时总时长" prop="CourseLength">
                            <el-select v-model="editFormData.CourseLength" placeholder="请选择总课时时长">
                                <el-option label="30分钟" value="30分钟"></el-option>
                                <el-option label="45分钟" value="45分钟"></el-option>
                                <el-option label="60分钟" value="60分钟"></el-option>
                                <el-option label="70分钟" value="70分钟"></el-option>
                                <el-option label="90分钟" value="90分钟"></el-option>
                                <el-option label="120分钟" value="120分钟"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 单次课时费 -->
                        <el-form-item label="单次课时费" prop="courseFees" >
                            <el-input class="fees" type="text" v-model="editFormData.courseFees" auto-complete="off"></el-input>
                        </el-form-item>
                        <!-- 课程对象 -->
                        <el-form-item label="课程对象" prop="fitStudent">
                            <el-select v-model="editFormData.fitStudent" multiple placeholder="请选择课程适合对象">
                                <el-option
                                v-for="item in fitStudentOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 启用该课程 -->
                        <el-form-item label="启用该课程" prop="initiateMode ">
                            <el-switch
                                v-model="editFormData.initiateMode"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                >
                            </el-switch>
                        </el-form-item>
                        <!-- 课程介绍 -->
                        <el-form-item label="课程介绍" prop="courseDesc">
                            <el-input type="textarea" v-model="editFormData.courseDesc"></el-input>
                        </el-form-item>
                    </el-form>
                    <!-- 尾部 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                        <el-button type="success" @click="saveEdit" size="small">确认修改</el-button>
                    </div>
                </el-dialog>
                <!-- 筛选器 -->
                <div class="filterBox">
                    <!-- 关键字 -->
                    关键字：
                    <el-input type="text" v-model="keyword" auto-complete="off"  size="small"></el-input>
                    <el-button type="info"  size="small">查询</el-button>    
                </div>
                <!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="courseTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    header-align="center"
                >
                    <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                    </el-table-column>
                    <!-- 课程名称 -->
                    <el-table-column
                    prop="coursename"
                    label="课程名称"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 总课时数 -->
                    <el-table-column
                    prop="courseperiod"
                    label="总课时数"
                    align="center"
                    width="80"
                    >
                    </el-table-column>
                     <!--课时时长  -->
                    <el-table-column
                    prop="Courselength"
                    align="center"
                    label="课时时长"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--单次课时费  -->
                    <el-table-column
                    prop="coursefees"
                    align="center"
                    label="单次课时费"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--课程对象  -->
                    <el-table-column
                    align="center"
                    prop="fitstudent"
                    label="课程对象"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--是否启用该课程  -->
                    <el-table-column
                    prop="initiatemode"
                    align="center"
                    label="是否启用该课程"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--课程介绍  -->
                    <el-table-column
                    prop="coursedesc"
                    align="center"
                    label="课程介绍"
                    width="200"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 编辑 -->
                    <el-table-column label="操作" align="center" width="250">
                        <template slot-scope="scope">
                            <!-- 编辑 -->
                            <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row.id)">
                            <span class="el-icon-edit"></span>
                            编辑</el-button>
                            <!-- 删除 -->
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">
                             <span class="el-icon-delete"></span>
                            删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                     @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes,prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
                <!-- 按钮组 -->
                <div style="margin-top: 20px">
                    <el-button type="info" @click="batchDel">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { feesReg } from "@/utils/validator/validator.js"
export default {
    data(){
        // 课时费用验证
        const validatefees=(rule, value, callback) => {
            if(!value){
                callback(new Error("课时费用不能为空"));//输出错误提示
            }else if(!feesReg(value)){
                callback(new Error("课时费用必须为大于0的正整数"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        return{
            courseTableData: [],
             // 回填数据
            editFormData:{
                courseName:"",
                coursePeriod: "",
                courseFees:"",
                CourseLength:"",
                fitStudent:[],
                courseDesc:"",
                initiateMode:false
            },
             // 验证规则
            rules:{
               // 课程名称验证
                courseName:[
                    {required:true,message: '请输入课程名称', trigger: 'blur'}
                ],
                // 课时费用验证
                courseFees:[
                    {required:true,validator: validatefees, trigger: 'blur'}
                ],
                // 课程描述验证
                courseDesc:[
                     {required:true,message: '请输入课程描述',trigger: 'blur'}
                ]
            } ,
             // 课程选择
            fitStudentOptions: [{
                value: '小学一年级',
                label: '小学一年级'
            }, {
                value: '小学二年级',
                label: '小学二年级'
            }, {
                value: '小学三年级',
                label: '小学三年级'
            }, {
                value: '小学四年级',
                label: '小学四年级'
            }, {
                value: '小学五年级',
                label: '小学五年级'
            }, {
                value: '小学六年级',
                label: '小学六年级'
            }],  
           // 模态框是否可见
            dialogFormVisible:false,
            formLabelWidth:"80px",//模态框标签宽度
            multipleSelectionId: [],
            currentPage: 1,//当前页码
            total:0,//总页数
            pageSize:3,//每页显示数量
            keyword:"",
            // 保存id
            editId:""
        }
    },
    methods:{
         // 分页获取列表函数
        getListByPages(){
            // 收集参数
            let params={
                pageSize:this.pageSize,
                currentPage:this.currentPage
            }
            // 向后端发送请求
            this.request.get('/course/coursemanage',params)
            .then(res=>{
                // 接收后端发送回来的数据
                let {total,data}=res;
                // 赋值给页面总条数
                this.total=total;
                // 赋值给表格数据
                this.courseTableData=data;
                // 处理页面的false和true
                this.courseTableData.forEach(val=>{
                    if(val.initiatemode==="false"){
                        val.initiatemode="否"
                    }else if(val.initiatemode==="true"){
                        val.initiatemode="是"
                    }
                })
                // 判断当前页中数据是否为空，或当前页是否为第一页
                if(data.length===0&&this.currentPage!==1){
                    this.currentPage-=1;
                    // 调用自己
                    this.getListByPages();
                }
            })
            .catch(err=>{
                console.log(err);              
            })
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelectionId = val.map(val=>val.id);
        },
        // 修改回填
         handleEdit(id) {
            // 保存id
            this.editId=id;
            // 出现模态框
            this.dialogFormVisible=true;
            // 发送请求
            this.request.get('/course/editcourse',{id})
            .then(res=>{
                // 处理适合学生字符串成数组
                let fitstudent = res[0].fitstudent.split('/');   
                // 回填数据
                this.editFormData.courseName= res[0].coursename;
                this.editFormData.coursePeriod= parseInt(res[0].courseperiod);
                this.editFormData.courseFees= parseInt(res[0].coursefees);
                this.editFormData.CourseLength= res[0].Courselength;
                this.editFormData.fitStudent= fitstudent;
                this.editFormData.courseDesc= res[0].coursedesc;
                this.editFormData.initiateMode= initiatemode;                
            })
            .catch(err=>{
                console.log(err);
            })
        },
         // 保存数据
        saveEdit(){
            // 收集参数
            let params = {
                id:this.editId,
                coursename:this.editFormData.courseName,
                courseperiod: this.editFormData.coursePeriod+"课时",
                coursefees:this.editFormData.courseFees+"元/课时",
                Courselength:this.editFormData.CourseLength,
                fitstudent:this.editFormData.fitStudent.join('/'),
                coursedesc:this.editFormData.courseDesc,
                initiatemode:this.editFormData.initiateMode,
            };    
             // 判断：表单通过验证后发送请求到后台
            this.$refs.editFormData.validate(valid=>{
                if(valid){
                    // 发送请求
                     this.request.post('/course/savecourse',params)
                    .then(res=>{
                        // 接收后端传回来的数据
                        let { code,msg } = res;
                        if(code === 0){
                            // 显示是否修改界面
                            this.$confirm('是否确定修改该数据?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                title:"温馨提示",
                                lockScroll:false,//将 body 滚动锁定
                                roundButton:true
                            }).then(()=>{   
                                // 隐藏编辑框
                                this.dialogFormVisible = false;
                                // 弹出修改成功提示
                                this.$message({
                                    type:"success",
                                    message:msg
                                })
                                // 刷新列表
                                this.getListByPages();
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消修改'
                                });          
                            });
                        }else if(code === 1){
                            // 弹出失败提示
                            this.$message.error(msg);
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }else{
                    return false;     
                }
            }) 
        },
        // 删除
        handleDelete(id) {
            // 显示是否删除界面
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                title:"温馨提示",
                lockScroll:false,//将 body 滚动锁定
                roundButton:true
            }).then(()=>{     
                // 发送请求到后端
                this.request.get('/course/coursedel',{id})
                .then(res=>{
                    // 接收后端发送回来的数据
                    let {code,msg}=res;
                    if(code===0){
                        this.$message({
                            type:"success",
                            message:msg
                        })
                        // 请求数据
                        this.getListByPages();
                    }else if(code===1){
                        this.$message.error(msg);
                    }      
                })
                .catch(err=>{
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 批量删除
        batchDel(){
              // 判断是否勾选了数据
            if(this.multipleSelectionId.length>0){
                 // 弹出是否删除提示
            this.$confirm('是否批量删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                     // 收集参数
                    let params = {
                        ids:this.multipleSelectionId
                    }
                    // 向后端发送参数
                    this.request.get('/course/batchdel',params)
                    .then(res=>{
                        // 接收传回来数据
                        let {code,msg}=res;
                        if(code===0){
                            this.$message({
                                type:"success",
                                message:msg
                            })
                            // 刷新页面
                            this.getListByPages();
                        }else if(code === 1){
                            this.$message.error(msg);
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                     })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            }else{
                this.$message.error("你没有勾选任何选项！")
            }       
        },
        // 分页函数
        handleSizeChange(val) {
            // 赋值
            this.pageSize=val;
            this.getListByPages();
        },
        handleCurrentChange(val) {
            // 赋值
            this.currentPage=val;
            this.getListByPages();
        }
    },
    // 创建周期，钩子函数
    created(){
        this.getListByPages();
    }
}
</script>

<style lang="less">
 @import "./CourseManage.less";
</style>
