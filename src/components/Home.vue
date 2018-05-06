<template>
    <div class="home-con">
        <Loading :isShow="hIsLoading || sIsLoading"/>
        <div v-if="!hIsLoading && !sIsLoading">
            <div class="app-header">
                <div class="app-search">
                    <Icon :size="30" name="ios-alarm" color="blue"/>
                </div>
            </div>
            <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
                <!-- <swiper-slide>
                    <div style="width:100vw;height:300px;background-color:red;"></div>
                </swiper-slide>
                <swiper-slide><div style="width:100vw;height:300px;background-color:blue;"></div></swiper-slide>
                <swiper-slide><div style="width:100vw;height:300px;background-color:yellow;"></div></swiper-slide> -->
                <swiper-slide v-for="(item, index) in carouselList" :key="index">
                    <div class="carousel-con">
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
            {{name}}
            <button @click="changeName">changeName</button>
            <button @click="requestHotMovie">request</button>
            <home-list title="正在热映" :list="hotList" :listLeft="hotListLeft"/>
            <home-list title="即将上映" :list="soonList" :listLeft="soonListLeft"/>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {mapState, mapMutations, mapActions} from 'vuex';
import * as server from '@/server/home_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';
import HomeList from '@/common/ui-components/HomeList';
import 'swiper/dist/css/swiper.css';

const listLeft = (list) => {
    const lastColCount = list.length % 3;
    const additionCount = lastColCount == 0 ? 0 : 3 - lastColCount;
    return new Array(additionCount);
}
export default {
    name: 'Home',
    data() {
        return {
            swiperOption: {
                loop: true,
                autoplay: false,
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    computed: {
        soonListLeft() {
            // const lastColCount = this.soonList.length % 3;
            // const additionCount = lastColCount == 0 ? 0 : 3 - lastColCount;
            // return new Array(additionCount);
            return listLeft(this.soonList);
        },
        hotListLeft() {
            return listLeft(this.hotList);
        },
        ...mapState({
            name: state => state.home.name,
            hIsLoading: state => state.home.hIsLoading,
            carouselList: state => state.home.carouselList,
            hotList: state => state.home.hotList,
            soonList: state => state.home.soonList
        })
    },
    methods: {
        changeName() {
            this.$store.dispatch({
                type: types.CHANGE_NAME,
                name: "123456"
            })
        },
        requestHotMovie() {
            server.requestHotMovie(true, false);
            // console.log(getDataByServer)
            // getDataByServer(urls.SERVER_BASE + urls.HOT_MOVIE, null).then(res => console.log(res))
            // this.$store.dispatch({
            //     type: types.GET_HOT
            // })
        },
        requestSoonMovie(successBK, errorBK) {
            server.requestSoonMovie(true, successBK, errorBK);
        },
        ...mapMutations({
        //changeName: types.CHANGE_NAME
        })
    },
    mounted() {
        this.requestHotMovie();
        this.requestSoonMovie(null, e => console.log(e));
    },
    components: {
        swiper,
        swiperSlide,
        Loading,
        Star,
        HomeList
    }
}
</script>

<style lang='scss'>
@import '../common/basic';
.home-con {
    .app-header {
        height: px2rem(90);
        background-color: $main-color;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        width: 100vw;
        .app-search {
            width: 50vw;
            height: 60%;
            background-color: white;
        }
    }
    .carousel-con {
        width: 95vw;
        box-sizing: border-box;
        margin: px2rem(110) auto 0 auto;
        //height: px2rem(400);
        border-radius: px2rem(15);
        background-color: #2E963D;
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
        //bottom: px2rem(20);
        //margin-right: px2rem(20);
        //text-align: right;
        position: static;
    }
    // @media screen and (max-width: 320px) and (min-resolution : 2dppx) {
    //     .movie-title {
    //         @include font-dpr(15px);
    //     }  
    // }
    // @media screen and (min-width: 1536px) {
    //     .list-con {
    //         width: 20vw !important;
    //     }
    // }
}
</style>


