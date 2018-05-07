import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';
import {data} from '@/common/testData';

export const requestMovieDetail = (id) => {
    store.commit({type: types.REQUEST_MOVIE_DETAIL});
    getDataByServer(configs.SERVER_BASE + configs.MOVIE_DETAIL + id).then(res => {
        console.log(res);
        store.commit({type: types.GET_MOVIE_DETAIL, detail: res});
    })
}