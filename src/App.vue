<template>
  <div id="app">
    <div class="app-header">
      <div class="app-search">
        <Icon :size="30" name="ios-alarm" color="blue"/>
      </div>
    </div>
    <router-view/>
    <div class="app-tabbar">123</div>
  </div>
</template>

<script>
import * as types from "@/vuex/types";
import Icon from "@/common/ui-components/Icon";
export default {
  name: 'App',
  components: {
    Icon
  },
  mounted() {
   
  }
}
</script>

<style lang="scss">
@import './common/basic';
@font-face {
  font-family: "Ionicons";
  src: url("./fonts/Ionicons.ttf");
  font-style: italic;
}
.app-header {
  height: px2rem(90);
  background-color: $main-color;
  display: flex;
  justify-content: center;
  align-items: center;
  .app-search {
    width: 50vw;
    height: 60%;
    background-color: white;
  }
}
.app-tabbar {
  position: fixed;
  bottom: 0;
  background-color: #eeeeee;
  width: 100vw;
  height: px2rem(100);
}
</style>
