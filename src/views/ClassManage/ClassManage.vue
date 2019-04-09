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
                    prop="className"
                    label="班级名称"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 相关课程 -->
                    <el-table-column
                    prop="classCourse"
                    label="相关课程"
                    align="center"
                    >
                    </el-table-column>
                     <!--班型  -->
                    <el-table-column
                    prop="classSet"
                    align="center"
                    label="班型"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--班级类别  -->
                    <el-table-column
                    prop="classType"
                    align="center"
                    label="班级类别"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--周课次数  -->
                    <el-table-column
                    align="center"
                    prop="classCourses"
                    label="周课次数"
                    width="90"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--上课日期  -->
                    <el-table-column
                    prop="classTime"
                    align="center"
                    label="上课日期"
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
            classTableData: [
                {
                className:"少儿英语精英版",
                classCourse: "剑桥英语",
                classSet:"4~8人精品班",
                classType:"春季班",
                classCourses:"2",
                classDate:["星期一","星期三"],
                classTime:"19:00",
                classroom:"教室二",
                teacher:"张老师"
                },
                {
                className:"少儿英语精英版",
                classCourse: "剑桥英语",
                classSet:"4~8人精品班",
                classType:"春季班",
                classCourses:"2",
                classDate:["星期一","星期三"],
                classTime:"19:00",
                classroom:"教室二",
                teacher:"张老师"
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
 @import "./ClassManage.less";
</style>
