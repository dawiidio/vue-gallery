import { Album } from '@/models/Album';
import { setQueryStringParamsOnUrl } from '@/common/setQueryStringParamsOnUrl';

export interface AlbumDto {
    title?: string
    id?: number
}

export interface AlbumListFilters {
    [key: string]: string | undefined | number;

    userId?: number
}

const generateFakeId = () => Math.round(Math.random()*1e5);

export class AlbumApi {
    static readonly BASE_URL = 'https://jsonplaceholder.typicode.com/albums/';

    static async update(dto: AlbumDto): Promise<Album> {
        if (!dto.id)
            throw new Error('Album dto must contain id on update');

        const url = new URL(`${dto.id}`, AlbumApi.BASE_URL);

        return fetch(url.toString(), {
            method: 'PUT',
            body: JSON.stringify(dto),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json());
    }

    static async create(dto: AlbumDto): Promise<Album> {
        const url = new URL(``, AlbumApi.BASE_URL);

        return fetch(url.toString(), {
            method: 'POST',
            body: JSON.stringify(dto),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(() => {
                return {
                    id: generateFakeId(),
                    title: dto.title as string,
                    userId: 1
                }
            });
    }

    static async delete(id: number): Promise<Album> {
        const url = new URL(`${id}`, AlbumApi.BASE_URL);

        return fetch(url.toString(), { method: 'DELETE' })
            .then(response => response.json());
    }

    static async find(id: number): Promise<Album> {
        const url = new URL(`${id}`, AlbumApi.BASE_URL);

        return fetch(url.toString())
            .then(response => response.json());
    }

    static async list(filters: AlbumListFilters = {}): Promise<Album[]> {
        const url = new URL(``, AlbumApi.BASE_URL);

        setQueryStringParamsOnUrl(url, filters);

        return fetch(url.toString())
            .then(response => response.json());
    }
}
