import React from 'react'
import { useState, useEffect } from 'react';
import { db } from './firebase';
import {addDoc, collection, onSnapshot, orderBy, serverTimestamp} from "firebase/firestore";
import './Post.css';

import { Avatar } from '@mui/material';

function Post({postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if(postId) {
      const collectionRef = collection(db, "posts", postId, "comments");
      unsubscribe = onSnapshot(collectionRef, orderBy('timestamp', 'desc'),(snap) => {
        setComments(snap.docs.map((doc) => doc.data()));
        });
      }
    return () => {
      unsubscribe();
    };
  },[postId]);

  const postComment = (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "posts", postId, "comments");
    addDoc(collectionRef,{
      text: comment,
      username: user.displayName,
      timestamp: serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className="post">
        <div className="post__header">
            <Avatar 
                className="post__avatar"
                alt={username}
                src="/static/images/avatar/1.jpg" 
            />
            <h3>{username}</h3>
        </div>
        

        <img 
            className="post__image"
            src={imageUrl}
            alt=""

        />

        <h4 className="post__text"><strong>{username}</strong> {caption} </h4>
        {user && (
        <form className="post__commentBox">
          <input 
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >

            Post
          </button>
        </form>
        )}
          <div className="posts__comments">
            {comments.map((comment) => (
              <p>
              <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
    </div>
  )
}

export default Post