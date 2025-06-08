const mongoos = require('mongoose');

const IdeaSchema = new mongoos.Schema({
  text: {
    type: String,
    required: [true, 'Please enter a text'],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoos.model('Idea', IdeaSchema);
