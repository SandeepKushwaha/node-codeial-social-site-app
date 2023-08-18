const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.createSession = async function (request, response) {
    try { 
        let user = await User.findOne({
            email: request.body.email,
        });

        if (!user || user.password != request.body.password) {
            return response.status(422).json({
                message: "Invalid email or password!",
            });
        }

        return response.status(200).json({
            message: "Sign in Successfully! Here is your JWT Token, Please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'Codeial', { 
                    expiresIn: '10000',
                }),
            },
        });

    } catch (error) { 
        console.error('User Error on API call :', error);
        return response.status(500).json({
            message: "Internal Server Error.",
        });
    }
};