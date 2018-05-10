import {getDataByServer} from '@/common/fetchData';
import * as configs from '@/common/config';
import * as types from '@/vuex/types';
import store from '@/vuex/store';

const requestInfo = {
    [configs.AUTH.KEY]: configs.AUTH.VALUE,
    start: 0,
    count: 10
}

export const requestMovieDetail = (id) => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_MOVIE_DETAIL});
        getDataByServer(configs.SERVER_BASE + configs.MOVIE_DETAIL + id).then(res => {
            store.commit({type: types.GET_MOVIE_DETAIL, detail: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err));
    })
}

export const requestMoviePhotos = (id, start) => {
    return new Promise((resolve, reject) => {
        getDataByServer(`${configs.SERVER_BASE}${configs.MOVIE_DETAIL}${id}/photos`, Object.assign({}, requestInfo, {start})).then(res => {
            store.commit({type: types.GET_MOVIE_PHOTOS, photos: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err));
    })
}

export const requestMovieShortComments = (id) => {
    return new Promise((resolve, reject) => {
        getDataByServer(`${configs.SERVER_BASE}${configs.MOVIE_DETAIL}${id}/comments`, requestInfo).then(res => {
            store.commit({type: types.GET_MOVIE_SHORT_COMMENTS, comments: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err));
    })
}

export const requestMoreShortComments = (id, start) => {
    return new Promise((resolve, reject) => {
        store.commit({type: types.REQUEST_MORE_SHORT_COMMENTS});
        getDataByServer(`${configs.SERVER_BASE}${configs.MOVIE_DETAIL}${id}/comments`, Object.assign({}, requestInfo, {start})).then(res => {
            store.commit({type: types.GET_MORE_SHORT_COMMENTS, comments: res});
            resolve(res);
        }, err => reject(err))
        .catch(err => reject(err));
    })
}
