const app = require("express")();
const cors = require("cors");
app.use(cors());
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const LoggedService = require("./services/LoggedService");
const InviteService = require("./services/InviteService");
const GameService = require("./services/GameService");
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const PORT = process.env.PORT;
var loggedPlayers = [];
var invites = [];
var games = [];
var strikes = [];
var gameMessages = [];

loggedService = new LoggedService(loggedPlayers, invites);
inviteService = new InviteService(loggedPlayers, invites);
gameService = new GameService(games, strikes, gameMessages);

io.on("connect", (socket) => {
  loggedService.verifyIfUserIsLoggedAndLoginUser(socket);
  inviteService.checkDeniedInvites(socket);
  inviteService.checkAcceptInvites(socket);
  inviteService.checkAndEmitInvites(socket);
  inviteService.checkClearInvites(socket);
  inviteService.checkIfGameCanStart(socket);
  loggedService.removePlayerLogged(socket);
});

io.of("/gameConfig").on("connect", (socket) => {
  gameService.startGame(socket);
});

io.of("/game").on("connect", (socket) => {
  gameService.hitStrike(socket);
  gameService.getMessages(socket);
});

http.listen(PORT, () => {
  console.log(`Listen on port ${PORT} `);
});
