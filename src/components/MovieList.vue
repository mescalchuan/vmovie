<template>
    <div style="overflow:hidden">
        <Header :title="getListTitle"/>
        <Loading :isShow="isLoading"/>
        <div v-if="!isLoading" class="movie-list">
            <div class="list-con" v-for="(item, index) in movieData.subjects" :key="index">
                <img :src="item.images.medium" alt="carousel.jpg">
                <div class="movie-info">
                    <p class="movie-title">{{item.title}}</p>
                    <span class="movie-actor">
                        导演:
                        <span class="movie-director-name">{{item.directors[0].name}}</span>
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
            <div v-if="getListTitle == 'Top250'">
                <p class="margin-top-25 more-list-text" v-if="!gettingMore && start < movieData.total" @click="requestMoreList(start)">加载更多</p>
                <p class="margin-top-25 more-list-text" v-else-if="!gettingMore && start >= movieData.total">已加载全部</p>
                <p class="margin-top-25 more-list-text" v-else>加载中.....</p>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/common/ui-components/Header';
import {mapState, mapMutations} from 'vuex';
import {MOVIE_LIST_TYPE} from '@/common/config';
import * as server from '@/server/movie_list_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';

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
    computed: {
        getListTitle() {
            const path = this.$route.path;
            const urlList = path.split('/');
            switch(urlList[urlList.length - 1]) {
                case MOVIE_LIST_TYPE.TOP250:
                    return 'Top250';
                case MOVIE_LIST_TYPE.NEW:
                    return '新片榜';
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
        requestMovieList(type) {
            server.requestMovieList(type, true);
            // console.log(getDataByServer)
            // getDataByServer(urls.SERVER_BASE + urls.HOT_MOVIE, null).then(res => console.log(res))
            // this.$store.dispatch({
            //     type: types.GET_HOT
            // })
        },
        requestMoreList(start) {
            server.requestMoreList(start)
            .then(() => {
                this.start += this.movieData.count;
                console.log(this.movieData.start)
                console.log(this.movieData.subjects.length)
                console.log('succeed')
            })
        }
    },
    mounted() {
        console.log(this.$route.path);
        const path = this.$route.path;
        const urlList = path.split('/');
        console.log(this.$route)
        this.requestMovieList(urlList[urlList.length - 1]);
    },
    beforeRouteUpdate (to, from, next) {
      const path = to.path;
        const urlList = path.split('/');
        this.requestMovieList(urlList[urlList.length - 1]);
        // don't forget to call next()
    }
}
</script>

<style lang="scss" scoped>
@import '../common/basic';

.movie-list {
    margin-top: px2rem(100);
}
.list-con {
        box-sizing: border-box;
        margin: px2rem(10) auto 0 auto;
        //height: px2rem(400);
        background-color: #eeeeee;
        padding: px2rem(25);
        display: flex;
        align-items: center;
        > img {
            width: px2rem(180);
            height: px2rem(251);
        }
        .movie-info {
            flex: 1;
            align-self: flex-start;
            padding: {
                left: px2rem(30);
            }
            .movie-title {
                @include font-dpr(15px);
            }
            .movie-director-name {
                color: #666666;
                @include font-dpr(13px);
                margin-left: px2rem(10);
            }
            .movie-actor {
                display: inline-block;
                margin-top: px2rem(20);
                color: #666666;
                @include font-dpr(13px);
                span {
                    white-space: pre-nowrap;
                }
            } 
            .movie-rating {
                margin-top: px2rem(10);
            }
        }
    }
    .more-list-text {
            @include font-dpr(16px);
            margin-top: px2rem(5);
            color: #2E963D;
            text-align: center;
        }
</style>

