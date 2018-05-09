<template>
    <div style="overflow:hidden">
        <Header title="口碑榜"/>
        <Loading :isShow="isLoading"/>
        <div v-if="!isLoading" class="movie-list">
            <div class="list-con" v-for="(item, index) in list" :key="index">
                <img :src="item.subject.images.medium" alt="carousel.jpg">
                <div class="movie-info">
                    <p class="movie-title">{{item.subject.title}}</p>
                    <span class="movie-actor">
                        导演:
                        <span class="movie-director-name">{{item.subject.directors[0].name}}</span>
                    </span>
                    <span class="movie-actor">
                        主演:
                        <span v-for="(actor, aIndex) in item.subject.casts" :key="aIndex">{{actor.name}} </span>
                    </span>
                    <p class="movie-actor">{{item.subject.collect_count}} 人看过</p>
                    <div class="movie-rating">
                        <Star :goodNum="item.subject.rating.average/2"/> <span style="margin-left:0.04rem;color:#FFD716">{{item.subject.rating.average.toFixed(1)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/common/ui-components/Header';
import {mapState, mapMutations} from 'vuex';
import * as server from '@/server/word_mouth_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';

export default {
    name: 'WordMouthList',
    components: {
        Header,
        Star,
        Loading
    },
    computed: {
        ...mapState({
            isLoading: state => state.wordMouthList.isLoading,
            list: state => state.wordMouthList.list
        })
    },
    methods: {
        requestWordMouth: server.requestWordMouth
    },
    mounted() {
        this.requestWordMouth();
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
        background-color: $line-color;
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
</style>

