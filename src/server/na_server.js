import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';

export const requestNA = () => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_NA_LIST});
        getDataByServer(`${configs.SERVER_BASE + configs.NORTH_AMERICA_LIST}`, {[configs.AUTH.KEY]: configs.AUTH.VALUE}).then(res => {
            store.commit({type: types.GET_NA_LIST, listData: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err))
    })
}
