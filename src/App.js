/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { Input, Modal, Button, Box, Typography } from '@mui/material';
import ImageUpload from './ImageUpload';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from "firebase/auth";
//import InstagramEmbed from 'react-instagram-embed';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
 // const handleOpen = () => setOpen(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  //const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else{
        //user has logged out
        setUser(null);
      }
    })
    return unsubscribe;
  } 
  ,[user, username]
  );

  useEffect(() => {
    const collectionRef = collection(db, 'posts');

    onSnapshot(collectionRef,orderBy('timestamp', 'asc'), (snap) => {
      setPosts(snap.docs.map(doc =>({
        id: doc.id,
        post: doc.data()}
        )));
    })


  
  }, []);

  const signUp =  (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
        displayName: username
      }).catch((error) => alert(error.message));
    // ...
  }).catch((error) => alert(error.message));
  }

  const signIn =  (event) => {
    event.preventDefault();

     signInWithEmailAndPassword(auth, email,password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }
  return (
    <div className="app">
    
    <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           <form className="app__signup">
           
          <center> <img 
          className="app__headerImage" 
          src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg"
          alt=""
          height="29"
          width="103"
          /></center> 

          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />

          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}            
            />

            <Button type="submit" onClick={signUp}>Sign Up</Button>
            
           </form>
           
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           <form className="app__signup">
           
          <center> <img 
          className="app__headerImage" 
          src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg"
          alt=""
          height="29"
          width="103"
          /></center> 

          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}            
            />

            <Button type="submit" onClick={signIn}>Sign In</Button>
            
           </form>
           
          </Typography>
        </Box>
      </Modal>
     <div className="app__header">
      <img 
          className="app__headerImage" 
          src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg"
          alt=""
          height="29"
          width="103"
          />
      {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
      )}
     </div>
    <div className="app__posts">
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          }
    </div>
    {/*<InstagramEmbed
      url='https://www.instagram.com/p/ClTjIPXpIgK/?utm_source=ig_web_copy_link'
      clientAccessToken='123|456'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    /> */}
      


   {/*   <Post username="aparanji9" caption="live life to it's fullest!" imageUrl="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"/>
     <Post username="artbyaparanji" caption="idhoka art project" imageUrl="https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?cs=srgb&dl=pexels-roshan-kamath-1661179.jpg&fm=jpg"/>
   <Post username="memes_chustav_entra" caption="react project chesthav entra" imageUrl="https://images.pexels.com/photos/2629372/pexels-photo-2629372.jpeg?cs=srgb&dl=pexels-frank-cone-2629372.jpg&fm=jpg"/>*/}  
    
   {user?.displayName ? (
      <ImageUpload username={user.displayName}/>
    ):(
      <h3>Sorry! You need to login to upload...</h3>
    )}
    

    </div>
  );
}

export default App;
