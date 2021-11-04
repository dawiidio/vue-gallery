<template>
    <div v-if='showNotification' class='flex justify-between items-center px-5 py-3 mt-2 mb-2 bg-blue-200 rounded-md'>
        🎉 Congratulations! 🎉 You liked 5 new albums today!
        <Button @click='close' variant='text' color='secondary'>
            <font-awesome-icon icon='times' />
        </Button>
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
import { closeNotificationMutation, setNotificationThresholdExceededMutation } from '@/store/store';
import Button from '@/components/Button.vue';

const NOTIFY_THRESHOLD = 5;

@Options({
    components: {
        Button
    },
    computed: {
        counter(): boolean {
            return this.$store.getters.likedNotificationsCounter;
        },
        showNotification(): boolean {
            return !this.$store.state.albums.notificationClosed && this.$store.state.albums.notificationThresholdExceeded;
        },
        threshold() {
            return NOTIFY_THRESHOLD;
        }
    },
    watch: {
        counter: 'checkCounter',
    },
    methods: {
        close() {
            this.$store.commit(closeNotificationMutation(true));
        },
        checkCounter() {
            if (this.counter >= this.threshold)
                this.$store.commit(setNotificationThresholdExceededMutation(true));
        },
    },
})
export default class Notification extends Vue {
}
</script>
