import { setQueryStringParamsOnUrl } from '@/common/setQueryStringParamsOnUrl';
import { Photo } from '@/models/Photo';

export interface PhotoListFilters {
    [key: string]: string | undefined | number;

    albumId?: number
}

export class PhotoApi {
    static readonly BASE_URL = 'https://jsonplaceholder.typicode.com/photos/';

    static async list(filters: PhotoListFilters = {}): Promise<Photo[]> {
        const url = new URL(``, PhotoApi.BASE_URL);

        setQueryStringParamsOnUrl(url, filters);

        return fetch(url.toString())
            .then(response => response.json());
    }
}
