function draw(params) {
  let card = params.field.draw(params.player.id);
  params.player.hand.add(card);
  return card;
}

function drawCards(params) {
  for (var i = 0; i < params.number; i++) {
    draw(params);
  }
}

function doEventForPlayers(params) {
  for (var id in params.players) {
    params.player = params.players[id];
    params.fn.bind(null, params)();
  }
}

module.exports = {
  draw: draw,
  drawCards: drawCards,
  doEventForPlayers: doEventForPlayers
};
