
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

const AuthBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const connectWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <button onClick={connectWithGoogle} type="button" className='bg-red-700 text-white rounded-lg p-3 hover:opacity-95' id='google-connect'>CONTINUE WITH GOOGLE</button>
    )
}

export default AuthBtn