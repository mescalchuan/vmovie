<template>
    <div>
        <Search @newWords="changeWords" :searchWords="searchWords" :submit="searchByWords"/>
        <movie-list/>
    </div>
</template>

<script>
import Search from '@/common/ui-components/Search';
import MovieList from './MovieList';
import {MOVIE_LIST_TYPE} from '@/common/config';
import * as server from '@/server/movie_list_server';
export default {
    name: 'SearchResult',
    data() {
        return {
            searchWords: this.$route.query.q
        }
    },
    
    methods: {
        changeWords(nv) {
            console.log(nv);
            this.searchWords = nv;
        },
        searchByWords() {
            console.log(this.searchWords)
            server.requestMovieList(MOVIE_LIST_TYPE.SEARCH, true, this.searchWords)
        }
    },
    beforeMount() {
        console.log(this.$route.query.q)
    },
    components: {
        Search,
        MovieList
    }
}
</script>

<style lang="scss" scoped>
    
</style>
