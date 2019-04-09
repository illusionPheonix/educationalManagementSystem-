<template>
    <div class="GiftManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>礼品管理</span>
            </div>
            <div class="text item">
                <!-- 筛选器 -->
                <div class="filterBox">
                    <!-- 分类 -->
                     <el-select v-model="giftClassify" placeholder="请选择分类"  size="small">
                        <el-option
                        v-for="item in giftClassifyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 关键字 -->
                    关键字：
                    <el-input type="text" v-model="keyword" auto-complete="off" size="small"></el-input>
                    （礼品名称，礼品码）
                    <el-button type="info" size="small">查询</el-button>    
                </div>
                <!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="giftTableData"
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
                    <!-- 礼品名称 -->
                    <el-table-column
                    prop="giftName"
                    label="礼品名称"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 礼品分类 -->
                    <el-table-column
                    prop="giftClassify"
                    label="礼品分类"
                    align="center"
                    >
                    </el-table-column>
                     <!--礼品码  -->
                    <el-table-column
                    prop="giftCode"
                    align="center"
                    label="礼品码"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--礼品所需积分  -->
                    <el-table-column
                    prop="costScore"
                    align="center"
                    label="礼品所需积分"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--礼品进价  -->
                    <el-table-column
                    align="center"
                    prop="price"
                    label="礼品进价"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--入库数量  -->
                    <el-table-column
                    prop="stockNum"
                    align="center"
                    label="入库数量"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--礼品单位  -->
                    <el-table-column
                    prop="giftUnit"
                    align="center"
                    label="礼品单位"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--是否促销  -->
                    <el-table-column
                    prop="isSale"
                    align="center"
                    label="是否促销"
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
                    <el-button type="info" @click="toggleSelection(giftTableData)">全选</el-button>
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
            // 商品分类
            giftClassify:"",
            // 关键字
            keyword:"",
            giftTableData: [
                {
                giftName:"小夜灯",
                giftClassify: "日用品",
                giftCode:"100920111",
                costScore:"20",
                price:"30",
                stockNum:"2",
                giftUnit:"个",
                isSale:"是",
                giftDesc:"睡眠神器"
                },
                
            ],
            multipleSelection: [],
            // 默认页
            currentPage: 1,
              // 商品分类
            giftClassifyOptions: [
                {
                value: '学习用品',
                label: '学习用品'
                }, {
                value: '食品类',
                label: '食品类'
                }, {
                value: '代金券',
                label: '代金券'
                }, {
                value: '玩具类',
                label: '玩具类'
                }, {
                value: '电子产品',
                label: '电子产品'
                }, {
                value: '日用品',
                label: '日用品'
            }
            ],  
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
 @import "./GiftManage.less";
</style>
