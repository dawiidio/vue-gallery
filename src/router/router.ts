import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/AlbumsList.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Albums list',
        components: {
            default: Home
        },
    },
    {
        path: '/album/:id',
        name: 'Album preview',
        components: {
            default: () => import(/* webpackChunkName: "album" */ '../views/AlbumPreview.vue'),
        },

    },
    {
        path: '/edit/:id',
        name: 'Edit album',
        components: {
            default: () => import(/* webpackChunkName: "edit" */ '../views/EditAlbum.vue'),
        },
    },
    {
        path: '/create',
        name: 'Create album',
        components: {
            default: () => import(/* webpackChunkName: "create" */ '../views/CreateAlbum.vue'),
        },
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
