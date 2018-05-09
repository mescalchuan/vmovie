import {movieListMutation} from '../mutations';

const state = {
    isLoading: true,
    gettingMore: false,
    movieData: {} 
}

export default {
    namespace: true,
    state,
    mutations: movieListMutation
}