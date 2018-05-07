import {movieDetailMutation} from '../mutations';

const state = {
    isLoading: true,
    movieDetail: {}
}

export default {
    namespace: true,
    state,
    mutations: movieDetailMutation
}