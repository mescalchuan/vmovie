import {getDataByServer} from '@/common/fetchData';
import * as urls from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';
import {data} from '@/common/testData';
import { WORD_MOUTH_LIST } from './../common/config';

const getUrlByType = (type) => {
    let url = urls.SERVER_BASE;
    console.log(types);
    switch(type) {
        case types.MOVIE_LIST_TYPE.TOP250:
            url += urls.TOP250_LIST;
            break;
        case types.MOVIE_LIST_TYPE.WORD_MOUTH:
            url += urls.WORD_MOUTH_LIST;
            break;
        case types.MOVIE_LIST_TYPE.NORTH_AMERICA:
            url += urls.NORTH_AMERICA_LIST;
            break;
        case types.MOVIE_LIST_TYPE.NEW:
            url += urls.NEW_LIST;
            break;
        default: 
            break;
    }
    console.log(url);
    return url;
}

export const requestMovieList = (type, isLoading) => {
    console.log(type);
    store.commit({type: types.REQUEST_LIST_BY_TYPE, isLoading});
    getDataByServer(getUrlByType(type), null).then(res => {
        console.log(res);
        store.commit({type: types.GET_LIST_BY_TYPE, listData: res});
    })
}