<template>
    <div class="StaffManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>员工管理</span>
            </div>
            <div  class="text item">
                <!-- 弹出编辑模态框 -->
                <el-dialog title="编辑员工信息" 
                :visible.sync="dialogFormVisible" 
                width="450px"
                top="10vh"
                modal-append-to-body
                >
                    <el-form :model="editFormData" size="small" ref="editFormData" :rules="rules">
                         <!-- 账号 -->
                        <el-form-item label="员工账号" :label-width="formLabelWidth" prop="account">
                            <el-input v-model="editFormData.account" auto-complete="off"></el-input>
                        </el-form-item>
                        <!-- 姓名 -->
                        <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="editFormData.name" auto-complete="off"></el-input>
                        </el-form-item>
                         <!-- 性别 -->
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="editFormData.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                         <!-- 电话号码 -->
                        <el-form-item label="电话号码" prop="tel">
                            <el-input type="text" v-model="editFormData.tel" auto-complete="off"></el-input>
                        </el-form-item>
                            <!-- 出生年月 -->
                        <el-form-item label="出生年月" prop="birthDate">
                            <el-date-picker
                                v-model="editFormData.birthDate"
                                type="date"
                                placeholder="选择出生年月"
                                format="yyyy 年 MM 月 dd 日">
                            </el-date-picker>
                        </el-form-item>
                        <!-- 入职时间 -->
                        <el-form-item label="入职时间" prop="entryDate">
                            <el-date-picker
                                v-model="editFormData.entryDate"
                                type="date"
                                placeholder="选择入职时间"
                                format="yyyy 年 MM 月 dd 日">
                            </el-date-picker>
                        </el-form-item>
                        <!-- 员工分组 -->
                        <el-form-item label="员工分组" prop="staffGrounp">
                            <el-select v-model="editFormData.staffGrounp" placeholder="请选择员工分组">
                            <el-option v-for="(val,index) in staffGrounps" :label="val.label" :value="val.value" :key="index"></el-option>
                            </el-select>
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
                    :data="staffTableData"
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
                    <!-- 姓名 -->
                    <el-table-column
                    prop="name"
                    label="姓名"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 账号 -->
                    <el-table-column
                    prop="account"
                    align="center"
                    label="账号"
                    >
                    </el-table-column>
                     <!-- 密码 -->
                    <el-table-column
                    prop="password"
                    align="center"
                    label="密码"
                    >
                    </el-table-column>
                    <!-- 性别 -->
                    <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    width="80"
                    >
                    </el-table-column>
                    <!--入职日期  -->
                    <el-table-column
                    prop="entrydate"
                    align="center"
                    label="入职日期"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--出生年月  -->
                    <el-table-column
                    prop="birthdate"
                    align="center"
                    label="出生年月"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--用户组  -->
                    <el-table-column
                    prop="staffgrounp"
                    align="center"
                    label="用户组"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--电话号码  -->
                    <el-table-column
                    prop="tel"
                    align="center"
                    label="电话号码"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 编辑 -->
                    <el-table-column label="操作" align="center" width="250">
                        <template slot-scope="scope">
                            <!-- 编辑按钮 -->
                            <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row.id)">
                            <span class="el-icon-edit"></span>
                            编辑</el-button>
                            <!-- 删除按钮 -->
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
                    <el-button type="danger" @click="batchDel">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入moment
import moment from "moment";
// 引入验证用户名函数
import { accountReg,nameReg,telReg } from "@/utils/validator/validator.js"
import { log } from 'util';
export default {
    data(){
        // 验证账号
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
        return{
            // 员工组
            staffGrounps:[
                {
                    label:"老师",
                    value:"老师"
                },
                {
                    label:"咨询师",
                    value:"咨询师"
                },
                {
                    label:"超级管理员",
                    value:"超级管理员"
                },
                {
                    label:"店长",
                    value:"店长"
                }
            ],
            // 表格中的数据
            staffTableData: [],
            // 修改框表单中的数据
            editFormData:{
                account:"",
                name:"",
                staffGrounp:"",
                sex:"",
                tel:"",
                birthDate:"",
                entryDate:""
            },
            // 验证规则
            rules:{
                account:[
                   {required:true,validator: validateAccount, trigger: 'blur' }
                ],
                name:[
                   {required:true,validator: validateName, trigger: 'blur' }
                ],
                tel:[
                   {required:true,validator: validateTel, trigger: 'blur' }
                ]
            },
            // 多选id框
            idSelection: [],
            // 当前页
            currentPage: 1,
            // 每页条数
            pageSize:3,
            // 数据总条数
            total:0,
            // 关键字
            keyword:"",
            // 模态框的标签宽度
            formLabelWidth:'80px',
            dialogFormVisible:false,//可见性
            // id值
            editId:"",
        }
    },
    methods:{
        // 请求列表函数
        requestStaffList(){
            this.request.get('/staff/Staffmanage')
            .then(res=>{
                this.staffTableData = res;
            })
            .catch(err=>{
                console.log(err); 
            })
        },
        // 根据分页码展示列表数据函数
        getStaffListByPage(){
            // 收集参数
            let params = {
                pageSize : this.pageSize,
                currentPage : this.currentPage
            }
            // 向后端发送参数请求数据
            this.request.get('/staff/stafflistbypage',params)
            .then(res=>{
                // 接收后端发回来的数据
                let { data,total } = res;
                // 赋值数据总条数
                this.total = total;
                // 赋值数据给表格
                this.staffTableData =data;
                // 判断返回回来的数据条数
                if(data.length===0&&this.currentPage!==1){
                    this.currentPage-=1;
                    // 调用自己
                    this.getStaffListByPage();
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        // 取消选择函数
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        // 勾选选项卡触发的事件
        handleSelectionChange(val) {
            // 获取选择的id数组
            this.idSelection = val.map(value=>value.id);            
        },
        // 编辑事件
        handleEdit(id) {
            // 弹出编辑模态框
            this.dialogFormVisible=true;
            // 保存id值
            this.editId = id;
            // 回填数据
            // 向后台发送id请求数据
            this.request.get('/staff/staffedit',{id})
            .then(res=>{
                // 回填返回回来的数据
               this.editFormData.account=res[0].account;
               this.editFormData.name=res[0].name;
               this.editFormData.staffGrounp=res[0].staffgrounp;
               this.editFormData.sex=res[0].sex;
               this.editFormData.tel=res[0].tel;
               this.editFormData.birthDate=res[0].birthdate;
               this.editFormData.entryDate=res[0].entrydate;
            })
            .catch(err=>{
                console.log(err); 
            })
        },
        // 保存修改
        saveEdit(){
            // 获取当前数据的id值
            let id = this.editId;
            // 收集参数
            let params = {
               id,
               account : this.editFormData.account,
               name : this.editFormData.name,
               staffgrounp : this.editFormData.staffGrounp,
               sex : this.editFormData.sex,
               tel : this.editFormData.tel,
               birthdate : moment(this.editFormData.birthDate).format("YYYY/MM/DD"),
               entrydate : moment(this.editFormData.entryDate).format("YYYY/MM/DD")
            } 
            // 判断：表单通过验证后发送请求到后台
            this.$refs.editFormData.validate(valid=>{
                if(valid){
                    // 发送请求
                     this.request.post('/staff/staffeditsave',params)
                    .then(res=>{
                        // 接收后端传回来的数据
                        let { code,msg } = res;
                        if(code === 0){
                            // 显示是否删除界面
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
                                this.getStaffListByPage();
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
        // 删除事件
        handleDelete(id) {
            // 弹出是否确定删除提示模态框
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                title:"温馨提示",
                lockScroll:false,//将 body 滚动锁定
                roundButton:true
            }).then(() => {
                   // 获取id
                let params={
                    id
                }
                // 发送id到后台请求数据
                this.request.get('/staff/staffdel',params)
                .then(res=>{
                    // 接收后台传过来的数据
                    let { code,msg } = res;
                    // 判断状态码
                    if(code === 0){
                        // 弹出成功提示
                        this.$message({
                            type:"success",
                            message:msg
                        })
                        // 刷新列表
                        this.getStaffListByPage();
                    }else if(code === 1){
                        // 弹出失败提示
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
            if(this.idSelection.length>0){
                 // 弹出是否删除提示
            this.$confirm('是否批量删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                        // 获取id们
                    let idArr = this.idSelection;
                    // 收集参数
                    let params = {
                        id:idArr
                    }
                    // 向后端发送参数
                    this.request.get('/staff/batchdel',params)
                    .then(res=>{
                        // 接收后端传过来的数据
                        let { code,msg } = res;
                        if(code===0){
                            // 成功提示
                            this.$message({
                                type:"success",
                                message:msg
                            })
                            // 刷新页面
                            this.getStaffListByPage();
                        }else if(code === 1){
                            // 失败提示
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
            // 保存每页条数
            this.pageSize=val;
            this.getStaffListByPage();
        },
        handleCurrentChange(val) {
            // 保存当前页码
            this.currentPage=val;  
            this.getStaffListByPage();
        }
    },
    // 钩子函数
    created(){
       this.getStaffListByPage();
    }
}
</script>

<style lang="less">
 @import "./StaffManage.less";
</style>
