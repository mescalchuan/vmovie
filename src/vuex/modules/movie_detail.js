import {movieDetailMutation} from '../mutations';

const state = {
    isLoading: true,
    gettingMore: false,
    detail: {}
}

export default {
    namespace: true,
    state,
    mutations: movieDetailMutation
}