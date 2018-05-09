<template>
    <div>
        <div class="app-header">
            <div @click="goback">
                <Icon name="ios-arrow-back" :style="{color: needBack ? 'white' : 'transparent'}" size="25"/>
            </div>
            <div class="app-search" @click="showModal">
                <Icon name="ios-search-outline" color="#333333" size="25"/>
                <p>{{searchWords}}</p>
            </div>
            <Icon name="ios-search-outline" color="transparent" size="25"/>
        </div>
        <Modal v-if="modalShow" backgroundColor="white">
            <div class="search-con">
                <div @click="closeModal">
                    <Icon name="ios-arrow-back" color="white" size="25"/>
                </div>
                <div class="input-con">
                    <input type="text" v-model="searchWords" ref="input"/>  
                    <div @click="searchClick()">
                        <Icon name="ios-search-outline" color="#333333" size="25"/>
                    </div>
                </div>  
                <Icon name="ios-search-outline" color="transparent" size="25"/>
            </div>
            <div class="modal-content">
                <div class="tag-con">
                    <div class="tag-item" v-for="(tag, index) in tagList" :key="index" @click="setSearchTag(tag)">
                        <Icon :size="30" :name="iconList[index]"/>
                        <p class="tag-text">{{tag}}</p>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from './Modal';
import Icon from './Icon';
import {TAG, TAG_ICON} from '../config';

export default {
    name: 'Search',
    data() {
        return {
            iconList: TAG_ICON, 
            //_selfWords: this.searchWords,
            modalShow: false,
            tagList: TAG
            //searchWords: ''
        }
    },
    props: {
        searchWords: {
            type: String,
            default: ''
        },
        autoClose: {
            type: Boolean,
            default: false
        },
        submit: {
            type: Function,
            default: () => {}
        },
        needBack: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showModal() {
            this.modalShow = true;
        },
        closeModal() {
            this.modalShow = false;
        },
        goback() {
            this.$router.back();
        },
        setSearchTag(tag) {
            this.$emit('newWords', tag);
        },
        searchClick() {
            this.submit();
            this.autoClose && this.closeModal();
        }
        // searchByWord() {
        //     console.log(this.searchWords)
        //     this.$router.push({
        //         path: '/search_result'
        //     })
        // },
    },
    mounted() {
        console.log(this.searchWords)
    },
    watch: {
        searchWords(nv, ov) {
            this.$emit('newWords', nv);
        },
        modalShow(nv, ov) {
            //nv && !ov && this.$refs.input.focus()
            if(nv && !ov) {
                this.$nextTick(() => {
                    this.$refs.input.focus();
                })
                //console.log(this.$refs.input)
            }
        }
    },
    components: {
        Icon,
        Modal
    }
}
</script>

<style lang="scss" scoped>
@import '../basic';
.app-header {
    height: px2rem(90);
    background-color: $main-color;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    padding: 0 px2rem(20);
    width: 100vw;
    .app-search {
        width: 50vw;
        height: px2rem(50);
        line-height: px2rem(50);
        border-radius: px2rem(10);
        background-color: white;
        text-align: right;
        box-sizing: border-box;
        padding: 0 px2rem(10);
        display: flex;
        > p {
            margin-left: px2rem(5);
            @include font-dpr(15px);
        }
    }
}
.search-con {
    height: px2rem(90);
    background-color: $main-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px2rem(20);
    .input-con {
        height: px2rem(50);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-radius: px2rem(10);
        padding: 0 px2rem(10);
        // line-height: px2rem(40);
        background-color: white;
        input {
            height: px2rem(50);
            border: 0;
            @include font-dpr(15px);
        }
    }   
}
.modal-content {
    height: 100vh;
    padding: px2rem(20);
    .tag-con {
        display: flex;
        justify-content: center;
        .tag-item {
            flex-shrink: 0;
            margin-left: px2rem(40);
            text-align: center;
            &:nth-child(1) {
                margin-left: 0;
            }
            .tag-text {
                @include font-dpr(13px);
            }
        }
    }
}
</style>
