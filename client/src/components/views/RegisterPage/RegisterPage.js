import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) 
{
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword)
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.');

        let body = {
            name: name,
            email: email,
            password: password
        };

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login');
                }
                else {
                    alert('Failed to signup');
                }
            })
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler}/>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
};

export default withRouter(RegisterPage);
