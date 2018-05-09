<template>
    <div class="home-con">
        <Loading :isShow="hIsLoading || sIsLoading"/>
        <div v-if="!hIsLoading && !sIsLoading">
            <!-- <div class="app-header">
                <div class="app-search" @click="showModal">
                    <Icon :size="30" name="ios-alarm" color="blue"/>
                </div>
            </div> -->
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
        <!-- <Modal v-if="modalShow" backgroundColor="white">
            <div class="search-con">
                <div @click="closeModal">
                    <Icon name="ios-arrow-back" color="white" size="25"/>
                </div>
                <div class="input-con">
                    <input type="text" v-model="searchWords"/>  
                    <div @click="searchByWord">
                        <Icon name="ios-search-outline" color="#333333" size="25"/>
                    </div>
                </div>  
                <Icon name="ios-search-outline" color="transparent" size="25"/>
            </div>
        </Modal>    -->
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {mapState, mapMutations, mapActions} from 'vuex';
import * as server from '@/server/home_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';
import HomeList from '@/common/ui-components/HomeList';
import Search from '@/common/ui-components/Search';
import {TAG} from '@/common/config';
// import Modal from '@/common/ui-components/Modal';
// import Icon from '@/common/ui-components/Icon';
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
            searchWords: '',
            // modalShow: false,
            // searchWords: '',
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
            sIsLoading: state => state.home.sIsLoading,
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
        changeWords(nv) {
            console.log(nv);
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
            console.log(this.searchWords)
        },
        // showModal() {
        //     this.modalShow = true;
        // },
        // closeModal() {
        //     this.modalShow = false;
        // },
        // searchByWord() {
        //     console.log(this.searchWords)
        //     this.$router.push({
        //         path: '/search_result'
        //     })
        // },
        requestHotMovie: server.requestHotMovie,
            // console.log(getDataByServer)
            // getDataByServer(urls.SERVER_BASE + urls.HOT_MOVIE, null).then(res => console.log(res))
            // this.$store.dispatch({
            //     type: types.GET_HOT
            // })
        requestSoonMovie: server.requestSoonMovie,
        gotoDetail(id) {
            this.$router.push({
                path: '/moviedetail/' + id
            })
        },
        ...mapMutations({
        //changeName: types.CHANGE_NAME
        })
    },
    mounted() {
        this.requestHotMovie();
        this.requestSoonMovie();
    },
    components: {
        swiper,
        swiperSlide,
        Loading,
        Star,
        HomeList,
        Search
        //Modal,
        //Icon
    }
}
</script>

<style lang='scss'>
@import '../common/basic';
.home-con {
    // .app-header {
    //     height: px2rem(90);
    //     background-color: $main-color;
    //     position: fixed;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     z-index: 2;
    //     width: 100vw;
    //     .app-search {
    //         width: 50vw;
    //         height: 60%;
    //         background-color: white;
    //     }
    // }
    .carousel-con {
        width: 95vw;
        box-sizing: border-box;
        margin: px2rem(110) auto 0 auto;
        //height: px2rem(400);
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
        //bottom: px2rem(20);
        //margin-right: px2rem(20);
        //text-align: right;
        position: static;
    }
    // .search-con {
    //     height: px2rem(90);
    //     background-color: #2E963D;
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 0 px2rem(20);
    //     .input-con {
    //         height: px2rem(50);
    //         display: flex;
    //         align-items: center;
    //         box-sizing: border-box;
    //         border-radius: px2rem(10);
    //         padding: 0 px2rem(10);
    //         // line-height: px2rem(40);
    //         background-color: white;
    //         input {
    //             height: px2rem(50);
    //             border: 0;
    //             @include font-dpr(15px);
    //         }
    //     }   
    // }
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


