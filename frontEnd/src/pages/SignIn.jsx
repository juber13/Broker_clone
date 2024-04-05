import React, { useState } from 'react'
import { FaMoneyCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import AuthBtn from '../components/AuthBtn';

import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const { loading, error } = useSelector((store) => store.user);

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
            const res = await fetch('/api/auth/login', {
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
            navigate('/')
        } catch (err) {
            dispatch(signInFailure(err.message))
        }

    }

    return (
        <div className='p-3 max-w-lg m-auto'>
            <h1 className="text-center my-7 text-3xl font-semibold">Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input onChange={handleInput} id="email" type="email" placeholder='Email' className='outline-none p-2 border rounded-lg' />

                <input onChange={handleInput} id="password" type="password" placeholder='password' className='outline-none p-2 border rounded-lg' />

                <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95' id='sing-in'>
                    {loading ? "Loading..." : "Sign In"}
                </button>

                <AuthBtn />
            </form>

            <div className='flex gap-3 my-3'>
                <p>Have an account ?</p>
                <Link to="/sign-up">
                    <span className='text-blue-700 font-bold'>Sign Up</span>
                </Link>
            </div>

            {loading && <p className='text-green-500 mt-5'>Sing Up Succesfully</p>}
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignIn