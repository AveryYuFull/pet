<template>
    <div class='petInfoContainer'>
        <div class='table'>
            <div class='header'>
                <div class='title' v-for='(title, index) in headTitle' v-text='title' :key='index'></div>
            </div>
            <div class='content'>
                <div class='row' v-for='(item, index) in petInfo' :key='index'>
                    <div class='col'><img :src='`/api/${item.petPhoto}`' alt='' /></div>
                    <div class='col petInfo' v-text='item.petIntroInfo'></div>
                    <div class='col operate'>
                        <div class='btn' @click='deletePetInfo(item.id)'>删除</div>
                        <div class='btn'>更新</div>
                    </div>
                </div>
            </div>
            <div class='bottom'>
                <pagination @goPage='goPage' :pagination='pagination' />
                <span class='addPetInfoBtn' @click='addPets'>添加宠物信息</span>
            </div>
        </div>
        <dialog-component v-if='isShowDialog' :dialogVisibleProps='isShowDialog' :currentViewProps='petForm' />
    </div>
</template>

<script type='text/javascript'>
import DialogComponent from '../components/DialogComponent'
import PetForm from '../components/PetForm'
import Pagination from '../components/Pagination'
import config from '../configs/config'
import stringUtil from '../common/stringUtil'
import myAxios from '../common/myAxios'
import PubSub from 'pubsub-js'

export default {
    props: {
        count: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            isShowDialog: false,
            petForm: PetForm,
            petInfo: {},
            pagination: {
                currentPage: 1,
                pageSize: 3,
                count: this.count
            }
        }
    },
    created () {
        this.headTitle = ['宠物照片', '宠物信息', '操作']
        this.getPetInfo()

        this.addPetInfoSuccSub = PubSub.subscribe('addPetInfoSucc', () => {
            this.addPetInfoSucc()
        })
    },
    methods: {
        goPage (pagination) {
            this.pagination = pagination.pagination
            this.getPetInfo()
        },
        addPets () {
            this.isShowDialog = true
        },
        /**
         * 当增加完宠物信息后，回调改方法
         */
        addPetInfoSucc () {
            this.isShowDialog = false
            this.getPetInfo()
        },
        getPetInfo () {
            myAxios.get(stringUtil.queryToStr(config.GET_PETS, this.pagination), (res) => {
                this.petInfo = res.data.petsInfo
                this.pagination = Object.assign({}, this.pagination, {
                    count: res.data.totalCount
                })
            })
        },
        /**
         * 根据宠物id删除宠物信息
         */
        deletePetInfo (id) {
            myAxios.delete(config.DELETE_PET_INFO, (res) => {
                res.success && this.getPetInfo()
            }, {id: id})
        }
    },
    beforeDestroy () {
        this.addPetInfoSuccSub && PubSub.unsubscribe(this.addPetInfoSuccSub)
    },
    components: {
        'dialog-component': DialogComponent,
        'pagination': Pagination
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
                    &.petInfo {
                        text-align: left;
                    }
                    img {
                        max-width: 100%;
                    }
                    &.operate {
                        flex-direction: column;
                        justify-content: center;
                        .btn + .btn {
                            margin-top: 30px;
                        }
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
            display: flex;
            justify-content: space-between;
            align-items: center;
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
