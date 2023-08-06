{
    console.log('Post Comment Script');
    let createPostComment = function () {
        let commentForm = $('#new-comment-form');
        commentForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: commentForm.serialize(),
                success: function (data) { 
                    console.log(data);
                    let newComment = newCommentDOM(data.data.comment);
                    $('#post-comments-list>ul').prepend(newComment);
                },
                error: function (error) { 
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM.
    let newCommentDOM = function (comment) {
        return $(`
            <li>
                <p>
                    ${ comment.content } 
                    <small>${comment.user.name }</small>
                    <small><a href="/comments/delete/${comment._id}">delete-comment</a></small>
                </p>
            </li>
        `);
    }

    createPostComment();
}