import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';
import {data} from '@/common/testData';

export const requestHotMovie = () => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_HOT});
        getDataByServer(configs.SERVER_BASE + configs.HOT_MOVIE, null).then(res => {
            store.commit({type: types.GET_HOT, hotData: res});
            resolve();
        }, err => reject(err))
        .catch(err => reject(err))
    })
}

export const requestSoonMovie = (successBK, errorBK) => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_SOON});
        console.log(configs.SERVER_BASE + configs.SOON_MOVIE)
        getDataByServer(configs.SERVER_BASE + configs.SOON_MOVIE, null).then(res => {
            store.commit({type: types.GET_SOON, soonData: res});
            resolve();
        }, err => reject(err))
        .catch(err => reject(err))
    })
}