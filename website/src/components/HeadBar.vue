<template>
    <el-row>
        <el-col :span='2'>&nbsp;</el-col>
        <el-col :span='4' style='background: #f9fafc; font-size: 2em;'>
            <i class='el-icon-menu'></i>宠物空间
        </el-col>
        <el-col :span='10' style='background: #f9fafc;'>
            <el-input
                placeholder="请选择日期"
                suffix-icon="el-icon-search">
            </el-input>
        </el-col>
        <el-col :span='6' style='background: #f9fafc;'>
            <el-button type='success' @click='loginAndRegister' v-if='!isLogin'>登录/注册</el-button>
            <div v-else class='headNav'>
                <ul>
                    <li>主页</li>
                    <li>空间</li>
                    <li>寄养</li>
                    <li>医院</li>
                    <li>食物</li>
                    <li>注销</li>
                </ul>
            </div>
        </el-col>
        <el-col :span='2'>&nbsp;</el-col>
    </el-row>
</template>

<script>
import LoginRegister from './LoginRegister'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('userModule')

export default {
    computed: {
        ...mapState([
            'userInfo'
        ]),
        isLogin () {
            return this.userInfo && this.userInfo.id > 0
        }
    },
    methods: {
        loginAndRegister () {
            this.$parent.$refs.dialog.showDialog(LoginRegister)
        }
    }
}
</script>

<style lang='less'>
  .headNav ul {
      list-style-type: none;
      margin: 10px 0;
      li {
          display: inline-block;
      }
      li + li {
          margin-right: 10px;
      }
  }
</style>

