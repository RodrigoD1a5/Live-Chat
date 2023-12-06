export interface Message {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
  room: {
    id: string;
    name: string;
  };
}

export interface Draft {
  userId: string;
  roomId: string;
  content: string;
}

export interface Session {
  user: {
    id: string;
    name: string;
  };
  token: string;
}

export interface Room {
  id: string;
  name: string;
}