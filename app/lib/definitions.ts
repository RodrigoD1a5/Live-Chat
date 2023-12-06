export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Message {
    id: string;
    user: Omit<User, "email">;
    content: string;
    createdAt: string;
}

export interface Session {
    userId: string;
    token: string;
}