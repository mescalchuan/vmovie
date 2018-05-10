export const SERVER_BASE = 'https://api.douban.com/' /*'/api/'*/   /*开发环境跨域，使用proxy代理，位于@/config/index.js*/ //'https://api.douban.com/';

export const HOT_MOVIE = 'v2/movie/in_theaters';

export const SOON_MOVIE = 'v2/movie/coming_soon';

export const TOP250_LIST = 'v2/movie/top250';

export const WORD_MOUTH_LIST = 'v2/movie/weekly';

export const NORTH_AMERICA_LIST = 'v2/movie/us_box';

export const NEW_LIST = 'v2/movie/new_movies';

export const MOVIE_DETAIL = 'v2/movie/subject/';

export const SEARCH_BY_WORDS = 'v2/movie/search';

export const MOVIE_LIST_TYPE = {
    TOP250: 'top250',
    NEW: 'new',
    SEARCH: 'search_result'
}

export const AUTH = {
    KEY: 'apikey',
    VALUE: '0df993c66c0c636e29ecbb5344252a4a'
}
//搜索所需标签
export const TAG = ['喜剧', '爱情', '动作', '记录', '动画', '战争', '悬疑', '惊悚']

export const TAG_ICON = ['ios-happy-outline', 'ios-heart-outline', 'ios-body-outline', 'ios-videocam-outline', 'ios-ionitron-outline', 'ios-jet-outline', 'ios-flash-outline', 'ios-sad-outline']