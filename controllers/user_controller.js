module.exports.user = function (request, response) {
    return response.render('user_profile', {
        title: 'User Profile',
    });
};