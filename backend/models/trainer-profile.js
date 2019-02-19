const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrainerProfileSchema = new Schema(
  {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      age: { type: Number, min: 18, max: 100, required: true },
      gender: { type: String, enum: ['M', 'F'] },
      bio: { type: String, required: true },
      profileImage: { type: String },
      email: { type: String, required: true, unique: true },
      // password: { type: String, required: true },
      // experience: { type: String, min: 2, max: 30, required: true },
      // focus: { type: Schema.Types.ObjectId, ref: 'MemberProfile', required: true }
  }
);

// Virtual for TrainerProfile's URL
TrainerProfileSchema
.virtual('url')
.get(() => {
  return '/user/trainerprofile/' + this._id;
});

// Export model
module.exports = mongoose.model('TrainerProfile', TrainerProfileSchema);
