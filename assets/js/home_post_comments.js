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
                    deleteComment($(' .delete-comment-button', newComment));
                },
                error: function (error) { 
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a comment in DOM.
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

    // Method to delete a comment from DOM
    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({ 
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) { 
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function (error) { 
                    console.log(error.responseText);
                },
            });
        });
    }

    createPostComment();
}