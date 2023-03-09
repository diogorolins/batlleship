class GameService {
  constructor(games, strikes, gameMessages) {
    this.games = games;
    this.strikes = strikes;
    this.gameMessages = gameMessages;
  }

  startGame(socket) {
    socket.on("create.game", (game) => {
      console.log(
        `[GAME SERVICE INFORM]: Foi criado um jogo por ${game.player.id}`
      );
      console.log(
        "--------------------------------------------------------------------"
      );
      this.games.push(game);

      const gameAlreadStarted = this.games.filter((g) => g.id === game.id);
      if (gameAlreadStarted.length === 2) {
        socket.emit("game.canStart", this.games);
        socket.broadcast.emit("game.canStart", this.games);
      }
    });
  }
  hitStrike(socket) {
    socket.on("game.strike", (strike) => {
      console.log(
        `[GAME SERVICE INFORM]: ${strike.playerId} atacou na posição ${strike.position}`
      );
      console.log(
        "--------------------------------------------------------------------"
      );
      this.strikes.push(strike);
      socket.broadcast.emit("game.strike", this.strikes);
    });
  }

  getMessages(socket) {
    socket.on("game.messages", (messages) => {
      this.gameMessages.push(messages);
      socket.emit("game.messages", this.gameMessages);
      socket.broadcast.emit("game.messages", this.gameMessages);
    });
  }
}
module.exports = GameService;
