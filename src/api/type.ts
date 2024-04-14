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

export { CommentParams, CommentsAry, CommentObj };
