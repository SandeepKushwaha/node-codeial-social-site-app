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
