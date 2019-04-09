<template>
    <div class="SystemInfo">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>系统信息</span>
            </div>
            <div class="text item">
               <el-alert
                :title="tips1"
                type="success">
               </el-alert>
               <el-alert
                :title="tips2"
                type="warning">
               </el-alert>
                <el-alert
                :title="tips3"
                type="success">
               </el-alert>
               <div class="range">
                   <el-card class="box-card">
                        <div slot="header" class="clearfix title">
                            <span class="iconfont icon-guanli"></span>
                            <span>销售排名</span>
                        </div>
                        <div class="text item">
                              <el-table
                                :data="salesRange"
                                style="width: 100%">
                                <el-table-column
                                    prop="num"
                                    label="排名">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名">
                                </el-table-column>
                                <el-table-column
                                    prop="sales"
                                    label="销量">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                    <!-- 积分排名 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix title">
                            <span class="iconfont icon-guanli"></span>
                            <span>积分排名</span>
                        </div>
                        <div class="text item">
                              <el-table
                                :data="scoreRange"
                                style="width: 100%">
                                <el-table-column
                                    prop="num"
                                    label="排名">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名">
                                </el-table-column>
                                <el-table-column
                                    prop="scores"
                                    label="总积分">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
               </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tips1:"本月报班人数20人，其中数学班8人，语文班10人，英语班2人",
            tips2:"本月英语退班人数3人",
            tips3:"英语班本月表现较好",
            salesRange:[
                {
                    num:"1",
                    name:"张三",
                    sales:"10"
                },
                 {
                    num:"2",
                    name:"赵王",
                    sales:"7"
                },
                 {
                    num:"3",
                    name:"貂蝉",
                    sales:"4"
                }
            ],
             scoreRange:[
                {
                    num:"1",
                    name:"李媛媛",
                    scores:"2000"
                },
                {
                    num:"2",
                    name:"刘语熙",
                    scores:"1890"
                },
                {
                    num:"3",
                    name:"周长涛",
                    scores:"1100"
                },
            ]

        }
    }
}
</script>

<style lang="less">
 @import "./SystemInfo.less";
</style>
