<template>
    <div class='w-full md:w-2/3 mx-auto'>
        <div class='flex items-center mb-8 mt-4 shadow-md flex-col md:flex-row bg-white rounded px-8 pt-6 pb-8 mb-4'>
            <div class='flex-1'>
                <h3 class='text-xl'>{{ album?.title || '' }}</h3>
            </div>
            <div>
                <Button @click='deleteAlbum'
                        variant='text'
                        color='secondary'
                        class='flex-1 md:flex-grow-0'
                        :disabled='loading'
                >
                    <font-awesome-icon size='lg' icon='trash' />
                </Button>
                <Button @click="$router.push({ name: 'Edit album', params: { id: album.id } })"
                        variant='text'
                        color='secondary'
                        class='flex-1 md:flex-grow-0'
                        :disabled='loading'
                >
                    <font-awesome-icon size='lg' icon='edit' />
                </Button>
                <LikeButton :albumId='albumId' />
            </div>
        </div>
        <AlbumPhotos :albumId='albumId' />
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import { AlbumApi } from '@/api/AlbumApi';
import LikeButton from '../components/LikeButton.vue';
import AlbumPhotos from '@/components/AlbumPhotos.vue';
import Button from '@/components/Button.vue';
import { deleteAlbumMutation } from '@/store/store';

@Options({
    components: {
        LikeButton,
        AlbumPhotos,
        Button,
    },
    computed: {
        albumId() {
            return Number(this.$route.params.id);
        },
    },
    data: () => ({
        album: null,
        loading: false,
        error: null,
    }),
    beforeMount() {
        this.album = this.$store.getters.getAlbumWithLikeById(this.albumId);

        if (!this.album) {
            this.fetchAlbum();
        }
    },
    methods: {
        async deleteAlbum() {
            try {
                this.loading = true;
                this.album = await AlbumApi.delete(this.albumId);
                this.$store.commit(deleteAlbumMutation(this.albumId));
                this.$router.push({ name: 'Albums list' });
            } catch {
                this.error = 'Error occurred while deleting album';
            } finally {
                this.loading = false;
            }
        },
        async fetchAlbum() {
            try {
                this.loading = true;
                this.album = await AlbumApi.find(this.albumId);
            } catch {
                this.error = 'Error occurred while fetching photos for album';
            } finally {
                this.loading = false;
            }
        },
    },
})
export default class AlbumPreview extends Vue {
}
</script>
