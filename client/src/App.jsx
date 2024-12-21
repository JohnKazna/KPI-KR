import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/features/user/userSlice";

import Home from './pages/home/home';
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Profile from "./pages/profile/profile";
import TasksList from "./pages/tasks-list/tasks-list";
import Posts from "./pages/posts/posts";
import Tasks from "./pages/tasks/tasks";
import Tests from "./pages/tests/tests";

import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  const authUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ authUser ? <Navigate to={'/'}/> : <Login /> } />
          <Route path="/sign-up" element={ authUser ? <Navigate to={'/'}/> : <SignUp /> } />
          <Route path="/profile" element={ authUser ? <Profile /> : <Navigate to={'/'}/> } />
          <Route path="/tasks-list" element={ authUser ? <TasksList /> : <Navigate to={'/'}/> } />
          <Route path="/posts" element={ authUser ? <Posts /> : <Navigate to={'/'}/> } />
          <Route path="/tasks" element={ authUser ? <Tasks /> : <Navigate to={'/'}/> } />
          <Route path="/tests" element={ authUser ? <Tests /> : <Navigate to={'/'}/> } />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-left" />
    </div>
  )
}

export default App;
