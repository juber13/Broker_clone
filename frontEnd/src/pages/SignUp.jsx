import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className='p-3 max-w-lg m-auto'>
            <h1 className="text-center my-7 text-3xl font-semibold">Sign Up</h1>
            <form action="" className='flex flex-col gap-4'>
                <input id="username" type="text" placeholder='UserName' className='outline-none p-3 border rounded-lg' />
                <input id="email" type="email" placeholder='Email' className='outline-none p-2 border rounded-lg' />
                <input id="passoword" type="password" placeholder='password' className='outline-none p-2 border rounded-lg' />
                <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95' id='sing-up'>SIGN UP</button>
                <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95' id='google-connect'>SIGN WITH GOOGLE</button>
            </form>

            <div className='flex gap-3 my-3'>
                <p>Have an account ?</p>
                <Link to="/sign-in">
                    <span className='text-blue-700 font-bold'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp