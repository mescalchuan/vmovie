<template>
    <div>
        <p class="panel">{{title}}</p>
        <div class="movie-list">
            <div class="list-con" v-for="(item, index) in list" :key="index" @click="gotoDetail(item.id)">
                <img :src="item.images.medium" alt="movie.jpg">
                <div class="list-bottom">
                    <p>{{item.title}}</p>
                    <Star :size="15" :goodNum="item.rating.average/2"/> <span style="margin:0.04rem;color:#FFD716">{{item.rating.average.toFixed(1)}}</span>
                </div>
            </div>
            <div class="list-con" v-for="(item, index) in listLeft" :key="index"></div>
        </div>
    </div>
</template>

<script>
import Star from '@/common/ui-components/Star';
export default {
    name: 'HomeList',
    props: {
        list: {
            type: Array,
            default: []
        },
        listLeft: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        gotoDetail(id) {
            this.$router.push({
                path: '/moviedetail/' + id
            })
        }
    },
    components: {
        Star
    }
}  
</script>

<style lang="scss" scoped>
@import '../basic';
.movie-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: -0.26667rem 0.26667rem 0 0.26667rem;
    .list-con {
        width: 30vw;//px2rem(225);
        height: px2rem(315);
        margin-top: px2rem(20);
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .list-bottom {
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: $main-color;
            padding: px2rem(10) 0;
            text-align: center;
            p {
                color: white;
                text-overflow:ellipsis;
                overflow: hidden;
                white-space: nowrap;
                @include font-dpr(13px);
            }
        }
    }
}
.panel {
    margin: px2rem(30);
    @include font-dpr(15px);
}
@media screen and (min-width: 1536px) and (max-width: 2731px) {
    .list-con {
        width: 20vw !important;
    }
}
@media screen and (min-width: 2732px) {
    .list-con {
        width: 10vw !important;
    }
}
</style>


