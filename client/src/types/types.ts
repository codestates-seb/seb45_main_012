export interface FormData {
  type: string;
  title: string;
  body: string;
  open: string;
  img: string | null;
}

export interface Post {
  createdAt: string;
  postId: number;
  type: string;
  title: string;
  userId: number;
  body: string;
  open: boolean;
}

export interface PostListProps {
  type: string;
}

export interface AuthPost {
  createdAt: string;
  postId: number;
  title: string;
  userId: number;
  body: string;
  open: boolean;
  imageUrl: string;
}

export interface MyPosts {
  postId: number;
  userId: number;
  type: string;
  title: string;
  body: string;
  open: string;
  imageUrls: string;
  createdAt: string;
}

export interface OneOfMyPost {
  postId: number;
  userId: number;
  type: string;
  title: string;
  body: string;
  open: string;
  imageUrls: string;
  createdAt: string;
}

export interface ModalProps {
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface GuestHeaderProps {
  isLoggedIn: boolean;
}

export interface UserHeaderProps {
  isLoggedIn: boolean;
}

export interface PaginationProps {
  posts: any[];
  postsPerPage: number;
  pagesPerGroup: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface MenuState {
  activeMenu: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RootState {
  auth: AuthState;
  menu: MenuState;
}

export interface DecodedToken {
  password: string;
  roles: string;
  userUseId: string;
  userName: string;
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}

export interface UserData {
  imageUrl?: string;
}