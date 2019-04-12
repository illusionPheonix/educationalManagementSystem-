<template>
    <div class="ClassManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>班级管理</span>
            </div>
            <div  class="text item">
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
                    :data="classTableData"
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
                    <!-- 班级名称 -->
                    <el-table-column
                    prop="classname"
                    label="班级名称"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 相关课程 -->
                    <el-table-column
                    prop="classcourse"
                    label="相关课程"
                    align="center"
                    >
                    </el-table-column>
                     <!--班型  -->
                    <el-table-column
                    prop="classset"
                    align="center"
                    label="班型"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--班级类别  -->
                    <el-table-column
                    prop="classtype"
                    align="center"
                    label="班级类别"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--周课次数  -->
                    <el-table-column
                    align="center"
                    prop="classcourses"
                    label="周课次数"
                    width="90"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--上课日期  -->
                    <el-table-column
                    prop="classdate"
                    align="center"
                    label="上课日期"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--上课时间  -->
                    <el-table-column
                    prop="classtime"
                    align="center"
                    label="上课时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--上课教室  -->
                    <el-table-column
                    prop="classroom"
                    align="center"
                    label="上课教室"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--上课老师  -->
                    <el-table-column
                    prop="teacher"
                    align="center"
                    label="上课老师"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 编辑 -->
                    <el-table-column label="操作" align="center" width="250">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.$index, scope.row)">
                            <span class="el-icon-edit"></span>
                            编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
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
                    :page-size="5"
                    layout="total, prev, pager, next, jumper"
                    :total="20">
                </el-pagination>
                <!-- 按钮组 -->
                <div style="margin-top: 20px">
                    <el-button type="info" @click="toggleSelection(classTableData)">全选</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            classTableData: [],
            multipleSelection: [],
            // 默认页
            currentPage: 1,
            keyword:""
        }
    },
    methods:{
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
            this.multipleSelection = val;
        },
         handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        // 分页函数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    // 生命周期钩子函数 vue实例对象创建完成 dom还没有生成
    created(){
        // 发送axios请求获得所有的数据
        this.request.get('/class/classmanage')
        .then(res=>{
            this.classTableData=res;
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style lang="less">
 @import "./ClassManage.less";
</style>
