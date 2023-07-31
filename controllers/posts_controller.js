const Post = require('../models/post');

const Comment = require('../models/comment');

// async-await based example
module.exports.create = async function (request, response) {
    if (!request.user || !request.user.id) {
        console.log('User not authenticated.');
        // Handle the error, e.g., render an error page or redirect to login
        request.flash('error', 'User not authenticated.');
        return response.status(401).json({ status: 'error', message: 'User not authenticated.' });
    }

    try { 
        await Post.create({
            content: request.body.content,
            user: request.user.id
        });
        
        request.flash('success', 'Your Post Posted Successfully.');
        return response.redirect('back');
    } catch (error) { 
        console.log('Error in creating post::', error);
        request.flash('error', 'Error on creating post.');
        return;
    }
};

module.exports.destroy = async function (request, response) {
    try { 
        let post = await Post.findById(request.params.id);

        if (post.user == request.user.id) {
            post.deleteOne(); // Replace post.remove() with post.deleteOne()

            await Comment.deleteMany({ post: request.params.id });
            request.flash('success', 'Comment deleted Successfully.');
            return response.redirect('back');
        } else {
            console.log('Unable to delete the post ::', post);
            response.flash('error', 'Unable to delete the Post.');
            return response.redirect('back');
        }
    } catch (error) { 
        console.log('Error in destring post::', error);
        response.flash('error', 'Error on Deleting Post.');
        return;
    }
};

// promise with then-catch based example 
/*module.exports.create = function (request, response) {
    if (!request.user || !request.user.id) {
        console.log('User not authenticated.');
        // Handle the error, e.g., render an error page or redirect to login
        return response.status(401).json({ status: 'error', message: 'User not authenticated.' });
    }

    // Post.create({ 
    //     content: request.body.content,
    //     user: request.user.id
    // }, function (error, post) { 
    //     if (error) { console.log('Error in creating post::', error); return; }
    //     return response.redirect('back');
    // });
    Post.create({ 
        content: request.body.content,
        user: request.user.id
    })
    .then(post => {
        console.log('Post created::', post);
        return response.redirect('back');
    })
    .catch(error => {
        console.log('Error in creating post::', error);
        // Handle the error, e.g., render an error page or redirect
        return;
    });
};

module.exports.destroy = function (request, response) {
    Post.findById(request.params.id)
        .then(post => {
            // id means converting the object id into string
            if (post.user == request.user.id) {
                post.deleteOne(); // Replace post.remove() with post.deleteOne()

                Comment.deleteMany({ post: request.params.id })
                    .then(comments => {
                        console.log('deleting on comments ::', comments);
                        return response.redirect('back'); // Change request.redirect to response.redirect
                    })
                    .catch(error => {
                        console.log('deleting error on comments ::', error);
                        return;
                    });
            } else {
                console.log('Unable to delete the post ::', post);
                return response.redirect('back');
            }
        })
        .catch(error => {
            console.log('Error on deleting post ::', error);
        });
};
*/
