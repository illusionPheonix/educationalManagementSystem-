<template>
    <div class="home">
       <el-container>
            <el-aside width="200px">
                <AsideNav></AsideNav>
            </el-aside>
            <el-container>
                <!-- 头 -->
                <el-header>
                    <Top></Top>
                </el-header>
                <!-- 主要内容 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view></router-view>
                </el-main>
                <!-- 尾部 -->
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// 引入导航子模块
import AsideNav from "@/components/asideNav/asideNav.vue";
import Top from "@/components/top/top.vue";
import Bottom from "@/components/bottom/bottom.vue";
export default {
    // 注册子模块
    components:{
         AsideNav,
         Top,
         Bottom,
    }
}
</script>

<style lang="less">
 @import "./home.less";
</style>
