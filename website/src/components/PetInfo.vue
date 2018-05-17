<template>
    <div class='petInfoContainer'>
        <div class='table'>
            <div class='header'>
                <div class='title' v-for='(title, index) in headTitle' v-text='title' :key='index'></div>
            </div>
            <div class='content'>
                <div class='row' v-for='(item, index) in data' :key='index'>
                    <div class='col'><img :src='`/api/${item.petPhoto}`' alt='' /></div>
                    <div class='col' v-text='item.petIntroInfo'></div>
                    <div class='col operate'>
                        <div class='btn'>删除</div>
                        <div class='btn'>更新</div>
                    </div>
                </div>
            </div>
            <div class='bottom'><span class='addPetInfoBtn' @click='addPets'>添加宠物信息</span></div>
        </div>
        <dialog-component v-if='isShowDialog' :dialogVisibleProps='isShowDialog' :currentViewProps='petForm' />
    </div>
</template>

<script type='text/javascript'>
import DialogComponent from '../components/DialogComponent'
import PetForm from '../components/PetForm'

export default {
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            isShowDialog: false,
            petForm: PetForm
        }
    },
    created () {
        this.headTitle = ['宠物照片', '宠物信息', '操作']
    },
    methods: {
        addPets () {
            this.isShowDialog = true
        }
    },
    components: {
        'dialog-component': DialogComponent
    }
}
</script>

<style lang='less' scoped>
.petInfoContainer {
    margin: 10px 0 0 10px;
    .table {
        border: 1px solid;
        .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid;
            .title {
                padding: 10px;
                flex: 1;
                text-align: center;
                font-weight: bold;
                font-size: 20px;
            }
            .title + .title {
                border-left: 1px solid;
            }
        }
        .content {
            .row {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid;
                .col {
                    padding: 10px;
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &.operate {
                        flex-direction: column;
                        justify-content: space-around;
                        .btn {
                            padding: 10px 50px;
                            color: #FFF;
                            background-color: red;
                            border-radius: 3px;
                            cursor: pointer;
                        }
                    }
                }
                .col + .col {
                    border-left: 1px solid;
                }
            }
            margin-bottom: 40px;
        }
        .bottom {
            text-align: right;
            .addPetInfoBtn {
                display: inline-block;
                margin: 0 10px 10px 0;
                padding: 10px;
                background-color: red;
                color: #FFF;
                border-radius: 3px;
                font-size:14px;
                box-shadow: 0 0 8px 0 #67c23a;
                cursor: pointer;
            }
        }
    }
}
</style>
