module.exports.home = function (request, response) { 
    // return response.end('<h1>Express is up for Codeial!</h1>');
    console.log('cookies for home controller::', request.cookies);
    response.cookie('user_id', request.cookies.user_id);

    return response.render('home', {
        title: 'Codeial | Home',
    });
};