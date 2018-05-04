const router = require('koa-router')()
const UserModel = require('../models/UserModel')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/getPets', async ctx => {
  const response = {
    success: false,
    message: ''
  }

  const session = ctx.session.userBean
  ctx.response.body = response
})

module.exports = router
