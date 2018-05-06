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
        state.isLoading = false;
    }
}