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
                <div class="cast-con margin-top-25">
                    <div class="cast-list" v-for="(cast, cIndex) in detail.casts" :key="cIndex">
                        <img :src="cast.avatars && cast.avatars.medium" :alt="cast.avatars && cast.avatars.alt">
                        <p class="detail-text">{{cast.name}}</p>
                    </div>
                </div>
                <p class="detail-text-middle margin-top-25">剧照</p>
                <div class="cast-con margin-top-25">
                    <div class="photo-list" v-for="(photo, pIndex) in detail.photos.photos" :key="pIndex" @click="showModal(pIndex)">
                        <img :src="photo.image" alt="photo.alt">
                    </div>
                    <div class="photo-list photo-more">
                        <!-- 查看全部
                        <div class="photo-more-line"></div>
                        {{detail.photos.total}}张 -->
                        点击图片
                        <br/>
                        查看大图
                    </div>
                </div>
                <p class="detail-text-middle margin-top-25">评论</p>
                <div class="comment-con">
                    <div class="comment-list margin-top-30" v-for="(comment, cmIndex) in detail.shortComments.comments" :key="cmIndex">
                        <img :src="comment.author.avatar" alt="comment.author.alt">
                        <div class="comment-info">
                            <div class="comment-header">
                                <div>
                                    <span class="detail-text-middle">{{comment.author.name}}</span>
                                    <star :goodNum="comment.rating.value" :size="15"/>
                                </div>
                                <div>
                                    <Icon name="ios-thumbs-up" :size="15"/>
                                    <span class="detail-text">{{comment.useful_count}}</span>
                                </div>
                            </div>
                            <p class="detail-text margin-top-5">{{comment.content}}</p>
                            <p class="detail-text-small margin-top-10" style="text-align:right">{{comment.created_at}}</p>
                        </div>
                    </div>
                    <p class="detail-title more-comments-text" v-if="!gettingMore && detail.shortComments.comments.length < detail.shortComments.total" @click="requestMoreShortComments($route.params.id, detail.shortComments.next_start)">加载更多评论</p>
                    <p class="detail-title more-comments-text" v-else-if="!gettingMore && detail.shortComments.comments.length >= detail.shortComments.total">已加载全部评论</p>
                    <p class="detail-title more-comments-text" v-else>加载中.....</p>
                </div>
            </div>
            <Modal v-if="modalShow" :callback="closeModal">
                <div class="modal-con">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide v-for="(photo, pIndex) in detail.photos.photos" :key="pIndex">
                            <img class="photo-detail" :src="photo.image" alt="photo.alt">
                        </swiper-slide>
                    </swiper>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {mapState, mapMutations} from 'vuex';
import * as server from '@/server/movie_detail_server';
import Loading from '@/common/ui-components/Loading';
import Star from '@/common/ui-components/Star';
import Icon from '@/common/ui-components/Icon';
import Modal from '@/common/ui-components/Modal';
import 'swiper/dist/css/swiper.min.css';

export default {
    name: 'MovieDetail',
    data() {
        return {
            start: 0,
            modalShow: false,
            swiperOption: {
                autoplay: false,
                // pagination: {
                //     el: '.swiper-pagination'
                // },
                on: {
                    // reachEnd: () => {
                    //     this.start += 5;
                    //     this.requestMoviePhotos(this.$route.params.id, this.start)
                    // }
                },
                initialSlide: 0,

            }
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.movieDetail.isLoading,
            gettingMore: state => state.movieDetail.gettingMore,
            detail: state => state.movieDetail.detail
        })
    },
    methods: {
        requestMovieDetail: server.requestMovieDetail,
        requestMoviePhotos: server.requestMoviePhotos,
        requestMoreShortComments(id, start) {
            server.requestMoreShortComments(id, start)
            .then(null, err => console.log(err))
            .catch(err => console.log(err))
        },
        requestMovieShortComments: server.requestMovieShortComments,
        showModal(index) {
            this.swiperOption.initialSlide = index;
            this.modalShow = true;
        },
        closeModal() {
            this.modalShow = false;
        }
    },
    mounted() {
        this.requestMovieDetail(this.$route.params.id)
        .then(() => this.requestMoviePhotos(this.$route.params.id, 0))
        .then(() => this.requestMovieShortComments(this.$route.params.id, 0))
        .catch(err => console.log(err))
    },
    components: {
        Loading,
        Star,
        Icon,
        Modal,
        swiper,
        swiperSlide
    }
}
</script>

<style lang='scss' scoped>
@import '../common/basic';

.detail-con {
    .detail-main-img {
        padding: px2rem(50) 0;
        text-align: center;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from($main-color), to(white));
        line-height: 0 /*img bottom 1px bug*/;
    }
    .detail-info {
        background-color: $line-color;
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
                color: $minor-color;
                @include font-dpr(18px);
            }
        }
        .detail-text-middle {
            @include font-dpr(14px);
            color: $minor-color;
        }
        .detail-text-small {
            @include font-dpr(12px);
            color: $minor-color;
        }
        .cast-con {
            display: flex;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            //溢出可滚动，但隐藏滚动条
            &::-webkit-scrollbar {
                display:none;
            }
            .cast-list {
                width: px2rem(180);
                margin-left: px2rem(10);
                text-align: center;
                &:nth-child(1) {
                    margin-left: 0
                }
                img {
                    width: px2rem(180);
                    height: px2rem(255);
                }
                p {
                    text-overflow:ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .photo-list {
                width: px2rem(300);
                height: px2rem(200);
                margin-left: px2rem(10);
                overflow: hidden;
                flex-shrink: 0;
                &:nth-child(1) {
                    margin-left: 0
                }
                img {
                    width: auto;
                    height: px2rem(200);
                }
            }
            .photo-more {
                background-color: #a39f9f;
                flex-shrink: 0;
                width: px2rem(200);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                @include font-dpr(12px);
                color: white;
                .photo-more-line {
                    width: px2rem(80);
                    height: px2rem(3);
                    background-color: white;
                    margin: px2rem(5) 0;
                }
            }
        }
        .comment-con {
            display: flex;
            flex-direction: column;
            .comment-list {
                display: flex;
                padding: px2rem(10) 0;
                img {
                    width: px2rem(48);
                    height: px2rem(48);
                    border-radius: px2rem(48);
                }
                .comment-info {
                    flex: 1;
                    padding-left: px2rem(20);
                    .comment-header {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
            .more-comments-text {
                color: $main-color;
                text-align: center;
                margin-top: px2rem(25);
                margin-bottom: 0;
            }
        }
    }
    .photo-detail {
        width: 100vw;
        height: auto;
    }
    .modal-con {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .swiper-slide {
            align-self: center;
        }
    }
}
</style>
