let dataLevels = {
  start: levelStart,
  game: levelGame,
  endGame: levelGameOver,
};

let dataGame = {
  value: {
    player: 0,
    bot: 0,
  },
  state: {
    win: 0,
    over: 0,
  },
};

let nowLevel = dataLevels.start;

window.addEventListener("load", function () {
  initGame("body");
  loadLevel();
});

function initGame(parent) {
  let gameContainer = document.createElement("div");
  gameContainer.id = "game";
  document.querySelector(parent).append(gameContainer);
}

function levelStart() {
  document
    .querySelector("#game")
    .append(createBtn(["btn"], "Старт", handlerStartGame));
}

function levelGame() {
  let gameContent = createEl("div", ["game-content"]);
  let gameAction = createEl("div", ["game-action"]);
  let gameActionBot = createEl("div", ["game-action-bot"]);
  let gameActionBotList = createEl("div", ["game-action-bot-list"]);
  let gameBlock1 = createEl("div", ["game-block"]);

  gameActionBot.append(gameActionBotList);
  gameActionBotList.append(gameBlock1);
  gameAction.append(gameActionBot);
  gameContent.append(gameAction);

  let gameActionCenter = createEl("div", ["game-action-center"]);
  let spanCenter = document.createElement("span");
  spanCenter.innerHTML = "vs";
  gameActionCenter.append(spanCenter);
  gameAction.append(gameActionCenter);

  let gameActionPlayer = createEl("div", ["game-action-player"]);
  let gameBlock = createEl("div", ["game-block"]);
  gameActionPlayer.append(gameBlock);
  gameAction.append(gameActionPlayer);

  let gameInput = createEl("div", ["game-buttons"]);
  let btnB1 = createBtn(["btn", "btn-b", "btn-b1"], "", function () {
    selectPlayer(1);
    selectBot();
  });
  let btnB2 = createBtn(["btn", "btn-b", "btn-b2"], "", function () {
    selectPlayer(2);
    selectBot();
  });
  let btnB3 = createBtn(["btn", "btn-b", "btn-b3"], "", function () {
    selectPlayer(3);
    selectBot();
  });

  gameInput.append(btnB1);
  gameInput.append(btnB2);
  gameInput.append(btnB3);
  gameAction.append(gameInput);

  function selectPlayer(a) {
    let tmpPlayer = createEl("div", ["game-block", "game-block-" + a + ""]);
    gameActionPlayer.innerHTML = "";
    gameActionPlayer.append(tmpPlayer);

    dataGame.value.player = a;
  }

  function selectBot() {
    gameActionBotList.innerHTML = "";
    let value = getRandomInt(3);
    value++;

    dataGame.value.bot = value;

    let tmpBot = createEl("div", ["game-block", "game-block-" + value + ""]);
    gameActionBotList.append(tmpBot);

    resultGame();
  }

  document.querySelector("#game").append(gameContent);
}

function levelGameOver() {
  let gameContent = createEl("div", ["game-content"]);
  let title = createEl("span", ["game-text", "pb-10"]);
  title.innerHTML = "Статистика:";
  let gameState = createEl("div", ["game-state"]);
  let tableState = createEl("table", []);
  let trState1 = createEl("tr", []);
  let tdState1 = createEl("td", []);
  tdState1.innerHTML = "Побед:";
  let tdState2 = createEl("td", ["win"]);
  tdState2.innerHTML = dataGame.state.win;
  let trState2 = createEl("tr", []);
  let tdState3 = createEl("td", []);
  tdState3.innerHTML = "Поражений:";
  let tdState4 = createEl("td", ["over"]);
  tdState4.innerHTML = dataGame.state.over;
  let btnRefresh = createBtn(["btn", "btn-refresh"], "", handlerStartGame);

  gameContent.append(title);
  gameState.append(tableState);
  tableState.append(trState1);
  trState1.append(tdState1);
  trState1.append(tdState2);
  tableState.append(trState2);
  trState2.append(tdState3);
  trState2.append(tdState4);
  gameContent.append(gameState);
  gameContent.append(btnRefresh);

  document.querySelector("#game").append(gameContent);
}

function resultGame() {
  nowLevel = dataLevels.endGame;

  switch (
    dataGame.value.player === dataGame.value.bot ||
    `${dataGame.value.player}${dataGame.value.bot}`
  ) {
    case true:
      console.log("Heh..... Draw");
      break;
    case "13":
    case "21":
    case "32":
      ++dataGame.state.win;
      break;
    default:
      ++dataGame.state.over;
  }

  setTimeout(function () {
    levelClear();
    loadLevel();
  }, 500);
}

function handlerStartGame() {
  nowLevel = dataLevels.game;
  levelClear();
  loadLevel();
}

function createEl(el, classList) {
  let element = document.createElement(el);
  element.classList.add(...classList);
  return element;
}

function createBtn(classBtn, contentBtn, handler) {
  let btn = document.createElement("button");
  btn.classList.add(...classBtn);
  btn.innerHTML = contentBtn;
  btn.addEventListener("click", handler, { capture: false, once: true });

  return btn;
}

function loadLevel() {
  nowLevel();
}

function levelClear() {
  document.querySelector("#game").innerHTML = "";
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
