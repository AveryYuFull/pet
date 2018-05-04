export default {
    queryToStr (url, data) {
        let queryArr = []

        for (let key in data) {
            queryArr.push(`${key}=${typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]}`)
        }

        return url.includes('?') ? `${url}&${queryArr.join('&')}` : `${url}?${queryArr.join('&')}`
    } 
}
