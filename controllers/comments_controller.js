const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.create = function (request, response) { 
    // Check if the content is present and not empty
    if (!request.body.content || request.body.content.trim() === '') {
        console.log('Comment content is required');
        response.flash('error', 'Comment content is required');
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
                    request.flash('success', 'Comment Posted.');

                    if (request.xhr) {
                        return response.status(200).json({
                            data: {
                                comment: comment
                            },
                            message: "Post created Successfully.",
                        });
                    } 
                    
                    return response.redirect('/');
                })
                .catch(error => {
                    console.log('Error in creating Comments ::', error);
                    // handle error
                    request.flash('error', 'Error on creating Comment.');
                    return response.redirect('/');
                });
            } else {
                console.log('post not found ::', post);
                request.flash('error', 'Post not found.');
                return response.redirect('/');
            }
        })
        .catch(error => {
            console.log('Error in finding Post ::', error);
            // handle error
            request.flash('error', 'Error on Finding Post.');
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
                        request.flash('success', 'Comment Deleted Successfully.');

                        if (request.xhr) {
                            console.log('request data::', comment);
                            return response.status(200).json({
                                data: {
                                    comment_id: request.params.id,
                                },
                                message: "Comment Deleted successfully.",
                            });
                        }

                        return response.redirect('back');
                    })
                    .catch(error => {
                        console.log('unable to delete post comment ::', error);
                    });
            } else {
                console.log('comment user and request user is mismatch ::', comment);
                request.flash('error', 'Comment user and request user is Mismatch.');
                return response.redirect('back');
            }
        })
        .catch(error => { 
            console.log('Unable to find to delete ::', request.params.id);
            console.log('error ::', error);
            request.flash('error', 'Unable to find to Delete.');
        });
};
