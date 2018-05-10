import $ from 'jquery';
//设置请求的超时时间
const timeout = 5000;

const Util = {
    /*
     * ajax简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
    gets: (url, data, successCallback, failCallback) => {
        $.ajax({
            url,
            type: 'get',
            data,
            dataType: "jsonp",
            timeout,
            success(re) {
                successCallback && successCallback(re);
            },
            error(err) {
                failCallback && failCallback(err)
            }
        })
    //     const request = new XMLHttpRequest();
    //     let newData = data;
    //     let newUrl = url;
    //     if (newData) newData = Util.exchangeParmaster(data);
    //     else newData = null;

    //     if (newUrl.indexOf("?") >= 0) {
    //         if (newData)  newUrl += "&" + newData;
    //     } 
    //     else {
    //         if (newData) newUrl += "?" + newData;
    //     }

    //     request.onreadystatechange = (e) => {
    //         if (request.readyState !== 4) return;

    //         if (request.status === 200) {
    //             if(timer) clearTimeout(timer);
    //             try {
    //                 successCallback && successCallback(JSON.parse(request.responseText))
    //             } 
    //             catch (e) {
    //                 console.log(request.responseText);
    //             }
    //         } 
    //         else {
    //             timer && clearTimeout(timer);
    //             failCallback && failCallback(e);
    //             console.warn('get error');
    //         }
    //     };

    //     const timer = setTimeout(function() {
    //       request.abort();
    //     }, timeout)
    //     //request.withCredentials = true;
    //     request.open('GET', newUrl);
    //     request.send();
    // },

    // exchangeParmaster: (data) => {
    //     let newParmaster = "";
    //     let findIndex = 0;
    //     for (let key in data) {
    //         if (findIndex == 0) newParmaster += key + "=" + data[key];
    //         else newParmaster += "&" + key + "=" + data[key];

    //         findIndex++;
    //     }
    //     return newParmaster;
    },

    // posts: (url, data, successCallback, failCallback) => {
    //     const request = new XMLHttpRequest();
    //     let newData = null;
    //     if (data) newData = Util.exchangeParmaster(data);
    //     else newData = null;

    //     request.onreadystatechange = (e) => {
    //         if (request.readyState !== 4) return;
    //         if (request.status === 200) {
    //             timer && clearTimeout(timer);
    //             try {
    //                 successCallback && successCallback(JSON.parse(request.responseText));
    //             } 
    //             catch (e) {
    //                 console.log(request.responseText);
    //             }
    //         } 
    //         else {
    //             timer && clearTimeout(timer);
    //             failCallback && failCallback(e);
    //             console.warn('post error');
    //         }
    //     };

    //     const timer = setTimeout(function() {
    //         request.abort();
    //     }, timeout)
    //     request.open('POST', url);
    //     request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    //     request.send(newData);
    // },
}
export default Util;
