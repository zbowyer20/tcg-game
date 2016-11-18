var FieldSide = require('./FieldSide');

function Field() {
  var self = {};

  self.addPlayer = function(id) {
    self[id] = FieldSide();
  }

  self.draw = function(id) {
    return self[id].draw();
  }

  return self;
}

module.exports = Field;
