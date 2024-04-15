type Music = {
    id: string;
    title: string;
    singer: string;
    album: string;
    cover: string;
    src: string | undefined;
    time: number;
    mv: string;
    Lyric: string;
};

type MusicStoreState = {
    count: number;
    songs: Music[];
    shuffleSongs: Music[];
    currentIndex: number;
};

type PlayMode = {
    id: number;
    name: string;
    icon: string;
};

type LyricLine = {
    time: number;
    text: string;
};

type menuItem = {
    index: number;
    value: string;
    title: string;
};

type SearchItem = {};

export { Music, MusicStoreState, PlayMode, LyricLine, menuItem, SearchItem };
