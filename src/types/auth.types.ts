export interface User {
    email: string;
    userName?: string;
    password: string;
}

export interface UserState {
    currentUser?: User | null;
    loading: boolean;
    error: string | false; 
}

export interface RootState {
    user: UserState;
}
  