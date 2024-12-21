import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaPen } from "react-icons/fa6";

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Post from '../../components/post/post';
import NewPostModal from '../../components/modals/new-post-modal/new-post-modal';

import './posts.css';

const Posts = () => {
    const authUser = useSelector(state => state.user.user);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        if (authUser.status === 'teacher') {
            axios.get(`/api/posts/teacher-posts/${authUser._id}`)
                .then(res => res.data)
                .then(posts => {
                    setPosts(posts);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });
        } else {
            axios.get(`/api/posts/group-posts/${authUser.group}`)
                .then(res => res.data)
                .then(posts => {
                    setPosts(posts);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });
        }
    }, []);

    return (
        <div className="page-wrapper posts-page">
            <Header
                currPage={'posts'} />
            
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="posts-wrapper task-cards-wrapper">
                        {
                            posts.map(post => 
                                <Post 
                                    key={post._id}
                                    postData={post}
                                    deletePost={ postId => setPosts(posts.filter(post => post._id !== postId)) } />
                            )
                        }
                    </div>
                )
            }

            <Footer />

            {
                authUser.status === 'teacher' ? (
                    <button 
                        onClick={ () => setModalVisibility(true) }
                        className="new-post-btn new-task-btn">
                            <FaPen className="new-post-pen" /> Новий пост
                    </button>
                ) : null
            }

            {
                modalVisibility ? (
                    <NewPostModal
                        closeModal={ () => setModalVisibility(false) }
                        addNewPost={ newPost => setPosts([ ...posts, newPost ]) } />
                ) : null
            }
        </div>
    )
}

export default Posts;
