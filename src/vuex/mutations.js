import * as types from './types';

export const homeMutation = {
    [types.CHANGE_NAME](state, payload) {
        state.name = payload.name;
    },
    [types.REQUEST_HOT](state, {isLoading, isRefreshing}) {
        state.hIsLoading = isLoading;
        state.isRefreshing = isRefreshing;
    },
    [types.GET_HOT](state, {hotData}) {
        const subjects = hotData.subjects;
        const carouselList = subjects.slice(0, 5);
        const hotList = subjects.slice(5, 17);
        console.log(carouselList)
        //state = {...{carouselList, hotList, isLoading: false, isRefreshing: false}};
        state.hIsLoading = false;
        state.isRefreshing = false;
        state.hotList = hotList;
        state.carouselList = carouselList;
        // state.hotData = hotData;S
    },
    [types.REQUEST_SOON](state, {isLoading}) {
        state.sIsLoading = isLoading;
    },
    [types.GET_SOON](state, {soonData}) {
        const subjects = soonData.subjects;
        console.log(soonData.subjects)
        let soonList = subjects.slice(0, 12)
        console.log(soonList.length);
        // if(soonList.length % 3 != 0) {
        //     for(let i = 0; i < soonList.length % 3; i++) {
        //         soonList.push({});
        //     }
        // }
        state.sIsLoading = false;
        state.soonList = soonList;
    }
}

export const movieListMutation = {
    [types.REQUEST_LIST_BY_TYPE](state, {isLoading}) {
        state.isLoading = isLoading;
    },
    [types.GET_LIST_BY_TYPE](state, {listData}) {
        state.movieList = listData.subjects;
        console.log(listData.subjects);
        state.isLoading = false;
    }
}

export const wordMouthMutation = {
    [types.REQUEST_WORD_MOUTH_LIST](state, {isLoading}) {
        console.log('get')
        state.isLoading = isLoading;
    },
    [types.GET_WORD_MOUTH_LIST](state, {listData}) {
        console.log(listData)
        state.list = listData.subjects;
        console.log(listData.subjects);
        state.isLoading = false;
    }
}

export const NAMutation = {
    [types.REQUEST_NA_LIST](state, {isLoading}) {
        console.log('get')
        state.isLoading = isLoading;
    },
    [types.GET_NA_LIST](state, {listData}) {
        console.log(listData)
        state.list = listData.subjects;
        console.log(listData.subjects);
        state.isLoading = false;
    }
}

export const movieDetailMutation = {
    [types.REQUEST_MOVIE_DETAIL](state) {
        state.isLoading = true;
    },
    [types.GET_MOVIE_DETAIL](state, {detail}) {
        console.log(detail);
        state.detail = detail;
        state.isLoading = false;
    }
}