<template>
    <div class="app-header">
        <h1>{{this.title}}</h1>
    </div>
</template>

<script>
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
    background-color: #2E963D;
    text-align: center;
    line-height: px2rem(90);
    position: fixed;
    h1 {
        @include font-dpr(18px);
        color: white;
    }
}
</style>
