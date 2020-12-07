import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { unwrapResult } from '@reduxjs/toolkit'

import { addNewPost } from './postSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const handleChangeTitle = (evt) => {
        setTitle(evt.target.value);
    }

    const handleChangeContent = (evt) => {
        setContent(evt.target.value);
    }

    const handleChangeAuthor = (evt) => {
        setUserId(evt.target.value);
    }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
        if (canSave) {
        try {
            setAddRequestStatus('pending')
            const resultAction = await dispatch(
            addNewPost({ title, content, user: userId })
            )
            unwrapResult(resultAction)
            setTitle('')
            setContent('')
            setUserId('')
        } catch (err) {
            console.error('Failed to save the post: ', err)
        } finally {
            setAddRequestStatus('idle')
        }
        }
    }
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
                    onChange={handleChangeAuthor}
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