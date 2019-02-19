const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberProfileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, min: 18, max: 100, required: true },
    gender: { type: String, enum: ['M', 'F'] },
    bio: { type: String, required: true },
    // profileImage: { type: String },
    weight: { type: Number },
    height: { type: Number },
    email: { type: String, required: true },
    // password: { type: String, required: true },
    // goal: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
    // level: { type: Schema.Types.ObjectId, ref: 'MemberLevel', required: true }
  }
);

// Virtual for MemberProfile's URL
MemberProfileSchema
.virtual('url')
.get(() => {
  return '/user/memberprofile/' + this._id;
});

// Export model
module.exports = mongoose.model('MemberProfile', MemberProfileSchema);
