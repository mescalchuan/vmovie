import * as types from './types';

export const homeAction = {
    [types.CHANGE_NAME]({commit}) {
        commit({
            type: types.CHANGE_NAME,
            name: "qinchuan1"
        })
        setTimeout(() => {
            commit({
                type: types.CHANGE_NAME,
                name: "qinchuan2"
            })
        }, 5000)
    },
    
}