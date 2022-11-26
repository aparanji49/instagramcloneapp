import { Button } from '@mui/material'
import React, { useState } from 'react'
import { storage, db } from './firebase';
//import { getFirestore } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {collection, serverTimestamp, addDoc} from "firebase/firestore";
import './ImageUpload.css';
function ImageUpload({username}) {
    const [image, setImage] = useState(null);
  //  const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
     //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
       //storage.ref(`images/${image.name}`)
       //const storageRef = ref(storage, `images/${image.name}`);
      // const uploadTask = uploadBytesResumable(storageRef, image);
    //  const uploadTask = storageRef.put(image);
      //  uploadTask.on(
      //  storageRef.putFile(image).on(
        const imagesRef = ref(storage, `images/${image.name}`);

        const uploadTask = uploadBytesResumable(imagesRef, image);

       // uploadTask.on(

       //uploadTask: uploadBytes(imagesRef, image);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function 
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error.stack);
                alert(error.message);
            },
            () => {
                //complete function
              //  getDownloadURL(uploadTask.snapshot.ref)
              getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                    //post image inside db
                    addDoc(collection(db, "posts"),{
                        timestamp: serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }
  return (
    <div className="imageupload">
    <progress className="imageupload__progress" value={progress} max="100"/>
        <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption}/>
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload