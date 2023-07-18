const User = require('../models/user');

module.exports.user = function (request, response) {
    return response.render('user_profile', {
        title: 'User Profile',
    });
};

// adding some action

// render the sign up page
module.exports.signUp = function (request, response) {
    return response.render('user_sign_up', {
        title: 'Codeial | Sign Up',
    });
};

// render the sign in page
module.exports.signIn = function (request, response) {
    return response.render('user_sign_in', {
        title: 'Codeial | Sign In',
    });
};

// get the sign up data by post http action method
module.exports.create = function (request, response) {
    if (request.body.password !== request.body.confirm_password) {
        console.log('Password Mismatch');
        return response.redirect('back');
    }

    User.findOne({ email: request.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return User.create(request.body)
                    .then(newUser => {
                        console.log('User Created:', newUser);
                        return response.redirect('/users/sign-in');
                    })
                    .catch(error => {
                        console.log('Error in creating user while signing up:', error);
                        // return response.status(500).json({ error: 'Internal server error' });
                        return response.redirect('back');
                    });
            } else {
                console.log('Error while creating user bescause of user is already exist:', user);
                return response.redirect('back');
            }
        })
        .catch(error => {
            console.log('Error in finding user in signing up:', error);
            // return response.status(500).json({ error: 'Internal server error' });
            return response.redirect('back');
        });
};

// sign in and create a session for the user
module.exports.createSession = function (request, response) {
    // sets to authenticate
    // find the user
    // User.findOne({ email: request.body.email }, function (error, user) { 
    //     if (error) { console.log('Error in finding user in signing in'); return; }
    //     /-/ handle user found

    //     if (user) { 
    //         /-/ handle password which don't match
    //         if (user.password !== request.body.password) { 
    //             return response.redirect('back');
    //         }

    //         /-/ handle session creation 
    //         response.cookie('user_id', user.id);
    //         return response.redirect('/users/profile');

    //     } else { 
    //         /-/ handle user not found 
    //         console.log('User not found user::', user);
    //         return response.redirect('back');
    //     }
    // });

    // Find the user using promises
    User.findOne({ email: request.body.email })
        .exec()
        .then(user => {
            if (user) {
                if (user.password !== request.body.password) {
                    return response.redirect('back');
                }

                response.cookie('user_id', user.id);
                return response.redirect('/users/profile');
            } else {
                console.log('User not found:', user);
                return response.redirect('back');
            }
        })
        .catch(error => {
            console.log('Error in finding user in signing in:', error);
            // return response.status(500).json({ error: 'Internal server error' });
            return response.redirect('back');
        });
};