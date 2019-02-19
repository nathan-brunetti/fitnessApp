const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberLevelSchema = new Schema(
  {
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
  }
);

module.exports = mongoose.model('MemberLevel', MemberLevelSchema);
