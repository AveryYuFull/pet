<template>
    <div class='loginRegisterContainer'>
        <el-form ref='loginForm' label-width='100px' :model='loginForm' :rules='rules'>
            <el-form-item label='email' prop='email'>
                <el-input v-model='loginForm.email'></el-input>
            </el-form-item>
            <el-form-item label='密码' prop='password'>
                <el-input v-model='loginForm.password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='login(loginForm)'>登录</el-button>
            </el-form-item>
        </el-form>
        <el-form ref='registerForm' label-width='100px' :model='registerForm' :rules='rules'>
            <el-form-item label='email' prop='email'>
                <el-input v-model='registerForm.email'></el-input>
            </el-form-item>
            <el-form-item label='密码' prop='password'>
                <el-input type='password' v-model='registerForm.password'></el-input>
            </el-form-item>
            <el-form-item label='重复密码' prop='confirmPassword'>
                <el-input type='password' v-model='registerForm.confirmPassword'></el-input>
            </el-form-item>
            <el-form-item label='昵称' prop='nickname'>
                <el-input type='text' v-model='registerForm.nickname'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='register(registerForm)'>注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import validator from 'validator'
import PubSub from 'pubsub-js'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('userModule')

export default {
    created () {
       this.loginSuccessSub = PubSub.subscribe('loginSuccess', (topic, data) => {
           this.$router.push('/personal')
       })
       this.registerSuccessSub = PubSub.subscribe('registerSuccess', (topic, data) => {
           this.loginForm.email = data.email
           this.loginForm.password = data.password

           this.login(this.loginForm)
       })
    },
    beforeDestroy () {
        this.loginSuccessSub && PubSub.unsubscribe(this.loginSuccessSub)
        this.registerSuccessSub && PubSub.unsubscribe(this.registerSuccessSub)
    },
    data () {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                email: '',
                password: '',
                confirmPassword: '',
                nickname: ''
            },
            rules: {
                email: [{
                    required: true, message: '请输入email！', trigger: 'blur'
                }, {
                    validator: this.validateEmail, trigger: 'blur'  
                }],
                password: [{
                    required: true, message: '请输入账号密码！', trigger: 'blur'
                }, {
                    validator: this.validatePass, trigger: 'blur'
                }],
                confirmPassword: [{
                    required: true, message: '请重复输入账号密码！', trigger: 'blur'
                }, {
                    validator: this.validateConfirmPass, trigger: 'blur'
                }],
                nickname: [{
                    required: true, message: '请输入用户昵称！', trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        validateEmail (rule, value, callback) {
            if (!value.trim()) {
                callback(new Error('请输入email！'))
            } else {
                if (!validator.isEmail(value)) {
                    callback(new Error('请输入正确的email！'))
                }
            }
            callback()
        },
        validatePass (rule, value, callback) {
            if (!value.trim()) {
                callback(new Error('请输入账号密码！'))
            } else {
                if (!/[a-zA-Z0-9]{6,16}/.test(value)) {
                    callback(new Error('账号密码必须是在6-16位的数字或字母！'))
                }
            }
            callback()
        },
        validateConfirmPass (rule, value, callback) {
            if (!value.trim()) {
                callback(new Error('请重复输入用户密码！'))
            } else {
                if (value !== this.registerForm.password) {
                    callback(new Error('用户密码和重复用户密码必须一致！'))
                }
            }
            callback()
        },
        ...mapActions([
            'register', 'login'
        ])
    }
}
</script>

<style lang='less'>
.loginRegisterContainer {
    display: flex;
    justify-content: center;
}
</style>
