// API Controller for Posts

const Post = require('../../../models/post');

const Comment = require('../../../models/comment');

// Get Request Controller for (/api/v1/posts) [async-await]
module.exports.getAll = async function (request, response) {

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

// Get by ID Request Controller for (/api/v1/post/{Id}) [promise-then]
module.exports.getById = function (request, response) { 
    Post.findById(request.params.id)
        .then(post => {
            if (post) {
                return response.status(200).json({
                    message: "Post Found.",
                    post: post,
                });
            } else {
                return response.status(500).json({
                    message: "Internal Server Error.",
                });
            }
        })
        .catch(error => {
            console.log(`Error on Getting post id::${request.params.id}===${error}`);
        });
};

// /=/ Update post by ID Request Controller for (/api/v1/post/{id}) [promise-then]
// module.exports.update = function (request, response) {
//     if (request.user.id == request.params.id) {
//         Post.findByIdAndUpdate(request.body.id)
//         .then(post => { })
//         .catch(error => { });
//     } else {
//         /=/ handle error here.
//     }
// }

// DELETE Request Controller for (/api/v1/posts/{id}) [async-await]
module.exports.delete = async function (request, response) {
    try { 
        let post = await Post.findById(request.params.id);

        if (post.user == request.user.id) {
            post.deleteOne(); // Replace post.remove() with post.deleteOne()

            await Comment.deleteMany({ post: request.params.id });
        
            return response.status(200).json({
                message: "Post and associated comments Deleted Successfully.",
                post: post,
            });
        } else {
            return response.status(401).json({ 
                message: "You are Unauthorized! You cannot delete this post.",
            });
        }
    } catch (error) { 
        console.error('Delete Post Error on API call :', error);
        return response.status(500).json({
            message: "Internal Server Error.",
        });
    }
};
