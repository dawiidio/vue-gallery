<template>
    <form @submit.prevent='handleSubmit' class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                Album title
            </label>
            <input
                v-model="title"
                :class="{
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' : true,
                    'border-red-500': error
                }"
                id="title"
                type="text"
                placeholder="Album title"
            >
            <p class="text-red-500 text-xs italic mt-2" v-if='error'>{{error}}</p>
        </div>
        <div class='w-full flex justify-end'>
            <Button type='submit' :loading='loading'>
                Save
            </Button>
        </div>
    </form>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import Button from '@/components/Button.vue';

@Options({
    components: {
        Button
    },
    props: {
        albumTitle: String,
        albumId: Number,
        loading: Boolean,
    },
    data: (props) => ({
        title: props.albumTitle,
        error: null
    }),
    methods: {
        validate(title:string) {
            const ALBUM_TITLE_REGEX = /^[a-zA-Z\s]+$/mg;

            if (!title) {
                return `Title can not be empty`;
            }

            if (!ALBUM_TITLE_REGEX.test(title)) {
                return `The title can only contain letters and spaces`;
            }

            return null;
        },
        handleSubmit() {
            this.error = this.validate(this.title);

            if (this.error) {
                return;
            }

            this.$emit('save', {
                title: this.title,
                id: this.albumId
            });
        }
    }
})
export default class AlbumForm extends Vue {
    albumTitle: string = '';
    albumId: number|null = null;
    loading: boolean = false;
}
</script>
