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
}

exports.service = PetService;
