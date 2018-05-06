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
                <div class='mainContent'>
                    <div class='basicInfo'>
                        <div class='left'>
                            <el-input placeholder='请输入宠物昵称' v-model='petInfo.nickname' clearable></el-input>
                            <el-select v-model='petInfo.petType' clearable placeholder='请输入宠物类型'>
                                <el-option
                                    v-for='type in petInfo.petTypes'
                                    :key='type.value'
                                    :label='type.label'
                                    :value='type.value'></el-option>
                            </el-select>
                            <el-input placeholder='请输入宠物品种' v-model='petInfo.petBreed' clearable></el-input>
                            <div class='sex'>
                                <el-radio v-model='petInfo.sex' label='male'>雄</el-radio>
                                <el-radio v-model='petInfo.sex' label='female'>雌</el-radio>
                            </div>
                            <el-input placeholder='请输入宠物年龄' v-model='petInfo.age' clearable></el-input>
                        </div>
                        <div class='right'>
                            <vue-img-inputer v-model="petInfo.petPhoto" theme="light" size="large"></vue-img-inputer>
                        </div>
                    </div>
                    <div class='desc'>
                        <el-input 
                            type='textarea'
                            :rows="6"
                            placeholder='请输入宠物介绍信息'
                            v-model='petInfo.petIntroInfo'></el-input>
                    </div>
                    <div class='subBtn'>
                        <el-button type="primary" @click='addPet(petInfo)'>提交信息</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span='2'>&nbsp;</el-col>
        </el-row>
    </div>
</template>

<script>
import config from '../configs/config'
import myAxios from '../common/myAxios'
import vueImgInputer from 'vue-img-inputer'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('petModule')

export default {
    created () {
        myAxios.get(config.GET_PETS, (res) => {
            console.log('data: ', this.petPhoto)
        })
    },
    data () {
        return {
            petInfo: {
                petTypes: [{
                    value: 'dog',
                    label: '狗'
                }, {
                    value: 'cat',
                    label: '猫'
                }, {
                    value: 'snake',
                    label: '蛇'
                }],
                sex: 'male',
                nickname: '',
                petType: '',
                petBreed: '',
                age: '',
                petIntroInfo: '',
                petPhoto: ''
            }
        }
    },
    components: {
        'vue-img-inputer': vueImgInputer
    },
    methods: {
        ...mapActions([
            'addPet'
        ])
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
    .mainContent {
        display: flex;
        flex-direction: column;
        padding: 22px;
        background-color: #f9fafc;
        .basicInfo {
            display: flex;
            .left {
                text-align: left;
                .el-input {
                    width: 134%;
                    display: block;
                    margin-top: 20px;
                    &:first-child {
                        margin-top: 0;
                    }
                }
                .el-select, .sex {
                    margin-top: 20px;
                }
            }
            .right {
                flex-grow: 1;
                margin-left: 20px;  
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;         
                .img-inputer--light {
                    border: none;
                } 
            }
        }
        .desc {
            margin-top:20px;
        }
        .subBtn {
            margin-top: 20px;
        }
    }
}
</style>
