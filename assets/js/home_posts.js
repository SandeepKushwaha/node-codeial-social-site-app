{
    // method to submit the form data for new post using AJAX.
    let createPost = function () {
        let postForm = $('#new-post-form');
        postForm.submit(function (e) { 
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postForm.serialize(),
                success: function (data) { 
                    console.log(data);
                },
                error: function (error) { 
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM.

    createPost();
}