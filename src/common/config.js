//const KEY = '00aefce4d06e0bb7020cf6ae714a2325';

export const SERVER_BASE = '/api/'/*开发环境跨域，使用proxy代理，位于@/config/index.js*/ //'https://api.douban.com/';

export const HOT_MOVIE = 'v2/movie/in_theaters';

export const SOON_MOVIE = 'v2/movie/coming_soon';

export const TOP250_LIST = 'v2/movie/top250';

export const WORD_MOUTH_LIST = 'v2/movie/weekly';

export const NORTH_AMERICA_LIST = 'v2/movie/us_box';

export const NEW_LIST = 'v2/movie/new_movies';

export const MOVIE_DETAIL = 'v2/movie/subject/';

export const MOVIE_LIST_TYPE = {
    TOP250: 'top250',
    WORD_MOUTH: 'wordmouth',
    NORTH_AMERICA: 'na',
    NEW: 'new'
}

export const AUTH = {
    KEY: 'apikey',
    VALUE: '0df993c66c0c636e29ecbb5344252a4a'
}