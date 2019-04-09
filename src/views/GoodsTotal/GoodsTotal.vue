<template>
    <div class="GoodsTotal">
          <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-xiaoshoubaobiao"></span>
                <span>礼品兑换统计</span>
            </div>
            <div class="text item">
               <!-- 筛选器 -->
                    <div class="time">
                        时间：
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
                        <el-button type="info" size="small">查询</el-button>   
                    </div>
              
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less">
 @import "./GoodsTotal.less";
</style>
