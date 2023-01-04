import axios from 'axios'

const api = axios.create({
    baseURL: 'https://demo-api.bettercommissions.com'
})

export const state = () => ({
    owners: [],
})

//getters
export const getters = {
}

//actions
export const actions = {
    async getJobOwners({commit}) {
        let url = `/interview-data/users`
        api.get(url).then((res) => {
            commit('GET_JOB_OWNERS', res.data)
        })
    }
}

//mutations
export const mutations = {
    GET_JOB_OWNERS(state, payload) {
        state.owners = payload
        console.log(payload.data)
    }
}