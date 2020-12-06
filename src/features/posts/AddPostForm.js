import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from './postSlice';

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId))

            setTitle('');
            setContent('');
        }
    }

    const handleChangeTitle = (evt) => {
        setTitle(evt.target.value);
    }

    const handleChangeContent = (evt) => {
        setContent(evt.target.value);
    }

    const handleChengeAuthor = (evt) => {
        setUserId(evt.target.value);
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={handleChengeAuthor}
                >
                    {usersOptions}
                </select>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={handleChangeTitle}
                />
                <label htmlFor="postContent">Content:</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={handleChangeContent}
                />
                <button 
                    type="button" 
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}