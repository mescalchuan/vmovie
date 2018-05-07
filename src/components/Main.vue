<template>
    <div class="app-content">
        <router-view/>
        <div class="app-tabbar">
        <div :class="['tab-item', activeTab === 'home' ? 'active' : '']" @click="changeTab('home')">home</div>
        <div :class="['tab-item', activeTab === 'top250' ? 'active' : '']" @click="changeTab('top250')">top250</div>
        <div :class="['tab-item', activeTab === 'wordmouth' ? 'active' : '']" @click="changeTab('wordmouth')">口碑榜</div>
        <div :class="['tab-item', activeTab === 'na' ? 'active' : '']" @click="changeTab('na')">北美票房榜</div>
        <div :class="['tab-item', activeTab === 'new' ? 'active' : '']" @click="changeTab('new')">新片榜</div>
        </div>
    </div>
</template>

<script>
import * as types from "@/vuex/types";
export default {
    name: 'Main',

    data() {
        return {
        activeTab: 'home'
        }
    },
    methods: {
        changeTab(name) {
            this.activeTab = name;
            let path = '/home';
            switch(name) {
                case 'home':
                path = '/home';
                break;
                case 'top250':
                path = '/list/' + name;
                break;
                case 'wordmouth':
                path = '/wordmouth';
                break;
                case 'na':
                path = '/na';
                break;
                case 'new':
                path = '/list/' + name;
                break;
                default:
                break;
            }
            //const path = name === 'home' ? '/home' : '/list/' + name;
            
            this.$router.push({
                path
            })
        }
    },
}
</script>

<style lang='scss' scoped>
@import '../common/basic';
.app-tabbar {
    position: fixed;
    bottom: 0;
    background-color: #eeeeee;
    width: 100vw;
    height: px2rem(100);
    display: flex;
    .tab-item {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .active {
        color: #2E963D;
    }
}
.app-content {
    padding: 0 0 px2rem(120) 0;
}
</style>
