const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post,{
    onDelete:"CASCADE"
});
Post.belongsTo(User);

User.hasMany(Comment,{
    through:"UserComment"
})

Comment.hasOne(User,{
    through:"UserComment"
})

module.exports={
    User,
    Post,
    Comment
};