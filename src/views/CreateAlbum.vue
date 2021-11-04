<template>
    <div class='w-full md:w-2/3 mx-auto'>
        <div class='mt-4'>
            <AlbumForm @save='handleSubmit' />
        </div>
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import LikeButton from '../components/LikeButton.vue';
import AlbumForm from '@/components/AlbumForm.vue';
import { AlbumApi, AlbumDto } from '@/api/AlbumApi';
import { createAlbumMutation } from '@/store/store';

@Options({
    components: {
        LikeButton,
        AlbumForm
    },
    methods: {
        async handleSubmit(albumDto: AlbumDto) {
            if (this.loading)
                return;

            try {
                this.loading = true;
                const album = await AlbumApi.create(albumDto);
                this.$store.commit(createAlbumMutation(album));

                this.$router.push({
                    name: 'Album preview',
                    params: {
                        id: album.id,
                    },
                });
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
        },
    }
})
export default class Album extends Vue {
}
</script>
