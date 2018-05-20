import myAxios from '../../common/myAxios'
import config from '../../configs/config'

const actions = {
    /**
     * 添加宠物信息
     */
    addPet ({ commit }, petInfo) {
        console.log('petInfo: ', petInfo)
        const data = new FormData()
        data.append('id', petInfo.id)
        data.append('age', petInfo.age)
        data.append('sex', petInfo.sex)
        data.append('nickname', petInfo.nickname)
        data.append('petType', petInfo.petType)
        data.append('petBreed', petInfo.petBreed)
        data.append('petIntroInfo', petInfo.petIntroInfo)
        data.append('petPhoto', petInfo.petPhoto)

        myAxios.post(config.ADD_PET, (res) => {
            console.log(res)
        }, data)
    }
}

export default actions;
