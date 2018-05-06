import {movieListMutation} from '../mutations';

const state = {
    isLoading: true,
    isRefreshing: false,
    movieList: []
}

export default {
    namespace: true,
    state,
    mutations: movieListMutation
}