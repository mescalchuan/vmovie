import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';

const getUrlByType = (type, searchKey, searchType) => {
    let url = configs.SERVER_BASE;
    switch(type) {
        case configs.MOVIE_LIST_TYPE.TOP250:
            url += configs.TOP250_LIST;
            break;
        case configs.MOVIE_LIST_TYPE.NEW:
            url += `${configs.NEW_LIST}?${configs.AUTH.KEY}=${configs.AUTH.VALUE}`;
            break;
        case configs.MOVIE_LIST_TYPE.SEARCH:
            const key = searchType == 'tag' ? 'tag' : 'q';
            url +=`${configs.SEARCH_BY_WORDS}?${key}=${searchKey}`;
            break;
        default:
            break;
    }
    return url;
}

export const requestMovieList = (type, searchKey, searchType) => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_LIST_BY_TYPE});
        getDataByServer(getUrlByType(type, searchKey, searchType), null).then(res => {
            store.commit({type: types.GET_LIST_BY_TYPE, listData: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err))
    })

}

export const requestMoreList = (start, searchKey, searchType) => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_MORE_BY_TYPE});
        const key = searchType == 'tag' ? 'tag' : 'q';
        const url = searchKey ? `${configs.SERVER_BASE}${configs.SEARCH_BY_WORDS}?${key}=${searchKey}&start=${start}&count=20` : `${configs.SERVER_BASE}${configs.TOP250_LIST}?&start=${start}&count=20`;
        getDataByServer(url).then(res => {
            store.commit({type: types.GET_MORE_BY_TYPE, listData: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err))
    })
}
