const Post = require('../models/post');

module.exports.home = function (request, response) { 
    // return response.end('<h1>Express is up for Codeial!</h1>');
    // console.log('cookies for home controller::', request.cookies);
    response.cookie('user_id', request.cookies.user_id);

    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            }
        })
        .exec()
        .then(posts => {
            return response.render('home', {
                title: 'Codeial | Home',
                posts: posts,
            });
        })
        .catch(error => {
            console.log('Error in fetching posts:', error);
            // Handle the error, e.g., render an error page or redirect
        });
};