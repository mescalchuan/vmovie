<template>
    <i class="app-icon" :style="{color, fontSize: getFontSize}">{{getIconValue}}</i>    
</template>

<script>
/* 图标组件->基于Ionicons */
import utils from "@/common/utils.js";
import IconMap from "@/common/iconMap.json";

export default {
    name: "Icon",
    computed: {
        getIconValue() {
            return String.fromCharCode(IconMap[this.name]);
        },
        getFontSize() {
            return utils.getFontSize(this.size);
        }
    },
    props: {
        name: {
            type: String,
            default: "ios-add",
        },
        size: {
            type: Number,
            default: 30
        },
        color: {
            type: String,
            default: "#666666"
        }
    }
}
</script>

<style scoped>
.app-icon {
    font-family: "Ionicons"
}
</style>


