<template>
    <div class="StudentManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>学生管理</span>
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
                    :data="studentTableData"
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
                    label="学生姓名"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 性别 -->
                    <el-table-column
                    prop="sex"
                    label="学生性别"
                    align="center"
                    width="80"
                    >
                    </el-table-column>
                     <!--出生年月  -->
                    <el-table-column
                    prop="birthDate"
                    align="center"
                    label="出生年月"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--电话号码  -->
                    <el-table-column
                    prop="tel"
                    align="center"
                    label="电话号码"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--课程选择  -->
                    <el-table-column
                    align="center"
                    prop="courseDate"
                    label="课程选择"
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
                    prop="classData"
                    align="center"
                    label="所在年级"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--积分  -->
                    <el-table-column
                    prop="score"
                    align="center"
                    label="积分"
                    width="60"
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
                    <el-button type="info" @click="toggleSelection(studentTableData)">全选</el-button>
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
            studentTableData: [
                {
                name:"张三",
                sex: "女",
                birthDate:"2012-01-02",
                tel:"13489090909",
                courseDate:["小学奥数","少儿英语"].join("-"),
                school:"成华区实验小学",
                classData:"一年级",
                score:"10"
                },
                 {
                name:"张三",
                sex: "女",
                birthDate:"2013-07-02",
                tel:"13489090909",
                courseDate:["小学奥数","少儿英语"].join("-"),
                school:"成华区实验小学",
                classData:"一年级",
                score:"20"
                }
            ],
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
}
</script>

<style lang="less">
 @import "./StudentManage.less";
</style>
