<template>
    <div>
        <div class="app-header">
            <div @click="goback">
                <Icon name="ios-arrow-back" color="white" size="25"/>
            </div>
            <div class="app-search" @click="showModal">
                <Icon name="ios-search-outline" color="#333333" size="25"/>
            </div>
            <Icon name="ios-search-outline" color="transparent" size="25"/>
        </div>
        <Modal v-if="modalShow" backgroundColor="white">
            <div class="search-con">
                <div @click="closeModal">
                    <Icon name="ios-arrow-back" color="white" size="25"/>
                </div>
                <div class="input-con">
                    <input type="text" v-model="searchWords"/>  
                    <div @click="submit">
                        <Icon name="ios-search-outline" color="#333333" size="25"/>
                    </div>
                </div>  
                <Icon name="ios-search-outline" color="transparent" size="25"/>
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from '@/common/ui-components/Modal';
import Icon from '@/common/ui-components/Icon';
export default {
    name: 'Search',
    data() {
        return {
            _selfWords: this.searchWords,
            modalShow: false,
            //searchWords: ''
        }
    },
    props: {
        searchWords: {
            type: String,
            default: ''
        },
        submit: {
            type: Function,
            default: () => {}
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
        background-color: #2E963D;
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
            border-radius: px2rem(10);
            background-color: white;
            text-align: right;
            box-sizing: border-box;
            padding: 0 px2rem(10);
        }
    }
    .search-con {
        height: px2rem(90);
        background-color: #2E963D;
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
</style>
