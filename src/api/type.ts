type code = {
    code: number | string;
};

type ResultData<T = any> = {
    code: code;
    data?: T;
};

// 分页
type pages = {
    offset?: number | string;
    limit?: number | string;
    cat?: string | string[];
};

// 搜索接口参数
type SearchParams = {
    keyword?: string;
    limit?: number;
    offset?: number;
    type?: number | string;
};

// 搜索接口返回类型
type ResSearch = {
    result: {
        songs: [];
        playLists: [];
        mvs: [];
        songCount: number;
        playListCount: number;
        mvCount: number;
    };
    code: code;
    message: string;
};

type Artist = {
    id: number;
    name: string;
};

type MvObj = {
    artistId: number;
    artistName: string;
    artists: Artist[];
    briefDesc: string | null;
    cover: string;
    desc: string | null;
    duration: number;
    id: number;
    mark: number;
    name: string;
    playCount: number;
    subed: boolean;
};

type CommentParams = {
    type: "mv" | "music" | "playlist";
    id: string;
    limit?: number;
    offset?: number;
};

type CommentsAry = {
    hotComments: Array<CommentObj>;
    comments: Array<CommentObj>;
    total: number;
};

type CommentObj = {
    id: number | string;
    commentId?: number | string;
    content: string;
    timeStr: string;
    likedCount: string | number;
    ipLocation: {
        location: string;
    };
    user: {
        avatarUrl: string;
        userId: number | string;
        nickname: string;
    };
};

export {
    code,
    ResultData,
    pages,
    SearchParams,
    ResSearch,
    Artist,
    MvObj,
    CommentParams,
    CommentsAry,
    CommentObj,
};
