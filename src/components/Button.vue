<template>
    <button :disabled='internalDisable' :class="{
        'px-5 py-2 rounded-md font-semibold h-12 relative': !circle,
        'bg-blue-600 text-white': !internalDisable && color === 'primary' && variant === 'contained',
        'text-gray-500': color === 'secondary' && variant === 'text',
        'text-blue-500': color === 'primary' && variant === 'text',
        'w-full': fullWidth,
        'rounded-full w-16 h-16': circle,
        'bg-gray-400 text-white': internalDisable && variant !== 'text',
    }">
        <slot></slot>
        <font-awesome-icon v-if='loading' size='lg' icon="spinner" spin class='ml-3' />
    </button>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component';

export type ButtonVariant = 'contained' | 'text';
export type ButtonColor = 'primary' | 'secondary';

@Options({
    props: {
        variant: {
            type: String,
            default: 'contained'
        },
        color: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: Boolean,
        fullWidth: Boolean,
        circle: Boolean,
    },
    computed: {
        internalDisable() {
            return this.loading || this.disabled;
        }
    }
})
export default class Button extends Vue {
    variant: ButtonVariant = 'contained';
    color: ButtonColor = 'primary';
    loading: boolean = false;
    fullWidth: boolean = false;
    circle: boolean = false;
    disabled: boolean = false;
}
</script>
