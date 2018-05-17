<template>
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
</template>

<script type='text/javascript'>
import vueImgInputer from 'vue-img-inputer'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('petModule')

export default {
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
                // width: 134%;
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
</style>
