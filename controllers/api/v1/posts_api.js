// API Controller for Posts

const Post = require('../../../models/post');

const Comment = require('../../../models/comment');

// Get Request Controller for (/api/v1/posts)
module.exports.index = async function (request, response) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            options: { sort: { createdAt: -1 } }, // Sort comments in descending order based on createdAt field
            populate: {
                path: 'user',
            }
        });
    
    
    return response.status(200).json({
        message: "List of Posts",
        posts: posts
    });
};
