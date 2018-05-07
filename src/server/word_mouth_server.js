import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';
import {data} from '@/common/testData';

export const requestWordMouth = (isLoading) => {
    console.log(types.REQUEST_WORD_MOUTH_LIST);
    console.log(isLoading)
    store.commit({type: types.REQUEST_WORD_MOUTH_LIST, isLoading});
    console.log(`${configs.SERVER_BASE + configs.WORD_MOUTH_LIST}?${configs.AUTH.KEY}=${configs.AUTH.VALUE}`)
    getDataByServer(`${configs.SERVER_BASE + configs.WORD_MOUTH_LIST}?${configs.AUTH.KEY}=${configs.AUTH.VALUE}`, null).then(res => {
        console.log(res);
        store.commit({type: types.GET_WORD_MOUTH_LIST, listData: res});
    })
}