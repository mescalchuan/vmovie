import {getDataByServer} from '@/common/fetchData';
import * as urls from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';
import {data} from '@/common/testData';

export const requestHotMovie = (isLoading, isRefreshing) => {
    store.commit({type: types.REQUEST_HOT, isLoading, isRefreshing});
    //getDataByServer(urls.SERVER_BASE + urls.HOT_MOVIE, null).then(res => {
        store.commit({type: types.GET_HOT, hotData: data});
    //})
}

export const requestSoonMovie = (isLoading, isRefreshing, successBK, errorBK) => {
    store.commit({type: types.REQUEST_SOON, isLoading, isRefreshing});
    console.log(urls.SERVER_BASE + urls.SOON_MOVIE)
    //getDataByServer(urls.SERVER_BASE + urls.SOON_MOVIE, null).then(res => {
        store.commit({type: types.GET_SOON, soonData: data});
    //})
    // .catch(e => {
    //     errorBK && errorBK(e);
    // })
}