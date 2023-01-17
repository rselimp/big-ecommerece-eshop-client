import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from '../../firebase/firebase.config'
import {ref,uploadBytesResumable,getDownloadURL} from  'firebase/storage'
import {storage} from '../../firebase/firebase.config'
import {setDoc,doc} from 'firebase/firestore'
import {db} from '../../firebase/firebase.config'
import { toast } from 'react-hot-toast';
import { async } from '@firebase/util';




const SignUp = () => {
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[file, setFile] = useState(null)
    const[loading, setLoading] =useState(false)
    const navigate = useNavigate()

    const signup = async(e) =>{
        e.preventDefault()
        setLoading(true)    

        try{
            const userCrendential = await createUserWithEmailAndPassword( auth,email,password)
            const user = userCrendential.user;
            const storageRef =ref(storage, `images/${Date.now() + username}`)
            const uploadTask = uploadBytesResumable(storageRef,file)
            uploadTask.on((error) =>{
                toast.error(error.message)
            },() =>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) =>{
                 
                 //update userprofile
                    await  updateProfile(user,{
                        displayName: username,
                        photoURL:downloadURL,
                    });
                    await setDoc(doc(db, 'users', user.uid),{
                        uid:user.uid,
                        displayName: username,
                        email,
                        photoURL:downloadURL,   
                    })
                });
            });
            //store user data in  firestore data in firebase
            console.log(user)
            setLoading(false)
            toast.success('Account created')
            navigate('/login')
        }
        catch(error){
            setLoading(false)
            toast.error('something went wrong')

        }
    }

    return (
        <div className="hero w-full">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
           
            <p className="py-4">A signup page enables users and organizations to independently register and gain access to your system.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">SignUp now!</h1>
            <form onSubmit={signup} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" className="input input-bordered" value={username} onChange={(e)=>setUsername(e.target.value)}  />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" value={email} onChange={e=>setEmail(e.target.value)}/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
              <div className="form-control">
                
                <input type="file" className="input input-bordered" onChange={e=>setFile(e.target.files[0])} />
                </div>
                <label className="label">
                  <p>Already have an account ? Please <Link to='/login'><span className='text-orange-400'>Login</span></Link></p>
                </label>
             
              <div className="form-control mt-4">
                 <button type='submit' className="btn btn-primary">Login</button> 
              </div>
              {
                loading ? <h4 className='text-xl'>Loading....</h4>
                : <></>
              }
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignUp;