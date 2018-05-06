import {homeMutation} from '../mutations';
import {homeAction} from '../actions';

const state = {
    name: 'qinchuan',
    hIsLoading: true,
    isRefreshing: false,
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