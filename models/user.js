const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.methods.follow = function(id){
  if(this.following.indexOf(id) === -1){
    this.following.push(id);
  }

  return this.save();
};

userSchema.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
};

userSchema.methods.isFollowing = function(id){
  return this.following.some(function(followId){
    return followId.toString() === id.toString();
  });
};

userSchema.methods.addFollower = function(id) {
  if(this.followers.indexOf(id) === -1){
    this.followers.push(id);
  }
  return this.save();
}

userSchema.methods.removeFollower = function(id) {
  this.followers.remove(id);
  return this.save();
};


// userSchema.methods.getFollowers = function(){
//   return following.count();
// }

module.exports = mongoose.model("User", userSchema);