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

export interface ModalProps {
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
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