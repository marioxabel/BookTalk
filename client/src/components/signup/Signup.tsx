import './signup.css';
import React, { useState } from 'react';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


const SignUp = () => {

    const [ signup, setSignup ] = useState<any>({username:'',email:'',password:''});

    const handleInput = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setSignup({ ...signup, [id]: value})
    });

    const handleSubmit = async () => {
        const { data } = await CREATE_USER ({
                variables: { ... signup }
        });

        Auth.login(data.CREATE_USER.token);
    }
    

    return (
        <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" onChange={handleInput} />
            <label htmlFor="email">Email</label>
            <input id="email" type="text" onChange={handleInput} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={handleInput} />
            <button onClick={handleSubmit} >ENTER THE NEW WORLD!</button>
        </div>
    )
}

export default SignUp