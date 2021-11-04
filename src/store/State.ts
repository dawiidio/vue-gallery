import { Album } from '@/models/Album';

export interface AsyncModel<T> {
    data: T
    loading: boolean
    error: string|null
}

export interface State {
    albums: {
        page: number,
        pageSize: number,
        liked: Record<number, number>
        list: AsyncModel<Album[]>
        notificationClosed: boolean
        notificationThresholdExceeded: boolean
    }
    user: {
        id: number
        name: string
    }
}
