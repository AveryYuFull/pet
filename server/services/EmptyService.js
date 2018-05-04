class EmptyService {
    async out (ctx) {
        ctx.response.body = '不好意思， 你访问的页面不存在'
    }
}

exports.service = EmptyService;