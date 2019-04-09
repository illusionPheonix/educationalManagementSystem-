<template>
    <div class="top">
        <!-- 分栏 -->
        <el-row :gutter="20">
            <!-- 标题 -->
            <el-col :span="20">
                <h3><span class="el-icon-location"></span>成都新思维学校</h3>
            </el-col>
            <!-- 头像&设置 -->
            <el-col :span="4">
                <el-row :gutter="20">
                    <!-- 头像 -->
                    <el-col :span="8">
                        <div class="avatar">
                            <img :src="avatarUrl" alt="">
                        </div>
                        
                    </el-col>
                    <!-- 下拉菜单 -->
                    <el-col :span="16">
                        <el-dropdown @command="handleCommand" placement="top">
                            <span class="el-dropdown-link">
                                林黛玉<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                                <el-dropdown-item command="b">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                 </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            avatarUrl:require("./ldy.jpg")
        }
    },
    methods:{
        handleCommand:()=>{

        }
    }
}
</script>

<style lang="less">
    @import "./top.less";
</style>


