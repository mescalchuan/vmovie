<template>
    <div class="home-con">
        <Loading :isShow="hIsLoading || sIsLoading"/>
        <div v-if="!hIsLoading && !sIsLoading">
            <Search @newWords="changeWords" :searchWords="searchWords" :submit="searchByWords"/>
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item, index) in carouselList" :key="index">
                    <div class="carousel-con" @click="gotoDetail(item.id)">
                        <img :src="item.images.medium" alt="carousel.jpg">
                        <div class="movie-info">
                            <p class="movie-title">{{item.title}}</p>
                            <div class="movie-director">
                                <img :src="item.directors[0].avatars.small" alt="director.jpg" align="middle">
                                <span class="movie-director-name">{{item.directors[0].name}}</span>
                            </div>
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
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            <home-list title="正在热映" :list="hotList" :listLeft="hotListLeft"/>
            <home-list title="即将上映" :list="soonList" :listLeft="soonListLeft"/>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {mapState} from 'vuex';
import * as server from '@/server/home_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';
import HomeList from '@/common/ui-components/HomeList';
import Search from '@/common/ui-components/Search';
import {TAG} from '@/common/config';
import 'swiper/dist/css/swiper.css';

//计算出homeList每一行的最大列数，返回最后一行需要填补的空白数量
const listLeft = (list) => {
    const fontSize = document.documentElement.style.fontSize;
    const columns = Math.floor((document.body.clientWidth - 0.266673 * parseInt(fontSize)) / (3 * parseInt(fontSize)));
    const lastColCount = list.length % columns;
    const additionCount = lastColCount == 0 ? 0 : columns - lastColCount;
    return new Array(additionCount);
}
export default {
    name: 'Home',
    data() {
        return {
            searchWords: '',
            swiperOption: {
                loop: true,
                autoplay: {
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    computed: {
        soonListLeft() {
            return listLeft(this.soonList);
        },
        hotListLeft() {
            return listLeft(this.hotList);
        },
        ...mapState({
            name: state => state.home.name,
            hIsLoading: state => state.home.hIsLoading,
            sIsLoading: state => state.home.sIsLoading,
            carouselList: state => state.home.carouselList,
            hotList: state => state.home.hotList,
            soonList: state => state.home.soonList
        })
    },
    methods: {
        changeWords(nv) {
            this.searchWords = nv;
        },
        searchByWords() {
            const queryKey = !!(~TAG.indexOf(this.searchWords)) ? 'tag' : 'q';
            this.$router.push({
                path: '/search_result',
                query: {
                    [queryKey]: this.searchWords
                }
            })
        },
        requestHotMovie: server.requestHotMovie,
        requestSoonMovie: server.requestSoonMovie,
        gotoDetail(id) {
            this.$router.push({
                path: '/moviedetail/' + id
            })
        }
    },
    mounted() {
        Promise.all([this.requestHotMovie(), this.requestSoonMovie()])
        .then(null, err => console.log(err))
        .catch(err => console.log(err));
    },
    components: {
        swiper,
        swiperSlide,
        Loading,
        Star,
        HomeList,
        Search
    }
}
</script>

<style lang='scss'>
@import '../common/basic';
.home-con {
    .carousel-con {
        width: 95vw;
        box-sizing: border-box;
        margin: px2rem(110) auto 0 auto;
        border-radius: px2rem(15);
        background-color: $main-color;
        padding: px2rem(25);
        display: flex;
        > img {
            width: px2rem(270);
            height: px2rem(377);
        }
        .movie-info {
            flex: 1;
            padding: {
                left: px2rem(30);
            }
            .movie-title {
                color: white;
                @include font-dpr(16px);
            }
            .movie-director {
                margin-top: px2rem(20);
                img {
                    width: px2rem(60);
                    height: px2rem(60);
                    border-radius: px2rem(60);
                }
                .movie-director-name {
                    color: white;
                    @include font-dpr(13px);
                    margin-left: px2rem(10);
                }
            }
            .movie-actor {
                display: inline-block;
                margin-top: px2rem(20);
                color: white;
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
    .swiper-pagination-bullet {
        width: px2rem(30);
        height: px2rem(5);
        margin: 0 px2rem(8) !important;
        border-radius: 0;
    }
    .swiper-pagination-bullet-active {
        background: #FFD716;
    }
    .swiper-pagination-bullets {
        position: static;
    }
}
</style>
