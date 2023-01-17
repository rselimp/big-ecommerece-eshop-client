import { signOut } from 'firebase/auth';
import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAuth from '../../custom-hooks/useAuth';
import { auth } from '../../firebase/firebase.config';
import userIcon from '../../images/free-user-icon-3296-thumb.png';



const Header = () => {
  const headerRef = useRef(null)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const {currentUser} = useAuth()
  const profileActionRef = useRef(null)


  const navigateToCart =() =>{
    navigate('/cart')

  }

  const logOut =() =>{
    signOut(auth).then( () =>{
      toast.success('Logged Out')

    }).catch(error=>{
      toast.error(error.message)

    })
      
  }




  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        
      </div>
      <div className="navbar-center">
        <Tabs>
          <TabList>
            <Tab><Link className='btn btn-ghost normal-case text-xl' to='/'>Home</Link></Tab>
            <Tab><Link className='btn btn-ghost normal-case text-xl' to='/shop'>Shop</Link></Tab>
            <Tab><Link className='btn btn-ghost normal-case text-xl' to='/cart'>Cart</Link></Tab>
           
           {
            currentUser ? <Tab><Link onClick={logOut} className='btn btn-ghost normal-case text-xl' to='/login'>LogOut</Link></Tab>
            :
            <Tab><Link className='btn btn-ghost normal-case text-xl' to='/login'>Login</Link></Tab>
           }
          

          </TabList>

          <TabPanel>
            <h2></h2>
          </TabPanel>
          <TabPanel>
            <h2></h2>
          </TabPanel>
        </Tabs>
      </div>
      <div className="navbar-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span onClick={navigateToCart} className="badge badge-sm indicator-item">{totalQuantity}</span>
          </div>
        </label>

        <button className="btn btn-ghost btn-circle">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={currentUser ? currentUser.photoURL :userIcon} alt="" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
             {
              currentUser ? <li><span onClick={logOut}><Link to='/login'>Logout</Link></span></li>
              : <>
              <li><span><Link to='/login'>Login</Link></span></li>
              <li><span><Link to='/signup'>SignUp</Link></span></li>
              <li><span><Link to='/dashboard'>Dashboard</Link></span></li>
              </>
             }
              
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;