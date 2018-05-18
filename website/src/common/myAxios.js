import axios from 'axios'
import stringUtil from './stringUtil'

const URL_PREFIX = '/api'

export default {
    get (url, callback, params = {}) {
        axios.get(stringUtil.queryToStr(URL_PREFIX + url, params))
            .then (res => res.data)
            .then (res => {
                callback(res)
            }).catch (error => {
                console.log(error)
            })
    },

    post (url, callback, params = {}) {
        axios.post(URL_PREFIX + url, params)
            .then (res => res.data)
            .then (res => {
                callback(res)
            }).catch (error => {
                console.log(error)
            })
    },

    delete (url, callback, params = {}) {
        axios.delete(stringUtil.queryToStr(URL_PREFIX + url, params))
        .then (res => res.data)
        .then (res => {
            callback(res)
        }).catch(error => {
            console.log(error)
        })
    }
}
