const path = require('path');

const fs = require('fs');

const User = require('../models/user');

module.exports.profile = function (request, response) {
    User.findById(request.params.id)
        .then(user => { 
            return response.render('user_profile', {
                title: 'User Profile',
                profile_user: user,
            });
        })
        .catch(error => { 
            console.log('User not found ::', error);
            return response.redirect('back');
        });
};

module.exports.update = async function (request, response) {
    if (request.user.id == request.params.id) {
        try {
            let user = await User.findById(request.params.id);
            User.uploadedAvatar(request, response, function (error) { 
                if (error) {
                    console.log('====== Multer Error ====== :', error);
                }

                // console.log('request file: ', request.file);
                user.name = request.body.name;
                user.email = request.body.email;

                if (request.file) {
                    // check the if user having already having the avatar
                    if (user.avatar) {
                        // deleting the previous file on new upload

                        // if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                        //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        // }
                        // user.avatar = path.join(__dirname, '../assets/images', 'avatar.png');

                        try {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        } catch (error) {
                            console.log('User Avatar Error:', error);
                        }
                    }

                    // this is saving the path of the uploaded file into the avatar field in the user.
                    user.avatar = User.avatarPath + path.sep + request.file.filename;
                }

                user.save();
                return response.redirect('back');
            });
        } catch (error) {
            request.flash('error', error);
            return response.redirect('back');
        }
    } else {
        request.flash('error', 'Unauthorized!');
        return response.status(401).send('Unauthorized');
    }
}

// module.exports.update = function (request, response) {
//     if (request.user.id == request.params.id) {
//         /=/ User.findByIdAndUpdate(request.params.id, { name: request.body.name, email: request.body.email })
//         User.findByIdAndUpdate(request.params.id, request.body) // because of request.body is exectly same as name and email
//             .then(user => { 
//                 console.log('Updated user ::', user);
//                 return response.redirect('back');
//             })
//             .catch(error => { 
//                 console.log('Error on update User ::', error);
//             });
//     } else {
//         return response.status(401).send('Unauthorized');
//     }
// }

// adding some action

// render the sign up page
module.exports.signUp = function (request, response) {
    if (request.user) {
        return response.redirect(`/users/profile/${request.user.id}`);
    }
    return response.render('user_sign_up', {
        title: 'Codeial | Sign Up',
    });
};

// render the sign in page
module.exports.signIn = function (request, response) {
    if (request.user) {
        return response.redirect(`/users/profile/${request.user.id}`);
    }
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
    request.flash('success', 'Logged in Successfully.');
    return response.redirect('/');
};

module.exports.destroySession = function (request, response) {
    request.logout(function (err) {
        if (err) {
            console.log('Error in logging out:', err);
            return response.status(500).json({ error: 'Internal server error' });
        }

        request.flash('success', 'Logged Out Successfully.');        
        return response.redirect('/');
    });
}