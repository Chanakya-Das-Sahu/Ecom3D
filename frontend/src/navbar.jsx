import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { context } from './App.jsx'
import Login from './login'
import Signup from './signup'
import menu from './menu.png'
import photo from './photo.jpg'
const Navbar = () => {
    const { showLoginPage ,setShowLoginPage, showSignupPage , setShowSignupPage, setShowLogout, showLogout ,details ,setDetails , showFilter , setShowFilter } = useContext(context)
    const navigate = useNavigate()
    useEffect(()=>{
        if(details.userId==undefined || details.userId==''){
            setShowLogout(false)
        }else{
            setShowLogout(true)
        }
        // console.log('details',details)
    },[])

    const handleLogout = () =>{
        setDetails({userId:'',productId:'',token:'',exp:''})
        setShowLogout(false)
        navigate('/')
    }
    return (
        <nav className='border border-solid border-black flex justify-end gap-[20px] items-center h-[50px] text-[20px] text-black text-bold bg-[white] px-[10px]'>
            <div className='mr-auto'><img src={photo} width='30px' className='rounded-[50%]'/></div>
            <div className='filter:hidden' onClick={()=>{setShowFilter(true)}}><img src={menu} width='30px'/></div>
            <Link to='/'><svg class="h-[30px] text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />  <polyline points="9 22 9 12 15 12 15 22" /></svg></Link>
            <Link to='/Cart'><svg class="h-[30px] text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
</svg>
</Link>
            {/* <div className=''><Link to='/Orders'>Orders</Link></div> */}
            {showLogout ?
                <>
                <div className=''><Link to='/account'>Account</Link></div> 
                 <button onClick={handleLogout}>Log Out</button>
                
                </>
                :
                <>
                    <button className='charu px-[13px] rounded-[50px]' onClick={() => { setShowLoginPage(true);setShowSignupPage(false)}}>Login</button>
                    <button className='charu px-[13px] rounded-[50px]' onClick={() => { setShowSignupPage(true);setShowLoginPage(false)}}>Signup</button>
                </>
            }
{showLoginPage && <Login/>}
{showSignupPage && <Signup/>}
        </nav>
    )
}

export default Navbar;