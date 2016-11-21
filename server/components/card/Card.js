function Card(data) {
  var self = {
    id: data.id,
    name: data.name,
    element: data.element,
    cost: data.cost,
    type: data.type,
    src: data.src
  }

  self.setPosition = function(position) {
    self.position = position;
  }

  return self;
}

Card.random = function() {
  const selection = [];

  return Card(selection[Math.floor(Math.random() * selection.length)]);
}

module.exports = Card;
