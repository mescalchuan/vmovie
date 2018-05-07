import {wordMouthMutation} from '../mutations';

const state = {
    isLoading: true,
    list: []
}

export default {
    namespace: true,
    state,
    mutations: wordMouthMutation
}