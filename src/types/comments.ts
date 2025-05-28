export interface CommentI {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  comment: string;
  timestamp: string;
}

export interface ParamsComment {
  comment: string;
  commentId?: string;
}