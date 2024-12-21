import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import './post.css';

const Post = ({ postData, deletePost }) => {
    const authUser = useSelector(state => state.user.user);

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(postData.content);
    const textAreaRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        
        axios.patch(`/api/posts/update-post/${postData._id}`, { content: editedContent })
            .then(res => res.data)
            .then(() => {
                toast.success('Пост успішно відредаговано!');
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    };

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    const handlePostDelete = () => {
        axios.delete(`/api/posts/delete-post/${postData._id}`)
            .then(res => res.data)
            .then(message => {
                deletePost(postData._id);
                toast.success(message.message);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    useEffect(() => {
        if (isEditing && textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(
                textAreaRef.current.value.length,
                textAreaRef.current.value.length
            );
        }
    }, [isEditing]);

    return (
        <div className="task-wrapper task-card">
            <div className="task-card-heading">
                <h1 className="task-card-title">
                    {postData.title}
                </h1>
                <p className="task-card-subtitle">
                    {postData.subtitle}
                </p>
            </div>

            <div className="task-card-info">
                <div className="task-descr">
                    <div className="task-card-decor"></div>
                    {isEditing ? (
                        <textarea
                            className="task-descr-text"
                            ref={textAreaRef}
                            value={editedContent}
                            onChange={handleContentChange}
                            style={{ overflow: 'hidden' }}
                        />
                    ) : (
                        <p className="task-descr-text">
                            {editedContent}
                        </p>
                    )}
                </div>
                {authUser.status === 'teacher' && (
                    <div className="task-card-btns">
                        {isEditing ? (
                            <button onClick={handleSaveClick}>Зберегти</button>
                        ) : (
                            <button onClick={handleEditClick}>Редагувати</button>
                        )}
                        <button
                            onClick={handlePostDelete}>
                                Видалити
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
