<template>
    <div>
        <Search 
            @newWords="changeWords" 
            :searchWords="searchWords" 
            :submit="searchByWords" 
            :autoClose="true"
            :needBack="true"
        />
        <movie-list :isDynamic="true" :dynamicInfo="{
            [type == 'tag' ? 'tag' : 'q']: searchWords
        }" ref="movieList"/>
    </div>
</template>

<script>
import Search from '@/common/ui-components/Search';
import MovieList from './MovieList';
import {MOVIE_LIST_TYPE, TAG} from '@/common/config';
import * as server from '@/server/movie_list_server';

export default {
    name: 'SearchResult',
    data() {
        const {tag, q} = this.$route.query;
        return {
            type: tag ? 'tag' : 'q', 
            searchWords: tag ? tag : q
        }
    },
    
    methods: {
        changeWords(nv) {
            this.searchWords = nv;
            this.type = !!(~TAG.indexOf(nv)) ? 'tag' : 'q';
        },
        searchByWords() {
            this.$refs.movieList.start = 20;
            server.requestMovieList(MOVIE_LIST_TYPE.SEARCH, this.searchWords, this.type)
            .then(null, err => console.log(err))
            .catch(err => console.log(err))
        }
    },
    components: {
        Search,
        MovieList
    }
}
</script>

<style lang="scss" scoped>
    
</style>
