import Vue from 'vue'
import Vuex from 'vuex'
import homeModule from './modules/home_module';
import movieListModule from './modules/movie_list';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home: homeModule,
        movieList: movieListModule
    }
})