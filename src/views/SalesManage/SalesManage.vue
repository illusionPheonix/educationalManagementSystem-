<template>
    <div class="SalesManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>客户管理</span>
            </div>
            <div class="text item">
                  <!-- 弹出编辑模态框 -->
                <el-dialog title="编辑员工信息" 
                :visible.sync="dialogFormVisible" 
                width="450px"
                top="5vh"
                modal-append-to-body
                >
                    <el-form :model="editFormData" size="small" ref="editFormData" :rules="rules">
                         <!-- 客户姓名 -->
                          <el-form-item label="客户姓名" prop="name" >
                            <el-input type="text" v-model="editFormData.name" auto-complete="off"></el-input>
                        </el-form-item>
                         <!-- 性别 -->
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="editFormData.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                         <!-- 电话号码 -->
                        <el-form-item label="电话号码" prop="tel" >
                            <el-input type="text" v-model="editFormData.tel" auto-complete="off"></el-input>
                        </el-form-item>
                           
                         <!-- 意向课程 -->
                        <el-form-item label="意向课程" prop="courseData">
                            <el-select v-model="editFormData.courseData" multiple placeholder="请选择意向课程">
                                <el-option
                                v-for="item in courseOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 销售状态 -->
                        <el-form-item label="销售状态" prop="salesStatus">
                            <el-select v-model="editFormData.salesStatus" placeholder="请选择销售状态">
                                <el-option
                                v-for="item in salesStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 跟单人员 -->
                        <el-form-item label="跟单人员" prop="salesMan">
                            <el-select v-model="editFormData.salesMan" placeholder="请选择跟单人员">
                                <el-option
                                v-for="item in salesManOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 所在学校 -->
                        <el-form-item label="所在学校" prop="school">
                            <el-select v-model="editFormData.school" placeholder="请选择所在学校">
                                <el-option v-for="(item,index) in schoolOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 所在年级 -->
                        <el-form-item label="所在年级" prop="classData">
                            <el-select v-model="editFormData.classData" placeholder="请选择所在年级">
                                <el-option label="一年级" value="一年级"></el-option>
                                <el-option label="二年级" value="二年级"></el-option>
                                <el-option label="三年级" value="三年级"></el-option>
                                <el-option label="四年级" value="四年级"></el-option>
                                <el-option label="五年级" value="五年级"></el-option>
                                <el-option label="六年级" value="六年级"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 是否报班 -->
                        <el-form-item label="是否报班" prop="courseStatus">
                            <el-switch
                                v-model="editFormData.courseStatus"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="activeSalesStatus('clientAddForm.courseStatus')"
                                >
                            </el-switch>
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
                    <el-input type="text" v-model="keyword" auto-complete="off" size="small"></el-input>
                    <el-button type="info" size="small">查询</el-button>    
                </div>
                <!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="clientTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    header-align="center"
                >
                    <el-table-column
                    type="selection"
                    align="center"
                    width="30">
                    </el-table-column>
                    <!-- 客户姓名 -->
                    <el-table-column
                    prop="name"
                    label="客户姓名"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 性别 -->
                    <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    width="50"
                    >
                    </el-table-column>
                    <!--电话号码  -->
                    <el-table-column
                    prop="tel"
                    align="center"
                    label="电话号码"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--意向课程  -->
                    <el-table-column
                    prop="coursedata"
                    align="center"
                    label="意向课程"
                    width="150"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--销售状态  -->
                    <el-table-column
                    align="center"
                    prop="salestatus"
                    label="销售状态"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--所在学校  -->
                    <el-table-column
                    prop="school"
                    align="center"
                    label="所在学校"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--所在年级  -->
                    <el-table-column
                    prop="classdata"
                    align="center"
                    width="80"
                    label="所在年级"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--跟单人员  -->
                    <el-table-column
                    prop="saleman"
                    align="center"
                    label="跟单人员"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--是否报班  -->
                    <el-table-column
                    prop="coursestatus"
                    align="center"
                    label="是否报班"
                    width="80"
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
                    <el-button type="danger" @click="batchDel">批量删除</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入验证用户名函数
import { nameReg,telReg } from "@/utils/validator/validator.js"
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
         // 验证销售状态，如果已报班，将是否报班改为是
        const validateSales=(rule, value, callback) => {
            if(!value){
                callback(new Error("请选择销售状态"));//输出错误提示
            }else{
                if(value){
                    if(value==="已报班"){ 
                        this.$refs.editFormData.model.courseStatus=true;   
                    }else{
                         this.$refs.editFormData.model.courseStatus=false;   
                    }
                callback();//成功回调
                }
            }
        }
        return{
            // 表格数据
            clientTableData: [],
            // 回填数据
            editFormData:{
                name:"",
                sex: "",
                salesStatus:"",
                courseData:[],
                tel:"",
                school:"",
                classData:"",
                courseStatus:false,
                salesMan:""
            },
             // 验证规则
            rules:{
                // 姓名验证
                name:[
                    {required:true,validator:validateName, trigger: 'blur'}
                ],
                // 电话号码验证
                tel:[
                    {required:true,validator: validateTel, trigger: 'blur'}
                ],
                  // 销售状态
                salesStatus:[
                     {required:true,validator: validateSales,trigger: 'change'}
                ]
            } ,
            // 课程选择
            courseOptions: [
                {
                value: '少儿英语',
                label: '少儿英语'
                }, 
                {
                value: '小学奥数',
                label: '小学奥数'
                }, 
                {
                value: '小学数学同步',
                label: '小学数学同步'
                 },
                {
                value: '小学作文',
                label: '小学作文'
                 }
            ],  
            // 销售状态
            salesStatusOptions: [
                {
                value: '已报班',
                label: '已报班'
                }, {
                value: '意向强烈',
                label: '意向强烈'
                }, {
                value: '意向一般',
                label: '意向一般'
                },  {
                value: '下期班联系',
                label: '下期班联系'
                }, {
                value: '勿扰',
                label: '勿扰'
                }
            ], 
             // 跟单人员
            salesManOptions: [
                {
                value: '张三',
                label: '张三'
                 }, {
                value: '李四',
                label: '李四'
                 }, {
                value: '赵王',
                label: '赵王'
                }
            ], 
            // 学校数据
            schoolOptions: [
                {
                value: '成华区实验小学',
                label: '成华区实验小学'
                 }, {
                value: '华阳实验小学',
                label: '华阳实验小学'
                 }, {
                value: '泡桐树小学',
                label: '泡桐树小学'
                }, {
                value: '龙江路小学',
                label: '龙江路小学'
                }
            ], 
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
            this.request.get('/client/clientmanage',params)
            .then(res=>{
                // 接收后端发送回来的数据
                let {total,data}=res;
                // 赋值给页面总条数
                this.total=total;
                // 赋值给表格数据
                this.clientTableData=data;
                // 处理页面的false和true
                this.clientTableData.forEach(val=>{
                    if(val.coursestatus==="false"){
                        val.coursestatus="否"
                    }else if(val.coursestatus==="true"){
                        val.coursestatus="是"
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
            // 获取勾选框的id数组
            this.multipleSelectionId = val.map(val=>val.id);          
        },
        // 编辑回填事件
        handleEdit(id) {
            // 保存id
            this.editId=id;
            // 出现模态框
            this.dialogFormVisible=true;
            // 发送请求
            this.request.get('/client/clientedit',{id})
            .then(res=>{
                // 处理意向课程成数组
                let courseArr = res[0].coursedata.split('/');
                // 回填数据
                this.editFormData.name=res[0].name;
                this.editFormData.sex=res[0].sex;
                this.editFormData.salesStatus=res[0].salestatus;
                this.editFormData.courseData=courseArr;
                this.editFormData.tel=res[0].tel;
                this.editFormData.school=res[0].school;
                this.editFormData.classData=res[0].classdata;
                this.editFormData.courseStatus=res[0].coursedtatus;
                this.editFormData.salesMan=res[0].saleman;
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
                name:this.editFormData.name,
                sex: this.editFormData.sex,
                salesStatus:this.editFormData.salesStatus,
                courseData:this.editFormData.courseData.join('/'),
                tel:this.editFormData.tel,
                school:this.editFormData.school,
                classData:this.editFormData.classData,
                courseStatus:this.editFormData.courseStatus,
                salesMan:this.editFormData.salesMan
            };    
             // 判断：表单通过验证后发送请求到后台
            this.$refs.editFormData.validate(valid=>{
                if(valid){
                    // 发送请求
                     this.request.post('/client/saveclient',params)
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
        // 删除事件
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
                this.request.get('/client/clientdel',{id})
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
                    this.request.get('/client/batchdel',params)
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
            // 获取每页显示数量
            this.pageSize=val;
            // 刷新页面
            this.getListByPages();
        },
        handleCurrentChange(val) {
            // 获取当前页
            this.currentPage=val;
            // 刷新页面
            this.getListByPages();
        }
    },
    // 钩子函数
    created(){
        this.getListByPages()
    }
}
</script>

<style lang="less">
 @import "./SalesManage.less";
</style>
