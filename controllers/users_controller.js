const User = require('../models/user');

module.exports.profile = function (request, response) {
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
                        return response.status(500).json({ error: 'Internal server error' });
                    });
            } else {
                console.log('Error while creating user bescause of user is already exist:', user);
                return response.redirect('back');
            }
        })
        .catch(error => {
            console.log('Error in finding user in signing up:', error);
            return response.status(500).json({ error: 'Internal server error' });
        });
};

// sign in and create a session for the user
module.exports.createSession = function (request, response) {
    return response.redirect('/');
};

module.exports.destroySession = function (request, response) {
    request.logout(function (err) {
        if (err) {
            console.log('Error in logging out:', err);
            return response.status(500).json({ error: 'Internal server error' });
        }
        
        return response.redirect('/');
    });
}