<template>
    <div>
        <div class='photos-grid'>
            <div v-for='photo in paginatedPhotos' :key='photo.id' class='text-center bg-white shadow-md rounded py-4'>
                <img :class='{ "inline-block h-32 w-32": true }' :src='photo.thumbnailUrl' :alt='photo.title'>
            </div>
        </div>
        <div class='w-full bg-white shadow-md rounded p-4 text-center' v-if='!photos.length && !loading'>
            This album have no images yet
        </div>
        <div class='w-full bg-white shadow-md rounded p-4 text-center' v-if='loading'>
            Loading photos
        </div>
        <Button v-if='page*size < photos.length' @click='page++' :fullWidth='true' class='mt-8'>
            Load more photos
        </Button>
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import { PhotoApi } from '@/api/PhotoApi';
import { Photo } from '@/models/Photo';
import Button from '@/components/Button.vue';

interface State {
    photos: Photo[]
    loading: boolean
    error: string|null
    page: number
    size: number
}

@Options({
    components: {
        Button
    },
    props: {
        albumId: {
            type: Number,
            required: true
        }
    },
    data: ():State => ({
        photos: [],
        loading: false,
        error: null,
        page: 1,
        size: 10
    }),
    beforeMount() {
        this.fetchPhotos();
    },
    computed: {
        paginatedPhotos() {
            return this.photos.slice(0, this.size*this.page);
        }
    },
    methods: {
        async fetchPhotos() {
            try {
                this.loading = true;
                this.photos = await PhotoApi.list({
                    albumId: this.albumId
                });
            }
            catch {
                this.error = 'Error occurred while fetching photos for album';
            }
            finally {
                this.loading = false;
            }
        },
    },
})
export default class AlbumPhotos extends Vue {}
</script>

<style>
.photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 1.5em;
}
</style>
