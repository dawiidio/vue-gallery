<template>
    <div class='mb-5 bg-white shadow-md w-full flex focus:outline-none focus:ring focus:ring-indigo-300'>
        <router-link :to="{ name: 'Album preview', params: { id: album.id } }" class='h-32 w-32 bg-gray-100 '>
            <img :class='{ "inline-block h-32 w-32": true, "filter grayscale opacity-50": !album.liked }'
                 src='https://source.unsplash.com/random/100x100' :alt='album.title'>
        </router-link>
        <div class='flex flex-col md:flex-row flex-1'>
            <div class='p-4 flex flex-1 items-center'>
                <h5 class='text-lg flex-1 title-shadow'>
                    <router-link :to="{ name: 'Album preview', params: { id: album.id } }">{{ album.title }}</router-link>
                </h5>
            </div>
            <div class='flex items-center justify-around md:flex-grow-0'>
                <Button @click="$router.push({ name: 'Edit album', params: { id: album.id } })"
                        variant='text'
                        color='secondary'
                        class='flex-1 md:flex-grow-0'
                >
                    <font-awesome-icon size='lg' icon='edit' />
                </Button>
                <LikeButton :albumId='album.id' class='flex-1 md:flex-grow-0' />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import { AlbumWithLikeInfo } from '@/models/Album';
import LikeButton from '@/components/LikeButton.vue';
import Button from '@/components/Button.vue';

@Options({
    components: {
        LikeButton,
        Button,
    },
    props: {
        album: Object,
    },
})
export default class AlbumListItem extends Vue {
    album: AlbumWithLikeInfo | null = null;
}
</script>

<style lang='css'>

@media all and (max-width: 768px){
    .title-shadow {
        position: relative;
        height: 1.9em;
        overflow: hidden;
    }

    .title-shadow::after {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        width: 89px;
        height: 1.9em;
        background: linear-gradient(90deg, transparent, #ffffff);
        top: 0;
        text-align: right;
    }
}
</style>
