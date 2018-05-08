<template>
    <div>
        <Search :searchWords="searchWords" :submit="searchByWords"/>
        <movie-list/>
    </div>
</template>

<script>
import Search from '@/common/ui-components/Search';
import MovieList from './MovieList';
export default {
    name: 'SearchResult',
    data() {
        return {
            searchWords: this.$route.query.q
        }
    },
    searchByWords() {
        console.log(this.searchWords)
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
