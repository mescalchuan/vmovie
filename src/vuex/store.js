import Vue from 'vue'
import Vuex from 'vuex'
import homeModule from './modules/home_module';
import movieListModule from './modules/movie_list';
import wordMouthListModule from './modules/word_mouth';
import NAModule from './modules/na';
import movieDetail from './modules/movie_detail';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home: homeModule,
        movieList: movieListModule,
        wordMouthList: wordMouthListModule,
        na: NAModule,
        movieDetail
    }
})