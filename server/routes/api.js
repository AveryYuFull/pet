const router = require('koa-router')()
const Service = require('../services')

router.get('/:name?/:method', async ctx => {
    const name = ctx.params.name || 'empty';
    const method = ctx.params.method || 'empty';
    let func = null
    try {
        func = new Service[name + 'Service']()[method]
    } catch (err)  {
        func = new Service['emptyService']()['out']
    }
    await func(ctx)
})

router.post('/:name?/:method', async (ctx) => {
    const name = ctx.params.name || 'empty';
    const method = ctx.params.method || 'empty';
    let func = null
    try {
        func = new Service[name + 'Service']()[method]
    } catch (err)  {
        func = new Service['emptyService']()['out']
    }
    await func(ctx)
})


module.exports = router;
