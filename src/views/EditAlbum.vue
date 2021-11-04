<template>
    <div class='w-full md:w-2/3 mx-auto'>
        <div class='mt-4'>
            <AlbumForm v-if='album' :albumTitle='album.title' :albumId='album.id' @save='handleSubmit' />
        </div>
    </div>
</template>

<script lang='ts'>
import AlbumForm from '../components/AlbumForm.vue';
import { Options, Vue } from 'vue-class-component';
import { AlbumApi, AlbumDto } from '@/api/AlbumApi';
import { updateAlbumMutation } from '@/store/store';

@Options({
    components: {
        AlbumForm,
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
        async fetchAlbum() {
            this.album = await AlbumApi.find(this.albumId);
        },
        async handleSubmit(albumDto: AlbumDto) {
            if (this.loading)
                return;

            try {
                if (this.album.title !== albumDto.title) {
                    this.loading = true;
                    await AlbumApi.update(albumDto);
                    this.$store.commit(updateAlbumMutation(albumDto));
                }

                this.$router.push({
                    name: 'Album preview',
                    params: {
                        id: this.albumId,
                    },
                });
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
        },
    },
})
export default class Album extends Vue {
}
</script>
