const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hashtagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: {
    postIds: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    numberOfHashtags: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model("Hashtag", hashtagSchema);