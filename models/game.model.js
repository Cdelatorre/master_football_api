const mongoose = require('mongoose');

function teamValidator (value) {
  return this.homeName !== value
}

const gameSchema = new mongoose.Schema({
  homeName: {
    type: String,
    required: [true, 'Home team name is required'],
    trim: true,
    lowercase: true
  },
  awayName: {
    type: String,
    required: [true, 'Away team name is required'],
    trim: true,
    lowercase: true,
    validate: [teamValidator, 'Teams should have different names!']
  },
  homeScore: {
    type: Number,
    required: [true, 'Home team score is required'],
    min: 0
  },
  awayScore: {
    type: Number,
    required: [true, 'Away team score is required'],
    min: 0
  },
  totalScore: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
