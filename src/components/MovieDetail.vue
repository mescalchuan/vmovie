<template>
    <div>
        <Loading :isShow="isLoading"/>
        <div class="detail-con" v-if="!isLoading">
            <div class="detail-main-img">
                <img :src="detail.images.large" :alt="detail.alt">
            </div>
            <div class="detail-info">
                <p class="detail-title">{{detail.title}}</p>
                <p class="detail-text">{{detail.year}}/{{detail.genres.join('/')}}</p>
                <p class="detail-text">原名: {{detail.original_title}}</p>
                <p class="detail-text">导演: {{detail.directors.map(dir => dir.name).join('/')}}</p>
                <p class="detail-text">主演: {{detail.casts.map(cast => cast.name).join('/')}}</p>
                <div class="rate-info">
                    <p class="rate-text">综合评分</p>
                    <p class="rate-result">{{detail.rating.average/2}}</p>
                    <Star :goodNum="detail.rating.average/2" :size="18"/>
                    <p class="rate-text">{{detail.ratings_count}}人</p>
                </div>
                <p class="detail-text-middle margin-top-25">简介</p>
                <p class="detail-text margin-top-25">{{detail.summary}}</p>
                <p class="detail-text-middle margin-top-25">演员</p>
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item, index) in detail.casts" :key="index">
                        <!-- <div class="carousel-con" @click="gotoDetail(item.id)">
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
                        </div> -->
                        <div><img :src="item.avatars.medium" alt=""></div>
                    </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            </div>
        </div>
    </div>
</template>

<script>

import Header from '@/common/ui-components/Header';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {mapState, mapMutations} from 'vuex';
import * as server from '@/server/movie_detail_server';
import {CLEAR_DETAIL} from '@/vuex/types';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';
import 'swiper/dist/css/swiper.css';

export default {
    name: 'MovieDetail',
    computed: {
        ...mapState({
            isLoading: state => state.movieDetail.isLoading,
            detail: state => state.movieDetail.detail
        })
    },
    methods: {
        requestMovieDetail(id) {
            server.requestMovieDetail(id);
        },
        ...mapMutations({
            clearDetail: CLEAR_DETAIL
        })
    },
    mounted() {
        this.requestMovieDetail(this.$route.params.id);
    },
    components: {
        Loading,
        Star
    }
}
</script>

<style lang='scss' scoped>
@import '../common/basic';

.detail-con {
    .detail-main-img {
        padding: px2rem(50) 0;
        text-align: center;
        //background-color: #2E963D;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#2E963D), to(white));  
        line-height: 0 /*img bottom 1px bug*/;
        img {
            //display: inline-block;
        }
    }
    .detail-info {
        height: 1000px;
        background-color: #eeeeee;
        box-shadow: -1px -5px 10px #888888;
        padding: px2rem(30) px2rem(20);
        position: relative;
        .detail-title {
            @include font-dpr(18px);
            margin-bottom: px2rem(30);
        }
        .detail-text {
            @include font-dpr(13px);
            color: #666666;
            margin-top: px2rem(5);
        }
        .rate-info {
            width: px2rem(190);
            height: px2rem(190);
            background-color: white;
            position: absolute;
            top: px2rem(30);
            right: px2rem(20);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .rate-text {
                color: #666666;
                @include font-dpr(12px);
            }
            .rate-result {
                color: #333333;
                @include font-dpr(18px);
            }
        }
        .detail-text-middle {
             @include font-dpr(14px);
            color: #333333;
        }
    }
}
.margin-top-25 {
    margin-top: px2rem(25) !important;
}
</style>
