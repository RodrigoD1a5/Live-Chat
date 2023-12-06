export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  id: string;
  user: Omit<User, "email">;
  content: string;
  createdAt: string;
}

export interface Session {
  user: {
    id: string;
    name: string;
  };
  token: string;
}
