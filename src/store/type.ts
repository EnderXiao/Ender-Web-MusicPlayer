import { type } from '../auto-import/imports';
type Music = {
    id: string,
    title: string,
    singer: string,
    album: string,
    cover: string,
    src: string | undefined,
    time: number,
    mv: string,
    Lyric: string
}

type MusicStoreState = {
    count: number,
    songs: Music[],
    shuffleSongs: Music[],
    currentIndex: number
}

type PlayMode = {
    id: number,
    name: string,
    icon: string,
}

type LyricLine = {
    time: number,
    text: string
}

type menuItem = {
    index: number,
    value: string,
    title: string,
}

type artist = {
    id: number,
    name: string
}

type mvItem = {
    artistId: number,
    artistName: string,
    artists: artist[],
    briefDesc: string | null,
    cover: string,
    desc: string | null,
    duration: number,
    id: number,
    mark: number,
    name: string,
    playCount: number,
    subed: boolean
}

type SearchItem = {

}

type SearchParams = {
    keywords: string,
    limit: number,
    offset: number,
    type: string
}

export {
    Music,
    MusicStoreState,
    PlayMode,
    LyricLine,
    menuItem,
    artist,
    mvItem,
    SearchItem,
    SearchParams
}