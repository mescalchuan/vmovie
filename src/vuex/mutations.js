import * as types from './types';
import utils from '@/common/utils';

export const homeMutation = {
    [types.CHANGE_NAME](state, payload) {
        state.name = payload.name;
    },
    [types.REQUEST_HOT](state) {
        state.hIsLoading = true;
    },
    [types.GET_HOT](state, {hotData}) {
        const subjects = hotData.subjects;
        const carouselList = subjects.slice(0, 5);
        const hotList = subjects.slice(5, 17);
        state.hIsLoading = false;
        state.hotList = hotList;
        state.carouselList = carouselList;
    },
    [types.REQUEST_SOON](state) {
        state.sIsLoading = true;
    },
    [types.GET_SOON](state, {soonData}) {
        const subjects = soonData.subjects;
        let soonList = subjects.slice(0, 12)
        state.sIsLoading = false;
        state.soonList = soonList;
    }
}

export const movieListMutation = {
    [types.REQUEST_LIST_BY_TYPE](state) {
        state.isLoading = true;
    },
    [types.GET_LIST_BY_TYPE](state, {listData}) {
        state.movieData = listData;
        state.isLoading = false;
    },
    [types.REQUEST_MORE_BY_TYPE](state) {
        state.gettingMore = true;
    },
    [types.GET_MORE_BY_TYPE](state, {listData}) {
        let _movieData = utils.clone(state.movieData);
        _movieData.start = listData.start;
        _movieData.subjects = _movieData.subjects.concat(listData.subjects);
        _movieData.total = listData.total;
        state.movieData = _movieData;
        state.gettingMore = false;
    }
}

export const wordMouthMutation = {
    [types.REQUEST_WORD_MOUTH_LIST](state) {
        state.isLoading = true;
    },
    [types.GET_WORD_MOUTH_LIST](state, {listData}) {
        state.list = listData.subjects;
        state.isLoading = false;
    }
}

export const NAMutation = {
    [types.REQUEST_NA_LIST](state) {
        state.isLoading = true;
    },
    [types.GET_NA_LIST](state, {listData}) {
        state.list = listData.subjects;
        state.isLoading = false;
    }
}

export const movieDetailMutation = {
    [types.REQUEST_MOVIE_DETAIL](state) {
        state.isLoading = true;
    },
    [types.GET_MOVIE_DETAIL](state, {detail}) {
        state.detail = detail;
    },
    [types.GET_MOVIE_PHOTOS](state, {photos}) {
        let _detail = utils.clone(state.detail);
        _detail.photos = photos;
        state.detail = _detail;
    },
    [types.GET_MOVIE_SHORT_COMMENTS](state, {comments}) {
        let _detail = utils.clone(state.detail);
        _detail.shortComments = comments;
        state.detail = _detail;
        state.isLoading = false;
    },
    [types.REQUEST_MORE_SHORT_COMMENTS](state) {
        state.gettingMore = true;
    },
    [types.GET_MORE_SHORT_COMMENTS](state, {comments}) {
        let _shortComments = utils.clone(state.detail.shortComments);
        _shortComments.start = comments.start;
        _shortComments.count += comments.count;
        _shortComments.next_start = comments.next_start;
        _shortComments.comments = _shortComments.comments.concat(comments.comments);
        state.detail.shortComments = _shortComments;
        state.gettingMore = false;
    },
    [types.CLEAR_DETAIL](state) {
        state.detail = {};
    }
}