import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';

export const requestHotMovie = () => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_HOT});
        getDataByServer(configs.SERVER_BASE + configs.HOT_MOVIE, null).then(res => {
            store.commit({type: types.GET_HOT, hotData: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err))
    })
}

export const requestSoonMovie = () => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_SOON});
        getDataByServer(configs.SERVER_BASE + configs.SOON_MOVIE, null).then(res => {
            store.commit({type: types.GET_SOON, soonData: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err))
    })
}
