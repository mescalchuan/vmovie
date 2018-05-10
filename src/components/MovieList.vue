<template>
    <div style="overflow:hidden">
        <Header :title="getListTitle"/>
        <Loading :isShow="isLoading"/>
        <div v-if="!isLoading" class="movie-list">
            <div class="list-con" v-for="(item, index) in movieData.subjects" :key="index" @click="gotoDetail(item.id)">
                <img :src="item.images.medium" alt="carousel.jpg">
                <div class="movie-info">
                    <p class="movie-title">{{item.title}}</p>
                    <span class="movie-actor">
                        导演:
                        <span class="movie-director-name">{{item.directors[0] && item.directors[0].name}}</span>
                    </span>
                    <span class="movie-actor">
                        主演:
                        <span v-for="(actor, aIndex) in item.casts" :key="aIndex">{{actor.name}} </span>
                    </span>
                    <p class="movie-actor">{{item.collect_count}} 人看过</p>
                    <div class="movie-rating">
                        <Star :goodNum="item.rating.average/2"/> <span style="margin-left:0.04rem;color:#FFD716">{{item.rating.average.toFixed(1)}}</span>
                    </div>
                </div>
            </div>
            <div v-if="getListTitle == 'Top250' || getListTitle == 'Search'" :class="{'margin-bottom-20': isDynamic}">
                <p class="more-list-text" v-if="!gettingMore && movieData.subjects.length < movieData.total" @click="requestMoreList(start, getSearchReqInfo.searchKey, getSearchReqInfo.searchType)">加载更多</p>
                <p class="more-list-text" v-else-if="!gettingMore && movieData.subjects.length >= movieData.total">已加载全部</p>
                <p class="more-list-text" v-else>加载中.....</p>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/common/ui-components/Header';
import {mapState} from 'vuex';
import {MOVIE_LIST_TYPE} from '@/common/config';
import * as server from '@/server/movie_list_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';

const requestMovieList = (self, route) => {
    const path = route.path;
    const urlList = path.split('/');
    const {tag, q} = (self.isDynamic ? self.dynamicInfo : route.query);
    const searchKey = tag ? tag : q;
    const searchType = tag ? 'tag' : 'q';
    self.requestMovieList(urlList[urlList.length - 1], searchKey, searchType)
}

export default {
    name: 'MovieList',
    components: {
        Header,
        Star,
        Loading
    },
    data() {
        return {
            start: 20
        }
    },
    props: {
        //列表数据是否会重新加载，搜索结果页->true，top250和new->false
        isDynamic: {
            type: Boolean,
            default: false
        },
        dynamicInfo: {
            type: Object,
            default: {}
        }
    },
    computed: {
        getSearchReqInfo() {
            const {tag, q} = (this.isDynamic ? this.dynamicInfo : this.$route.query);
            const searchKey = tag ? tag : q;
            const searchType = tag ? 'tag' : 'q';
            return {
                searchKey,
                searchType
            }
        },
        getListTitle() {
            const path = this.$route.path;
            const urlList = path.split('/');
            switch(urlList[urlList.length - 1]) {
                case MOVIE_LIST_TYPE.TOP250:
                    return 'Top250';
                case MOVIE_LIST_TYPE.NEW:
                    return '新片榜';
                case MOVIE_LIST_TYPE.SEARCH:
                    return 'Search';
                default:
                    return '';
            }
        },
        ...mapState({
            isLoading: state => state.movieList.isLoading,
            movieData: state => state.movieList.movieData,
            gettingMore: state => state.movieList.gettingMore
        })
    },
    methods: {
        gotoDetail(id) {
            this.$router.push({
                path: '/moviedetail/' + id
            })
        },
        requestMovieList: server.requestMovieList,
        requestMoreList(start, q, type) {
            server.requestMoreList(start, q, type)
            .then(() => {
                this.start += this.movieData.count;
            }, err => console.log(err))
            .catch(err => console.log(err))
        }
    },
    mounted() {
        requestMovieList(this, this.$route);
    },
    beforeRouteUpdate (to, from, next) {
        requestMovieList(this, to);
        // don't forget to call next()
        next();
    }
}
</script>

<style lang="scss" scoped>
@import '../common/list';
.more-list-text {
    @include font-dpr(16px);
    margin-top: px2rem(25);
    color: $main-color;
    text-align: center;
}
</style>
