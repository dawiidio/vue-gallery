<template>
    <Button @click.prevent='toggle' variant='text' color='secondary'>
        <font-awesome-icon size='lg' icon="heart" :class="{ 'text-red-500': liked }"  />
    </Button>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import { addToLikedMutation, removeFromLikedMutation } from '@/store/store';
import Button from '@/components/Button.vue';

@Options({
    props: {
        albumId: Number
    },
    components: {
        Button
    },
    computed: {
        liked() {
            return Boolean(this.$store.state.albums.liked[this.albumId]);
        }
    },
    methods: {
        toggle() {
            if (this.liked) {
                this.$store.commit(removeFromLikedMutation(this.albumId));
            }
            else {
                this.$store.commit(addToLikedMutation(this.albumId));
            }
        }
    }
})
export default class LikeButton extends Vue {
    albumId: number = 0;
}
</script>
