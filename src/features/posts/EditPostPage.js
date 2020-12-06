import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated } from './postSlice';

export const EditPostPage = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHpostistory();

    const handleChangeTitle = (evt) => {
        setTitle(evt.target.value);
    }
    
    const handleChangeContent = (evt) => {
        setContent(evt.target.value);
    }

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }));
            history.push(`/posts/${postId}`);
        }
    }
    
    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title</label>
                <input 
                    type="text"
                    name="postTitle"
                    id="postTitle"
                    value={title}
                    onChange={handleChangeTitle}
                />
                <label htmlFor="postContent">Post Content</label>
                <input 
                    type="text"
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={handleChangeContent}
                />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}