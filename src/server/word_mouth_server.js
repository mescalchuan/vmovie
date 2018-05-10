import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';

export const requestWordMouth = () => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_WORD_MOUTH_LIST});
        getDataByServer(`${configs.SERVER_BASE + configs.WORD_MOUTH_LIST}`, {[configs.AUTH.KEY]: configs.AUTH.VALUE}).then(res => {
            store.commit({type: types.GET_WORD_MOUTH_LIST, listData: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err))
    })
}
