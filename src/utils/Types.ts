export interface NotificationTypes {
    _id: string,
    title: string,
    description: string,
    image: string,
    likes: string[],
    createdBy: AlertUser,
    createdAt: Date,
    updatedAt: Date,
}

export interface PostTypes {
    _id: string,
    content: string,
    image: string,
    likes: string[],
    createdBy: string,
    createdAt: Date,
    updatedAt: Date,
    user: PostUser,
    commentCount?: number;
}

export interface AlertUser {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface PostUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePic: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  totalPages?: number;
}

export interface AlertCommentUser {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}

export interface PostComment {
  _id: string;
  alertId: string;
  userId: AlertCommentUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCommentResponse {
  comments: PostComment[];
  totalPages: number;
  total: number;
  page: number;
}

export interface AlertTypes {
    _id: string,
    title: string,
    description: string,
    image: string,
    likes: string[],
    createdBy: AlertCommentUser,
    createdAt: Date,
    updatedAt: Date,
    likeCount: number;
    commentCount: number;
}