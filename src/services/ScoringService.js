import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.loginToken;

let ScoringService = {
    getAllParticipantsScores(event){
        return axios.get(process.env.VUE_APP_API_URL + '/api/events/' + event + '/participants-scores')
    }
}

export default ScoringService