export interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  bio: string;
  link: string;
  profileImg: string;
  followers: string[];
  following: string[];
  bookmarks: string[];
  likedPosts: string[];
  createdAt: string;
}
