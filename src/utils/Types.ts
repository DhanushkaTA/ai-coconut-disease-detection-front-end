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

export interface AlertUser {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}