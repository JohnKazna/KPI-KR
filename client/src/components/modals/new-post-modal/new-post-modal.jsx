import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";

import '../modal.css';
import './new-post-modal.css';

const NewPostModal = ({ closeModal, addNewPost }) => {
    const authUser = useSelector(state => state.user.user);

    const [postData, setPostData] = useState({
        subtitle: '',
        content: '',
        group: ''
    });

    const handleNewPost = (e) => {
        e.preventDefault();

        axios.post('/api/posts/new-post', { teacherId: authUser._id, postData })
            .then(res => res.data)
            .then(newPost => {
                addNewPost(newPost);
                closeModal();
                toast.success(`Новий пост для групи ${postData.group} успішно опубліковано!`);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="modal-wrapper new-post-modal-wrapper">
            <div className="modal">
                <div className="modal-heading">
                    <h1>Новий пост</h1>
                    <IoClose 
                        onClick={ () => closeModal() }
                        className="close-modal" />
                </div>

                <form 
                    onSubmit={(e) => handleNewPost(e)}
                    className="modal-form">
                    <div className="modal-form-field">
                        <label htmlFor="title">Назва</label>
                        <input 
                            onChange={(e) => {
                                setPostData({ ...postData, subtitle: e.target.value });
                            }}
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Лекція №1"
                            required />
                    </div>

                    <div className="modal-form-field">
                        <label htmlFor="title">Опис</label>
                        <textarea
                            onChange={(e) => {
                                setPostData({ ...postData, content: e.target.value })
                            }}
                            placeholder="Детальний опис публікації..."
                            required />
                    </div>

                    <div className="modal-form-field">
                        <label htmlFor="title">Опублікувати для групи:</label>
                        <input 
                            onChange={(e) => {
                                setPostData({ ...postData, group: e.target.value });
                            }}
                            id="title"
                            name="title"
                            type="text"
                            placeholder="ІП-24"
                            required />
                    </div>

                    <button>
                        Опублікувати
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewPostModal;
