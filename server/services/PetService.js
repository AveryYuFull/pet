const PetModel = require('../models/PetModel')
const formidable = require('formidable')

class PetService {
    /**
     * 添加宠物信息 
     */
    async addPet (ctx) {
        const response = {
            code: 0,
            messgae: ''
        }
        const userBean = ctx.session.userBean
        const form = new formidable.IncomingForm()
        form.encoding = 'utf-8'
        form.uploadDir = './public/images/petPhoto'
        form.keepExtensions = true
        form.maxFieldsSize = 5 * 1024 * 1024
        const fields = await new Promise((resolve, reject) => {
            form.parse(ctx.req, (err, fields, files) => {
                if (err) {
                    console.log(err)
                    reslove(0)
                    return
                }
                fields.petPhoto = files.petPhoto.path.replace('public', '')
                resolve(fields)
            })
        })
        fields.uid = userBean.id
        fields.createdTime = new Date()
        PetModel.create(fields)
        ctx.response.body = response
    }

    /**
     * 获取宠物信息
     */
    async getPets (ctx) {
        const response = {
            code: 0,
            message: '',
            data: null
        }

        if (ctx.session.userBean) {
            const data = {}
            let currentPage = 1
            let pageSize = 3
            ctx.request.query.currentPage && (currentPage = ctx.request.query.currentPage)
            ctx.request.query.pageSize && (pageSize = ctx.request.query.pageSize)
            data.totalCount = await PetModel.count({ where: { uid: ctx.session.userBean.id }})
            data.petsInfo = await PetModel.findAll({where: { uid: ctx.session.userBean.id }, limit: parseInt(pageSize), offset: (currentPage - 1) * pageSize })
            response.data = data
        } else {
            response.message = '请先登录系统'
        }
        ctx.response.body = response
    }

    /**
     * 获取宠物信息总量的接口
     */
    async getPetsCount (ctx) {
        const response = {
            code: 0,
            message: '',
            data: null
        }

        if (ctx.session.userBean) {
            const data = {}
            data.count = await PetModel.count({ where: {uid: ctx.session.userBean.id}})
            response.data = data
        } else {
            response.message = '请先登录系统'
        }
        ctx.response.body  = response
    }

    /**
     * 删除宠物信息
     */
    async deletePetInfo (ctx) {
        const response = {
            code: 0,
            message: '',
            success: true
        }

        if (ctx.session.userBean) {
            const rs = await PetModel.destroy({where: {id: ctx.request.query.id, uid: ctx.session.userBean.id}})
            response.success = rs && rs >= 1
        } else {
            response.success = false
            response.message = '请先登录系统'
        }
        ctx.response.body = response
    }
}

exports.service = PetService;
