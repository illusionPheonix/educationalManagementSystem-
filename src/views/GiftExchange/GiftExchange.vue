<template>
    <div class="GiftExchange">
        <el-card class="box-card">
            <div slot="header" class="clearfix title">
                <span class="iconfont icon-guanli"></span>
                <span>礼品兑换</span>
            </div>
            <div class="text item">
                <div class="text item">
                    <el-form
                    :model="giftExchangeForm"
                    status-icon
                    :rules="rules"
                    ref="giftExchangeForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    size="small"
                    style="width:370px"
                    >
                        <!-- 礼品码 -->
                        <el-form-item label="礼品码" prop="giftCode">
                            <el-input type="text" v-model="giftExchangeForm.giftCode" auto-complete="on"></el-input>
                        </el-form-item>
                        <!-- 数量 -->
                        <el-form-item label="数量" prop="saleNum">
                            <el-input-number 
                            v-model="giftExchangeForm.saleNum" 
                            :min="1" 
                            label="描述文字">
                            </el-input-number>
                        </el-form-item>
                        <!-- 按钮组 -->
                        <div class="btn">
                            <el-form-item>
                            <el-button type="success" @click="submitForm('giftExchangeForm')">加入订单</el-button>
                            <el-button @click="resetForm('giftExchangeForm')">重置</el-button>
                        </el-form-item>
                        </div>       
                    </el-form>
                </div>
                <!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="giftTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-align="center"
                    show-summary
                    :summary-method="getSummaries"
                >
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
                    <!--礼品所需积分  -->
                    <el-table-column
                    prop="costScore"
                    align="center"
                    label="礼品所需积分"
                    show-overflow-tooltip>
                    </el-table-column>
                     <!--数量  -->
                    <el-table-column
                    prop="saleNum"
                    align="center"
                    label="数量"
                    show-overflow-tooltip>
                    </el-table-column>
                      <!--小计  -->
                    <el-table-column
                    prop="saleTotal"
                    align="center"
                    :span-method="getSummary"
                    show-summary
                    label="小计"
                    show-overflow-tooltip>
                    </el-table-column>
                    <!-- 编辑 -->
                    <el-table-column label="操作" align="center" width="250">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
                             <span class="el-icon-delete"></span>
                            删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 录入学生编号 -->
                <el-form
                :model="studentForm"
                status-icon
                :rules="rules"
                ref="studentForm"
                label-width="100px"
                class="demo-ruleForm"
                size="small"
                style="width:370px"
                >
                    <!-- 学生编号 -->
                    <el-form-item label="学生编号" prop="stuNum">
                        <el-input type="text" v-model="studentForm.stuNum" auto-complete="on"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 按钮组 -->
                <div style="margin-top: 20px">
                    <el-button type="success" size="small">确认提交</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
         // 礼品码验证
        const validateCode=(rule, value, callback) => {
            if(!value){
                callback(new Error("礼品码不能为空"));//输出错误提示
            }else if(!feesReg(value)){
                callback(new Error("礼品码必须为大于0的正整数"));//输出错误提示
            }else{
                 callback();//成功回调
            }
        }
        return{
            // 学生编号
            studentForm:{
                stuNum:""
            },
            // 商品交换
            giftExchangeForm:{
                giftCode:"",
                saleNum:""
            },
            // 商品分类
            giftClassify:"",
            // 关键字
            keyword:"",
            giftTableData: [
                {
                giftName:"小夜灯",
                giftCode:"100920111",
                costScore:"45",
                saleNum:"7",
                saleTotal:""
                }, 
                 {
                giftName:"小夜灯",
                giftCode:"100920111",
                costScore:"20",
                saleNum:"2",
                saleTotal:""
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
            // 验证规则
            rules:{
                // 礼品码验证
                giftCode:[
                     {required:true,validator: validateCode,trigger: 'blur'}
                ],
                // 数量验证
                saleNum:[
                    {required:true,message: '请选择礼品数量', trigger: 'change'}
                ],
                 // 数量验证
                stuNum:[
                    {required:true,message: '请填写学生编号', trigger: 'blur'}
                ]
            } ,
        }
    },
    methods:{
         handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
     //   合计
       getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          if(index === 1|index === 2){
            sums[index] = '';
            return;
          }
          let values = data.map(item => Number(item[column.property]));          
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' ';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
    },
    computed:{
        getSummary(){
            this.giftTableData.forEach(val=>{
               val.saleTotal = val.costScore*val.saleNum;            
            })    
      }
    }
}
</script>


<style lang="less">
 @import "./GiftExchange.less";
</style>
