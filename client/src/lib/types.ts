export interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  bio: string;
  link: string;
  profileImg: string;
  coverImg: string;
  followers: string[];
  following: string[];
  bookmarks: string[];
  likedPosts: string[];
  createdAt: string;
}

export interface Post {
  _id: string;
  text: string;
  img: string | null;
  user: User;
  likes: string[];
  comments: string[];
  createdAt: string;
}

export interface Hashtag {
  _id: string;
  tag: string;
  count: number;
}

export interface CreatePostData {
  text: string;
  img: string | null;
}

export interface PostsPage {
  posts: Post[];
  nextCursor: string | null;
}

export interface DeletePostData {
  id: string;
}
