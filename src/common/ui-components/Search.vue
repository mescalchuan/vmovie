<template>
    <div>
        <div class="app-header">
            <div class="app-search" @click="showModal">
                <Icon :size="30" name="ios-alarm" color="blue"/>
            </div>
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
    name: 'SearchResult',
    data() {
        return {
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
        // searchByWord() {
        //     console.log(this.searchWords)
        //     this.$router.push({
        //         path: '/search_result'
        //     })
        // },
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
