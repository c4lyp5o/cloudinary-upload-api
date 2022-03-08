const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create the schema
var postSchema = new Schema({
    title: String,
    desc: String,
    image: String,
    image_id: String,
    created_at: Date
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;