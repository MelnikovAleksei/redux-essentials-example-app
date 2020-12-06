import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './postSlice';

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )
        }
        setTitle('');
        setContent('');
    }

    const handleChangeTitle = (evt) => {
        setTitle(evt.target.value);
    }

    const handleChangeContent = (evt) => {
        setContent(evt.target.value);
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
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
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}