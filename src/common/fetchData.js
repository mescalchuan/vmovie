import ajaxUtil from './ajax';

//异常重发
let index = 0;

const getData = (url, params, successBK, errorBK) => {
    ajaxUtil.gets(url, params, res => {
        successBK && successBK(res);
    }, e => {
        if(index < 2) {
            index++;
            getData(url, params, successBK, errorBK);
        }
        else {
            index = 0;
            errorBK && errorBK(e);
        }
    })
}

const postData = (url, params, successBK, errorBK) => {
    ajaxUtil.posts(url, params, res => {
        successBK && successBK(res);
    }, e => {
        if(index < 2) {
            index++;
            postData(url, params, successBK, errorBK);
        }
        else {
            idnex = 0;
            errorBK && errorBK(e);
        }
    })
}

export const getDataByServer = (url, params) => {
    return new Promise((resolve, reject) => {
        getData(url, params, res => resolve(res), e => reject(e))
    })
}

export const postDataByServer = (url, params) => {
    return new Promise((resolve, reject) => {
        postData(url, params, res => resolve(res), e => reject(e))
    })
}