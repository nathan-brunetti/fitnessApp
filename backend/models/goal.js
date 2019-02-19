const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    goal: { type: String, enum: ['Maintain Weight', 'Lose Weight', 'Build Muscle'], default: 'Maintain Weight' }
  }
);

module.exports = mongoose.model('Goal', GoalSchema);
