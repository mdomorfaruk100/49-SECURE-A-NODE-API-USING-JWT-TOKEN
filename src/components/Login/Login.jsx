import { useState, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, Checkbox, InputLabel, TextField } from '@mui/material';
import './Login.css';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [count, setCount] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const from = location.state || { from: '/' };
    const navigate = useNavigate();

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            firebase.auth().signInWithPopup(provider)
                .then(res => {
                    const { displayName, email } = res.user;
                    const signedInUser = { name: displayName, email: email };
                    setLoggedInUser(signedInUser);
                    navigate(from.from);

                })
                .catch(error => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = data => {
        const {name, email, password} = data;
        if(newUser && name && email && password){
            firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
                const user = res.user;
                const newUser = {
                    name: name,
                    email: user.email,
                }
        
                setLoggedInUser(newUser);
                updateUserName(name);
                navigate(from.from);
            }).catch(error => {
                console.log(error.message);
            })
        }
        if(!newUser && email && password){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const user = res.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                }
                setLoggedInUser(newUser);
                navigate(from.from);
            }).catch(error => {
                console.log(error.message);
            })
        }
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(()=> {
            console.log('user name updated');
        }).catch(error => {
            console.log(error.message);
        })
    }

    return (
        <div style={{textAlign:'center'}}>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <br />
            <Checkbox name='newUser' id='newUser' onChange={()=>setNewUser(!newUser)}/><label htmlFor='newUser'>I am a new user.</label>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
               {
                newUser &&  <TextField  label="Enter Your Name" {...register('name')} color="primary" sx={{width:'500px', marginBottom:'10px'}}/>
               }
                <TextField  label="Enter Your Email" {...register('email', {required: 'Email Is Required.'})} color="primary" sx={{width:'500px', marginBottom:'10px'}}/>
                { errors.email && <Alert severity='error'>{errors.email.message}</Alert>}
                <TextField  label="Enter Your Password" {...register('password', {required: 'Password Is Required.'})} color="primary" sx={{width:'500px'}} />
                { errors.password && <Alert severity='error'>{errors.password.message}</Alert>}
                <input type="submit" value={newUser ? 'Register': 'Log In'} style={{width: '100px', border: 'none', outline: 'none', padding: '7px 10px', borderRadius: '7px'}} />
            </form>
        </div>
    );
};

export default Login;
