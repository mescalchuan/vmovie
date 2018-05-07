<template>
    <div>
        <Loading :isShow="isLoading"/>
        <div class="detail-con" v-if="!isLoading">
            <div class="detail-main-img">
                <img :src="detail.images.large" :alt="detail.alt">
            </div>
            <div class="detail-info">
                <div>
                    <p class="detail-title">{{detail.title}}</p>
                    <p class="detail-text">{{detail.year}}/{{detail.genres.join('/')}}</p>
                    <p class="detail-text">原名: {{detail.original_title}}</p>
                    <p class="detail-text">导演: {{detail.directors.map(dir => dir.name).join('/')}}</p>
                    <p class="detail-text">主演: {{detail.casts.map(cast => cast.name).join('/')}}</p>
                </div>
                <div class="rate-info">
                    <p class="rate-text">综合评分</p>
                    <p class="rate-result">{{detail.rating.average/2}}</p>
                    <Star :goodNum="detail.rating.average/2" :size="18"/>
                    <p class="rate-text">{{detail.ratings_count}}人</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Header from '@/common/ui-components/Header';
import {mapState, mapMutations} from 'vuex';
import * as server from '@/server/movie_detail_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';

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
        }
    },
    mounted() {
        console.log(this.$route.params.id);
        this.requestMovieDetail(this.$route.params.id)
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
            
            text-overflow:ellipsis;
                overflow: hidden;
                white-space: nowrap;
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
    }
}
</style>
