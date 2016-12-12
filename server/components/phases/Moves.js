function draw(field, player) {
  let card = field.draw(player.id);
  player.addCard(card);
  return card;
}

function drawCards(field, player, params) {
  for (var i = 0; i < params.number; i++) {
    draw(field, player);
  }
}

module.exports = {
  draw: draw,
  drawCards: drawCards
};
