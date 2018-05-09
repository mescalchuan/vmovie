import {homeMutation} from '../mutations';
import {homeAction} from '../actions';

const state = {
    hIsLoading: true,
    sIsLoading: true,
    carouselList: [],
    hotList: [],
    soonList: []
}

export default {
    namespace: true,
    state,
    mutations: homeMutation,
    actions: homeAction
}