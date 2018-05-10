<template>
    <div style="overflow:hidden">
        <Header title="口碑榜"/>
        <Loading :isShow="isLoading"/>
        <div v-if="!isLoading" class="movie-list">
            <div class="list-con" v-for="(item, index) in list" :key="index" @click="gotoDetail(item.subject.id)">
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
import {mapState} from 'vuex';
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
        gotoDetail(id) {
            this.$router.push({
                path: '/moviedetail/' + id
            })
        },
        requestWordMouth: server.requestWordMouth
    },
    mounted() {
        this.requestWordMouth().then(null, err => {
            console.log(err);
        })
        .catch(err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>
@import '../common/list';
</style>
