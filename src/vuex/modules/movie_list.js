import {movieListMutation} from '../mutations';

const state = {
    isLoading: true,
    isRefreshing: false,
    gettingMore: false,
    movieData: {} 
}

export default {
    namespace: true,
    state,
    mutations: movieListMutation
}