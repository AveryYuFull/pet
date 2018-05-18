<template>
    <div class='container'>
        <el-row>
            <el-col :span='2'>&nbsp;</el-col>
            <el-col :span='4' class='menu'>
                <el-menu 
                    default-active='1'
                    class='el-menu-vertical-demo'
                    background-color='#545c64'
                    text-color='#fff'
                    active-text-color='#ffd04b'>
                    <el-menu-item index='1'>
                        <i class='el-icon-setting'></i>
                        <span slot='title'>宠物信息</span>
                    </el-menu-item>
                    <el-menu-item index='2'>
                        <i class='el-icon-setting'></i>
                        <span slot='title'>宠物相册</span>
                    </el-menu-item>
                    <el-menu-item index='3'>
                        <i class='el-icon-setting'></i>
                        <span slot='title'>宠物日志</span>
                    </el-menu-item>
                    <el-menu-item index='4'>
                        <i class='el-icon-setting'></i>
                        <span slot='title'>宠物朋友圈</span>
                    </el-menu-item>
                    <el-menu-item index='5'>
                        <i class='el-icon-setting'></i>
                        <span slot='title'>问答</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span='16'>
                <pet-form v-if='petsInfoCount <= 0'></pet-form>
                <pet-info :count='petsInfoCount' v-else></pet-info>
            </el-col>
            <el-col :span='2'>&nbsp;</el-col>
        </el-row>
    </div>
</template>

<script>
import PetForm from '../components/PetForm'
import PetInfo from '../components/PetInfo'
import config from '../configs/config'
import myAxios from '../common/myAxios'
import PubSub from 'pubsub-js'

export default {
    created () {
        this.getPetsCount()

        this.loginSuccessSub = PubSub.subscribe('loginSuccess', (topic, data) => {
            this.getPetsCount()
        })
    },
    data () {
        return {
            petsInfoCount: 0,
        }
    },
    methods: {
        getPetsCount () {
            myAxios.get(config.GET_PETS_COUNT, (res) => {
                this.petsInfoCount = res.data.count
            })
        }
    },
    components: {
        'pet-form': PetForm,
        'pet-info': PetInfo
    },
    beforeDestroy () {
        this.loginSuccessSub && PubSub.unsubscribe(this.loginSuccessSub)
    }
}
</script>

<style lang='less' scoped>
.container {
    .menu {
        .el-menu-item {
            text-align: left;
        }
    }
}
</style>
