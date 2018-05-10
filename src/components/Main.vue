<template>
    <div class="app-content">
        <router-view/>
        <div class="app-tabbar">
        <div :class="['tab-item', activeTab === 'home' ? 'active' : '']" @click="changeTab('home')">
            <Icon :size="24" name="ios-home" :color="activeTab === 'home' ? '#2E963D' : '#666666'"/>
            首页
        </div>
        <div :class="['tab-item', activeTab === 'top250' ? 'active' : '']" @click="changeTab('top250')">
            <Icon :size="24" name="ios-stats" :color="activeTab === 'top250' ? '#2E963D' : '#666666'"/>
            Top250
        </div>
        <div :class="['tab-item', activeTab === 'wordmouth' ? 'active' : '']" @click="changeTab('wordmouth')">
            <Icon :size="24" name="ios-thumbs-up" :color="activeTab === 'wordmouth' ? '#2E963D' : '#666666'"/>
            口碑榜
        </div>
        <div :class="['tab-item', activeTab === 'na' ? 'active' : '']" @click="changeTab('na')">
            <Icon :size="24" name="ios-globe" :color="activeTab === 'na' ? '#2E963D' : '#666666'"/>
            北美票房榜
        </div>
        <div :class="['tab-item', activeTab === 'new' ? 'active' : '']" @click="changeTab('new')">
            <Icon :size="24" name="ios-pricetags" :color="activeTab === 'new' ? '#2E963D' : '#666666'"/>
            新片榜
        </div>
        </div>
    </div>
</template>

<script>
import Icon from '@/common/ui-components/Icon';

const changeTab = self => {
    const path = self.$route.path;
    const urlList = path.split('/');
    self.activeTab = urlList[urlList.length - 1];
}

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
            this.$router.push({
                path
            })
        }
    },
    mounted() {
        changeTab(this);
    },
    watch: {
        $route(nv, ov) {
            changeTab(this);
        }
    },
    components: {
        Icon
    }
}
</script>

<style lang='scss' scoped>
@import '../common/basic';
.app-tabbar {
    position: fixed;
    bottom: 0;
    background-color: $line-color;
    width: 100vw;
    height: px2rem(100);
    display: flex;
    border: 1px solid #969696;
    border-width: 1px 0 0 0 ;
    .tab-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #666666;
        @include font-dpr(12px);
    }
    .active {
        color: $main-color;
    }
}
.app-content {
    padding: 0 0 px2rem(120) 0;
}
</style>
