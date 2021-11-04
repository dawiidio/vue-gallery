<template>
    <div>
        <div class='w-full md:w-2/3 mx-auto relative mt-2' v-for='album in albums' :key='album.id'>
            <AlbumListItem :album='album' />
        </div>
        <div class='w-full bg-white shadow-md rounded p-4 text-center' v-if='loading'>
            Loading albums
        </div>
        <div class='w-full bg-white shadow-md rounded p-4 text-center' v-if='!albums.length && !loading'>
            No albums found
        </div>
    </div>
</template>

<script lang='ts'>
import AlbumListItem from '@/components/AlbumListItem.vue';
import { Options, Vue } from 'vue-class-component';
import { fetchAlbumsAction } from '@/store/store';
import Button from '@/components/Button.vue';

@Options({
    components: {
        AlbumListItem,
        Button
    },
    computed: {
        albums() {
            return this.$store.getters.albumsWithLikes;
        },
        loading() {
            return this.$store.state.albums.list.loading;
        }
    },
    mounted() {
        if (!this.albums.length)
            this.$store.dispatch(fetchAlbumsAction());
    },
})
export default class AlbumsList extends Vue {}
</script>
