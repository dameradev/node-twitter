const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    userIds: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    numberOfLikes: {
      type: Number,
      required: true,
      default: 0
    }
  }
});

postSchema.methods.like = function(userId){
  
  if (this.likes.userIds.indexOf(userId) === -1) {
    this.likes.userIds.push(userId);
    this.likes.numberOfLikes += 1;
  }

  return this.save();
}

postSchema.methods.dislike = function(userId){
  if (this.likes.numberOfLikes === 0){
    return;  
  }
  if (this.likes.userIds.indexOf(userId) !== -1){ 
    this.likes.userIds.remove(userId);
    this.likes.numberOfLikes -= 1;
  }else{
    return;
  }
  

  return this.save();
}

postSchema.methods.getLikes = function() {
  return this.likes.numberOfLikes;
}

module.exports = mongoose.model("Post", postSchema);