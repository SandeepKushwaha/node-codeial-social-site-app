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


// DELETE Request Controller for (/api/v1/posts/{id})
module.exports.destroy = async function (request, response) {
    try { 
        let post = await Post.findById(request.params.id);

        // if (post.user == request.user.id) {
            post.deleteOne(); // Replace post.remove() with post.deleteOne()

            await Comment.deleteMany({ post: request.params.id });
        
            return response.status(200).json({
                message: "Post and associated comments Deleted Successfully.",
                post: post,
            });
        // } else {
        //     console.log('Unable to delete the post ::', post);
        //     response.flash('error', 'Unable to delete the Post.');
        //     return response.redirect('back');
        // }
    } catch (error) { 
        console.error('Delete Post Error on API call :', error);
        return response.status(500).json({
            message: "Internal Server Error.",
        });
    }
};
