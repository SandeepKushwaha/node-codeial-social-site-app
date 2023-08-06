const Post = require('../models/post');

const User = require('../models/user');

// async and await based example
module.exports.home = async function (request, response) { 
    response.cookie('user_id', request.cookies.user_id);

    try { 
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
    
        let users = await User.find({});

        return response.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users,
        });
    } catch (error) { 
        console.log('Error in fetching posts:', error);
        return;
    }
};

// promise based example 
/*
module.exports.home = function (request, response) { 
    /// return response.end('<h1>Express is up for Codeial!</h1>');
    /// console.log('cookies for home controller::', request.cookies);
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
            User.find({})
                .then(users => { 
                    return response.render('home', {
                        title: 'Codeial | Home',
                        posts: posts,
                        all_users: users,
                    });
                })
                .catch(error => { 
                    console.log('Unable to find all users ::', error);
                });
        })
        .catch(error => {
            console.log('Error in fetching posts:', error);
            /// Handle the error, e.g., render an error page or redirect
        });
};
*/