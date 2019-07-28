import axios from 'axios'

let RestApiService = class RestApiService{
    constructor (prefix){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.loginToken;
        this.prefix = process.env.VUE_APP_API_URL + prefix
    }

    index(){
        return axios.get(this.prefix)
    }

    save(data){
        return axios.post(this.prefix, data)
    }

    delete(id) {
        return axios.post(this.prefix + '/' + id + '/delete')
    }
}

export default RestApiService