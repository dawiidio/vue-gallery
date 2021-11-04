export interface Album {
    userId: number
    id: number
    title: string
}

export interface AlbumWithLikeInfo extends Album {
    liked: boolean
    likeTimestamp: number|undefined
}
