const Post = require('../models/post');


module.exports.create = function (request, response) {
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