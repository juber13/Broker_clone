import React, { useState } from 'react'
import { FaMoneyCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import AuthBtn from '../components/AuthBtn';

const SignUp = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((store) => store.user);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            dispatch(signInStart);
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data)
            if (data.success === false) {
                dispatch(signInFailure(data.message))
                return;
            }
            dispatch(signInSuccess(data))
            navigate('/sign-in')
        } catch (err) {
            dispatch(signInFailure(err.message))
        }

    }

    return (
        <div className='p-3 max-w-lg m-auto'>
            <h1 className="text-center my-7 text-3xl font-semibold">Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input onChange={handleInput} id="name" type="text" placeholder='UserName' className='outline-none p-3 border rounded-lg' />
                <input onChange={handleInput} id="email" type="email" placeholder='Email' className='outline-none p-2 border rounded-lg' />
                <input onChange={handleInput} id="password" type="password" placeholder='password' className='outline-none p-2 border rounded-lg' />
                <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95' id='sing-up'>
                    {loading ? "Loading..." : "SIGN UP"}
                </button>
                <AuthBtn/>
            </form>

            <div className='flex gap-3 my-3'>
                <p>Have an account ?</p>
                <Link to="/sign-in">
                    <span className='text-blue-700 font-bold'>Sign In</span>
                </Link>
            </div>

            {loading && <p className='text-green-500 mt-5'>Sing Up Succesfully</p>}
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignUp