<template>
    <el-dialog
        title='登录/注册'
        :visible.sync='dialogVisible'
        width='60%'>
        <component :is='currentView' :viewData='viewData'></component>
        <span slot='footer' class='dialog-footer'>
            <el-button @click='dialogVisible = false'>取消</el-button>
            <el-button type='primary' @click='dialogVisible = false'>确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
    props: {
        dialogVisibleProps: {
            type: Boolean,
            default: false
        },
        currentViewProps: {
            type: Object,
            default: null
        },
        viewData : {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            dialogVisible: this.dialogVisibleProps,
            currentView: this.currentViewProps
        }
    },
    created () {
       this.loginSuccessSub = PubSub.subscribe('loginSuccess', (topic, message) => {
            this.hideDialog()
        })
    },
    methods: {
        showDialog (view) {
            this.currentView = view
            this.dialogVisible = true
        },
        hideDialog () {
            this.dialogVisible = false
        }
    },
    beforeDestroy () {
        this.loginSuccessSub && PubSub.unsubscribe(this.loginSuccessSub)
    },
    watch: {
        dialogVisibleProps (newVal, oldVal) {
            this.dialogVisible = newVal
        },
        currentViewProps (newVal, oldVal) {
            this.currentView = newVal
        }
    }
}
</script>
