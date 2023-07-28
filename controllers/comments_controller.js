const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = function (request, response) { 
    // Check if the content is present and not empty
    if (!request.body.content || request.body.content.trim() === '') {
        console.log('Comment content is required');
        return response.redirect('/');
    }

    Post.findById(request.body.post)
        .then(post => {
            if (post) {
                Comment.create({
                    content: request.body.content,
                    post: post.id,
                    user: request.user.id
                })
                .then(comment => {
                    console.log('comment content :', comment);
                    console.log('post :', post);
                    console.log('user :', request.user);
                    console.log('\n');
                    post.comments.push(comment);
                    post.save();
                    return response.redirect('/');
                })
                .catch(error => {
                    console.log('Error in creating Comments ::', error);
                    // handle error
                    return response.redirect('/');
                });
            } else {
                console.log('post not found ::', post);
                return response.redirect('/');
            }
        })
        .catch(error => {
            console.log('Error in finding Post ::', error);
            // handle error
            return response.redirect('/');
        });
};

module.exports.destroy = function (request, response) { 
    Comment.findById(request.params.id)
        .then(comment => { 
            if (comment.user == request.user.id) { 
                let postId = comment.post;
                console.log('post id ::', postId);

                // comment.remove();
                comment.deleteOne(); // Replace comment.remove() with comment.deleteOne()

                Post.findByIdAndUpdate(postId, {$pull: {comments: request.params.id}})
                    .then(post => {
                        console.log('deleted comment ::', post);
                        return response.redirect('back');
                    })
                    .catch(error => {
                        console.log('unable to delete post comment ::', error);
                    });
            } else {
                console.log('comment user and request user is mismatch ::', comment);
                return response.redirect('back');
            }
        })
        .catch(error => { 
            console.log('Unable to find to delete ::', request.params.id);
            console.log('error ::', error);
        });
};
