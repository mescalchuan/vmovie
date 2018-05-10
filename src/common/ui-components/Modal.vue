<template>
    <div class="modal-mask" :style="{backgroundColor}" @click="callback">
        <slot></slot>
    </div>
</template>

<script>
/* 弹出框组件 */
export default {
    name: 'Modal',
    props: {
        backgroundColor: {
            type: String,
            default: 'rgba(0, 0, 0, 0.5)'
        },
        callback: {
            type: Function,
            default: () => {}
        }
    },
    mounted() {
        //弹层出现后禁止外部滚动
        document.documentElement.style.overflow = 'hidden';
    },
    beforeDestroy() {
        //恢复滚动
        document.documentElement.style.overflow = 'visible';
    }
}
</script>

<style lang='scss' scoped>
@import '../basic';

.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
}
</style>
