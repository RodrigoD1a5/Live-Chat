export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Comment {
    id: string;
    user: Omit<User, "email">;
    content: string;
    createdAt: string;
}