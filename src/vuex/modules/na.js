import {NAMutation} from '../mutations';

const state = {
    isLoading: true,
    list: []
}

export default {
    namespace: true,
    state,
    mutations: NAMutation
}