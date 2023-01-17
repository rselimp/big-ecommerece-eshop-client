import { async } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {auth} from '../../firebase/firebase.config' 

const Login = () => {
  const[email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || '/';


    const handleLogin = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
          const userCrendential = await signInWithEmailAndPassword(auth,email,password)
          const user = userCrendential;
          console.log(user)
          setLoading(false)
          navigate(from,{replace:true})

        }
        catch(error){
          setLoading(false)
          toast.error(error.message)

        }
    }

    if(loading){
      return <p>Loading.....</p>
    }
    return (
        <div className="hero w-full">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
           
            <p className="py-4">Login Information means the logins, usernames and passwords of each Authorized User.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" value={email} onChange={(e) =>setEmail(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='email' placeholder="password" className="input input-bordered" value={password} onChange={(e) =>setPassword(e.target.value)} />
               
                <label className="label">
                  <p>Don't have an account ? Please <Link to='/signup'><span className='text-orange-400'>SignUp</span></Link></p>
                </label>
              </div>
              <div className="form-control mt-4">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;