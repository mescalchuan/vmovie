<template>
    <div v-if='isShow' class='app-loading-mask'>
        <img src='@/assets/loading.gif' alt='loading'/>
    </div>
</template>

<script>
/* 页面加载中组件 */
export default {
    name: 'Loading',
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../basic';
.app-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    img {
        width: px2rem(100);
        height: px2rem(100);
    }
}
</style>
