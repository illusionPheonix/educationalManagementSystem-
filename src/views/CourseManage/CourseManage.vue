<template>
    <div class="CourseManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>课程管理</span>
            </div>
            <div class="text item">
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
                    prop="courseName"
                    label="课程名称"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 总课时数 -->
                    <el-table-column
                    prop="coursePeriod"
                    label="总课时数"
                    align="center"
                    width="80"
                    >
                    </el-table-column>
                     <!--课时时长  -->
                    <el-table-column
                    prop="CourseLength"
                    align="center"
                    label="课时时长"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--单次课时费  -->
                    <el-table-column
                    prop="courseFees"
                    align="center"
                    label="单次课时费"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--课程对象  -->
                    <el-table-column
                    align="center"
                    prop="fitStudent"
                    label="课程对象"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--是否启用该课程  -->
                    <el-table-column
                    prop="initiateMode"
                    align="center"
                    label="是否启用该课程"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--课程介绍  -->
                    <el-table-column
                    prop="courseDesc"
                    align="center"
                    label="课程介绍"
                    width="200"
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
                    <el-button type="info" @click="toggleSelection(courseTableData)">全选</el-button>
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
            courseTableData: [
                {
                courseName:"小学奥数",
                coursePeriod: "120",
                CourseLength:"90",
                courseFees:"200元/课时",
                fitStudent:"一年级",
                initiateMode:"是",
                courseDesc:"该课程适合刚入门奥数的学生"
                },
                 {
                courseName:"小学奥数",
                coursePeriod: "120",
                CourseLength:"90",
                courseFees:"200元/课时",
                fitStudent:"一年级",
                initiateMode:"是",
                courseDesc:"该课程适合刚入门奥数的学生"
                },
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
 @import "./CourseManage.less";
</style>
