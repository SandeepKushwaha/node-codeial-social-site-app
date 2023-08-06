{
    // method to submit the form data for new post using AJAX.
    let createPost = function () {
        let postForm = $('#new-post-form');
        let postTextArea = $('#content');
        postForm.submit(function (e) { 
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postForm.serialize(),
                success: function (data) { 
                    console.log(data);
                    // console.log(data.data);
                    // console.log(data.data.post);
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    postTextArea.value = '';
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function (error) { 
                    console.log(error.responseText);
                    postTextArea.value = '';
                }
            });
        });
    }

    // method to create a post in DOM.
    let newPostDOM = function (post) {
        return $(`
            <li id="post-${post._id}">
                <p>
                    ${post.content} 
                    <abbr title="${post.user.email}"><span>${post.user.name === 'undefined' ? post.user : post.user.name}</span></abbr>
                    <small><a id="delete-post-btn" href="/posts/delete/${post._id}">delete-post</a></small>
                </p>
                <div class="post-comments">
                    <form class="post-comments-input" action="/comments/create" method="post">
                        <input type="text" name="content" id="comment" required placeholder="Type Your Comment here..." />
                        <input type="hidden" name="post" value="${post._id}" />
                        <input type="submit" value="Comment" />
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
                </div>
            </li>
        `);
    }

    // Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) { 
            e.preventDefault();

            $.ajax({ 
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) { 
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) { 
                    console.log(error.responseText);
                },
            });
        });
    }

    createPost();
}