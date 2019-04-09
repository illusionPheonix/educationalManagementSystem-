<template>
    <div class="asideNav">
        <!-- logo -->
        <div class="logo">
            <img :src="logo" >
        </div>
        <!-- 导航目录 -->
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#32446e"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            unique-opened
            >
            <!-- 工作台 -->
           <el-menu-item index="/home/workspace"><span class="el-icon-menu"></span>工作台</el-menu-item>
               <!-- 子菜单模板 -->
             <el-submenu :index="(index+1)+''" v-for="(menu,index) in menus" :key="index">
                <template slot="title">
                    <i :class="menu.icoClass"></i>
                    <span>{{menu.title}}</span>
                </template>
                <el-menu-item :index="submenu.path" v-for="(submenu,i) in menu.children" :key="i">{{submenu.subtitle}}</el-menu-item>
            </el-submenu>
        </el-menu>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            leftImg:require("@/assets/img/rabbit.gif"),
            logo:require("@/assets/img/qike_ogo.png"),
            // 导航数据
            menus:[
                // 销售管理
                {
                    icoClass:"el-icon-phone-outline",
                    title:"销售管理",
                    children:[
                        {path:"/home/salesmanage",subtitle:"客户管理"},
                        {path:"/home/clientadd",subtitle:"新增客户"}
                    ]
                },
                // 学生管理
                 {
                    icoClass:"el-icon-bell",
                    title:"学生管理",
                    children:[
                        {path:"/home/studentmanage",subtitle:"学员管理"},
                        {path:"/home/studentadd",subtitle:"新增学员"}
                    ]
                },
                // 班级管理
                {
                    icoClass:"el-icon-view",
                    title:"班级管理",
                    children:[
                        {path:"/home/classmanage",subtitle:"班级管理"},
                        {path:"/home/classadd",subtitle:"新增班级"}
                    ]
                },
                // 课程管理
                {
                    icoClass:"el-icon-tickets",
                    title:"课程管理",
                    children:[
                        {path:"/home/coursemanage",subtitle:"课程管理"},
                        {path:"/home/courseadd",subtitle:"新增课程"}
                    ]
                },
                // 礼品管理
                {
                    icoClass:"el-icon-view",
                    title:"礼品管理",
                    children:[
                        {path:"/home/giftmanage",subtitle:"礼品详情"},
                        {path:"/home/giftadd",subtitle:"新增礼品"},
                    ]
                },
                   // 礼品兑换
                {
                    icoClass:"el-icon-sold-out",
                    title:"礼品兑换",
                    children:[
                        {path:"/home/giftexchangemanage",subtitle:"礼品兑换管理"},
                        {path:"/home/giftexchange",subtitle:"礼品兑换"},
                    ]
                },
                 // 员工管理
                {
                    icoClass:"el-icon-service",
                    title:"员工管理",
                    children:[
                        {path:"/home/staffmanage",subtitle:"员工管理"},
                        {path:"/home/staffadd",subtitle:"新增员工"}
                    ]
                },
                  // 统计管理
                {
                    icoClass:"el-icon-date",
                    title:"统计管理",
                    children:[
                        {path:"/home/salestotal",subtitle:"销售统计"},
                        {path:"/home/goodstotal",subtitle:"礼品兑换统计"}
                    ]
                },
                  // 系统管理
                {
                    icoClass:"el-icon-info",
                    title:"系统管理",
                    children:[
                        {path:"/home/systeminfo",subtitle:"系统信息"},
                        {path:"/home/passwordmodify",subtitle:"修改密码"}
                    ]
                },
            ]
        }
    },
    methods:{
         handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="less">
   @import "./asideNav.less";
</style>
