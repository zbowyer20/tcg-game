function draw(params) {
  let card = params.field.draw(params.player.id);
  params.player.addCard(card);
  return card;
}

function drawCards(params) {
  for (var i = 0; i < params.number; i++) {
    draw(params);
  }
}

function doEventForPlayers(params) {
  for (var i = 0; i < params.players.length; i++) {
    params.player = params.players[i];
    params.fn.bind(null, params)();
  }
}

module.exports = {
  draw: draw,
  drawCards: drawCards,
  doEventForPlayers: doEventForPlayers
};
