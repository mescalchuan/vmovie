import Vue from 'vue'
import Vuex from 'vuex'
import homeModule from './modules/home_module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home: homeModule
    }
})