const Game = require('../models/game.model');

module.exports.create = (req, res, next) => {
  const newGame = new Game({
    homeName: req.body.homeName,
    awayName: req.body.awayName,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore,
    totalScore: Number(req.body.homeScore) + Number(req.body.awayScore)
  })

  newGame.save()
    .then((game) => res.status(201).json(game))
    .catch(err => next(err))
}

module.exports.summary = (req, res, next) => {
  Game.find()
    .sort({ totalScore: -1, createdAt: -1 })
    .then((games) => res.status(200).json(games))
    .catch(err => next(err))
}

module.exports.delete = (req, res, next) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('OK'))
    .catch(err => next(err))
}
