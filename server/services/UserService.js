const UserModel = require('../models/UserModel')

class UserService {
    async register (ctx) {
        /**
         * 0. 数据库出错
         * 1. 注册成功
         * 2. 邮件重复
         * 3. 昵称重复
         */
        const response = {
            code: 0,
            message: ''
        }

        try {
            const userInfo = await UserModel.create({
                email: ctx.request.body.email,
                password: ctx.request.body.password,
                nickname: ctx.request.body.nickname,
                createtime: new Date().getTime()
            })
            response.code = 1            
        } catch (err) {
            let errMsg = err.errors[0].message
            if (errMsg.includes('emailuniq')) {
                response.code = 2
            } else if (errMsg.includes('nichenguniq')) {
                response.code = 3
            } else {
                response.code = 0
            }
        }
        ctx.response.body = response
    }

    async login (ctx) {
        const response = {
            success: false,
            message: '',
            data: {}
        }

        const userInfo = await UserModel.findOne({where: {
            email: ctx.request.body.email,
            password: ctx.request.body.password
        }})
        if (userInfo) {
            ctx.session.userBean = userInfo
            response.success = true
            response.data = userInfo
        } else {
            response.success = false
            response.message = '登录失败'
        }
        ctx.response.body = response
    }
}

exports.service = UserService;