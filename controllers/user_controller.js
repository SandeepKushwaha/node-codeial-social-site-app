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
    // TODO implement your code here...
};

// sign in and create a session for the user
module.exports.createSession = function (request, response) { 
    // TODO implement your code here...
};