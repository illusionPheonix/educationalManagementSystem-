<template>
    <div class="GiftExchangeManage">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>礼品管理</span>
            </div>
            <div class="text item">
                <!-- 筛选器 -->
                <div class="filterBox">
                    <div class="time">
                        时间查询：
                        <el-date-picker
                            v-model="pickerTime"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small"
                            align="right">
                        </el-date-picker>
                    </div>
                    <!-- 关键字 -->
                    关键字：
                    <el-input type="text" v-model="keyword" auto-complete="off" size="small"></el-input>
                    （礼品名称，学生编号）
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
                   <!-- 订单号 -->
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    align="center"
                    >
                    </el-table-column>
                    <!-- 礼品名称 -->
                    <el-table-column
                    prop="giftName"
                    label="礼品名称"
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
                    <!--单个积分  -->
                    <el-table-column
                    prop="costScore"
                    align="center"
                    label="单个积分"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--数量  -->
                    <el-table-column
                    prop="saleNum"
                    align="center"
                    label="数量"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--支付积分  -->
                    <el-table-column
                    align="center"
                    prop="saleTotal"
                    label="支付积分"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--兑换学生  -->
                    <el-table-column
                    prop="stuName"
                    align="center"
                    label="兑换学生"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!--兑换时间  -->
                    <el-table-column
                    prop="saleTime"
                    align="center"
                    label="兑换时间"
                    show-overflow-tooltip>
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
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pickerTime:"",
            pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
                }
            }]
            },
            // 商品分类
            giftClassify:"",
            // 关键字
            keyword:"",
            giftTableData: [
                {
                orderNum:"100299300049",
                giftName:"小夜灯",
                saleTotal: "40",
                giftCode:"100920111",
                costScore:"20",
                stuName:"林佳佳",
                saleNum:"2",
                saleTime:"2019/03/05 12:00"
                },
                 {
                orderNum:"100299300049",
                giftName:"小夜灯",
                saleTotal: "40",
                giftCode:"100920111",
                costScore:"20",
                stuName:"林佳佳",
                saleNum:"2",
                saleTime:"2019/03/05 12:00"
                }
            ],
            multipleSelection: [],
            // 默认页
            currentPage: 1,
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
 @import "./GiftExchangeManage.less";
</style>
