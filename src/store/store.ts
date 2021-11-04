import { createStore } from 'vuex';
import { State } from '@/store/State';
import { createMutation, Mutation } from '@/common/createMutation';
import { createAction } from '@/common/createAction';
import { AlbumApi, AlbumDto } from '@/api/AlbumApi';
import { Album, AlbumWithLikeInfo } from '@/models/Album';

const setAlbumsLoadingMutation = createMutation<boolean>('setAlbumsLoadingMutation');
const setAlbumsErrorMutation = createMutation<string | null>('setAlbumsErrorMutation');
const setAlbumsListMutation = createMutation<Album[]>('setAlbumsListMutation');
export const addToLikedMutation = createMutation<number>('addToLikedMutation');
export const removeFromLikedMutation = createMutation<number>('removeFromLikedMutation');
export const closeNotificationMutation = createMutation<boolean>('closeNotificationMutation');
export const setNotificationThresholdExceededMutation = createMutation<boolean>('setNotificationThresholdExceededMutation');
export const deleteAlbumMutation = createMutation<number>('deleteAlbumMutation');
export const updateAlbumMutation = createMutation<AlbumDto>('updateAlbumTitleMutation');
export const createAlbumMutation = createMutation<AlbumDto>('createAlbumMutation');

export const fetchAlbumsAction = createAction('fetchAlbumsAction');

export const store = createStore<State>({
    state: () => ({
        albums: {
            liked: {},
            list: {
                data: [],
                error: null,
                loading: false,
            },
            page: 1,
            pageSize: 10,
            notificationClosed: false,
            notificationThresholdExceeded: false
        },
        user: {
            id: 1,
            name: 'John Doe',
        },
    }),
    getters: {
        albumsWithLikes: (state: State): AlbumWithLikeInfo[] => {
            return state.albums.list.data.map(album => ({
                ...album,
                liked: Boolean(state.albums.liked[album.id]),
                likeTimestamp: state.albums.liked[album.id]
            }))
        },
        getAlbumWithLikeById: (state: State) => (id: number):AlbumWithLikeInfo|null => {
            const album = state.albums.list.data.find(album => album.id === id);

            if (!album)
                return null;

            return {
                ...album,
                liked: Boolean(state.albums.liked[album.id]),
                likeTimestamp: state.albums.liked[album.id]
            }
        },
        likedNotificationsCounter: (state: State):number => {
            return Object.keys(state.albums.liked).length;
        }
    },
    mutations: {
        [`${setAlbumsLoadingMutation}`]: (state, { payload }: Mutation<boolean>) => {
            state.albums.list.loading = payload;
        },
        [`${setAlbumsErrorMutation}`]: (state, { payload }: Mutation<string | null>) => {
            state.albums.list.error = payload;
        },
        [`${setAlbumsListMutation}`]: (state, { payload }: Mutation<Album[]>) => {
            state.albums.list.data = payload;
        },
        [`${addToLikedMutation}`]: (state, { payload }: Mutation<number>) => {
            state.albums.liked = {
                ...state.albums.liked,
                [payload]: Date.now()
            }
        },
        [`${removeFromLikedMutation}`]: (state, { payload }: Mutation<number>) => {
            const newState = { ...state.albums.liked };

            delete newState[payload];

            state.albums.liked = newState;
        },
        [`${closeNotificationMutation}`]: (state) => {
            state.albums.notificationClosed = true;
        },
        [`${setNotificationThresholdExceededMutation}`]: (state) => {
            state.albums.notificationThresholdExceeded = true;
        },
        [`${deleteAlbumMutation}`]: (state, { payload }: Mutation<number>) => {
            state.albums.list.data = state.albums.list.data.filter(({ id }) => id !== payload);
        },
        [`${createAlbumMutation}`]: (state, { payload }: Mutation<AlbumDto>) => {
            state.albums.list.data = [
                {
                    title: payload.title as string,
                    id: payload.id as number,
                    userId: state.user.id
                },
                ...state.albums.list.data
            ];
        },
        [`${updateAlbumMutation}`]: (state, { payload }: Mutation<AlbumDto>) => {
            const idx = state.albums.list.data.findIndex(album => album.id === payload.id);
            const newData = [...state.albums.list.data];

            newData[idx] = {
                ...newData[idx],
                ...payload
            };

            state.albums.list.data = newData;
        },
    },
    actions: {
        [`${fetchAlbumsAction}`]: async ({ commit, state }) => {
            commit(setAlbumsLoadingMutation(true));

            try {
                const albums = await AlbumApi.list({
                    userId: state.user.id,
                });

                commit(setAlbumsErrorMutation(null));
                commit(setAlbumsListMutation(albums));
            } catch {
                commit(setAlbumsErrorMutation('Error occurred while fetching data'));
            } finally {
                commit(setAlbumsLoadingMutation(false));
            }
        },
    },
});


