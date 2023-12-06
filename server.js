const http = require("http");
const { Server } = require("socket.io");
const { randomUUID } = require("crypto");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Web Socket

let COUNT = 0;

// Autenticacao simples
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) socket.disconnect();

  next();
});

// Eventos
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  COUNT++;

  socket.emit("online", JSON.stringify({ count: COUNT }));
  socket.broadcast.emit("online", JSON.stringify({ count: COUNT }));

  socket.on("message", (data) => {
    const message = JSON.parse(data);
    message["id"] = randomUUID();

    console.log("RECEIVED MESSAGE: ", message);

    socket.broadcast.emit("chat", JSON.stringify(message));
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    COUNT--;

    socket.broadcast.emit("online", JSON.stringify({ count: COUNT }));
  });
});

// Funcao de teste para enviar mensagens automaticas

setInterval(() => {
  const id = randomUUID();

  const message = {
    id,
    user: {
      id: randomUUID(),
      name: "admin",
    },
    content: "Test " + new Date().getTime().toString(),
    createdAt: new Date().toISOString(),
  };

  io.emit("chat", JSON.stringify(message));

  console.log("Emited message id " + id);
}, 10000);

// Inicia servidor http na porta 3001

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
