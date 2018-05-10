<template>
    <div class="app-header">
        <h1>{{this.title}}</h1>
    </div>
</template>

<script>
/* 头部导航组件 */
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../basic';
.app-header {
    width: 100vw;
    height: px2rem(90);
    background-color: $main-color;
    text-align: center;
    line-height: px2rem(90);
    position: fixed;
    top: 0;
    h1 {
        @include font-dpr(18px);
        color: white;
    }
}
</style>
