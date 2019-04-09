import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/login"
    },
    // 登录界面
    {
      path:"/login",
      component:()=>import("./views/Login/Login.vue"),
    },
    // 后台主界面
    {
      path:"/home",
      component:()=>import("./views/Home/home.vue"),
      redirect:"/home/systeminfo",
      children:[
        // 工作台
        {
          path:"/home/workspace",
          component:()=>import("./views/workspace/workspace.vue")
        },
        // 班级管理
        {
          path:"/home/classmanage",
          component:()=>import("./views/ClassManage/ClassManage.vue")
        },
        {
          path:"/home/classadd",
          component:()=>import("./views/ClassAdd/ClassAdd.vue")
        },
        // 课程管理
        {
          path:"/home/coursemanage",
          component:()=>import("./views/CourseManage/CourseManage.vue")
        },
        {
          path:"/home/courseadd",
          component:()=>import("./views/CourseAdd/CourseAdd.vue")
        },
        // 商品礼品管理
        {
          path:"/home/giftmanage",
          component:()=>import("./views/GiftManage/GiftManage.vue")
        },
        {
          path:"/home/giftadd",
          component:()=>import("./views/GiftAdd/GiftAdd.vue")
        },
        // 礼品兑换管理
        {
          path:"/home/giftexchange",
          component:()=>import("./views/GiftExchange/GiftExchange.vue")
        },
        {
          path:"/home/giftexchangemanage",
          component:()=>import("./views/GiftExchangeManage/GiftExchangeManage.vue")
        },
        // 销售管理
        {
          path:"/home/salesmanage",
          component:()=>import("./views/SalesManage/SalesManage.vue")
        },
        {
          path:"/home/clientadd",
          component:()=>import("./views/ClientAdd/ClientAdd.vue")
        },
        // 员工管理
        {
          path:"/home/staffmanage",
          component:()=>import("./views/StaffManage/StaffManage.vue")
        },
        {
          path:"/home/staffadd",
          component:()=>import("./views/StaffAdd/StaffAdd.vue")
        },
        // 学生管理
        {
          path:"/home/studentmanage",
          component:()=>import("./views/StudentManage/StudentManage.vue")
        },
        {
          path:"/home/studentadd",
          component:()=>import("./views/StudentAdd/StudentAdd.vue")
        },
        // 统计管理
        {
          path:"/home/salestotal",
          component:()=>import("./views/SalesTotal/SalesTotal.vue")
        },
        {
          path:"/home/goodstotal",
          component:()=>import("./views/GoodsTotal/GoodsTotal.vue")
        },
        // 系统管理
        {
          path:"/home/systeminfo",
          component:()=>import("./views/SystemInfo/SystemInfo.vue")
        },
        {
          path:"/home/passwordmodify",
          component:()=>import("./views/PasswordModify/PasswordModify.vue")
        }
      ]
    }
  ]
})
