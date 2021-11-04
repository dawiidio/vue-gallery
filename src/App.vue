<template>
    <div class='bg-gray-200 h-full min-h-screen p-8 mx-auto pb-12'>
        <div class='w-full sticky top-0 z-10 bg-gray-200 pb-1 pt-4'>
            <div class='w-full md:w-2/3 mx-auto'>
                <div class='w-full border-b-2 border-gray-400 flex justify-between'>
                    <h1 class='text-4xl mb-3'>{{routeName}}</h1>
                    <Button v-if="routeName !== 'Albums list'" @click="$router.push({ name: 'Albums list' })" variant='text' color='secondary'>
                        Back to list
                    </Button>
                </div>
                <Notification />
            </div>
        </div>
        <router-view v-slot='{ Component }'>
            <transition name='fade' mode='out-in'>
                <component :is='Component' />
            </transition>
        </router-view>
        <div v-if='routeName === "Albums list"' class='w-full sticky bottom-0 pb-5 pt-4'>
            <div class='w-full md:w-2/3 mx-auto flex justify-end'>
                <Button @click="$router.push({ name: 'Create album' })" variant='contained' color='primary' circle='true' class='shadow-md'>
                    <font-awesome-icon size='lg' icon='plus' />
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import Button from '@/components/Button.vue';
import Notification from '@/components/Notification.vue';

@Options({
    components: {
        Button,
        Notification
    },
    data: () =>({
        title: 'test'
    }),
    computed: {
        routeName() {
            return this.$route.name
        }
    }
})
export default class App extends Vue {

}
</script>
