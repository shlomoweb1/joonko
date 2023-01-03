import React, {useState} from 'react';
import {$http} from '../../utils/http';
import Logo from "assets/logo.svg";
// import { useNavigate } from 'react-router-dom;
import { useHistory } from 'react-router-dom';

import './index.scss';

const formFields = [
    {type: 'email', name: 'email', placeholder: 'Enter work email'},
    {type: 'password', name: 'password', placeholder: 'Enter password'}
];

const Login = () => {
    const history = useHistory()
    const [values, setValues] = useState({[formFields[0].name]: 'sdv@joonko.co', [formFields[1].name]: '12345'});
    const [isError, setIsError] = useState(false);

    const onChangeInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const onSubmitForm = async (e) => {
        e && e.preventDefault && e.preventDefault();
        if(!values[formFields[0].name].match(/@joonko.co$/) || !values[formFields[1].name]){
            return setIsError(true);
        }
        if(isError) setIsError(false); // prevent page rendering, or use memo

        try {
            const response = await $http.post('/users/login', {email: values[formFields[0].name], password: values[formFields[1].name]})
            if(response.status !== 200) throw new Error('Invalid Status '+ response.status);
            history.push('/');
        } catch (error) {
            return setIsError(true);
        }
        console.log(e, values);
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={Logo} className="header__logo" alt="logo" />
                <div className="header-wrapper">
                    <span className="title">Joonko's Jobs Manager</span>
                    <span className="subtitle">Enter your details</span>
                </div>
                <form className="auth-form" onSubmit={onSubmitForm}>
                    {formFields.map(({type, name, placeholder}) => (
                        <input
                            key={`form__${name}`}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={values[name]}
                            onChange={onChangeInput}
                        />
                    ))}
                    <button type="submit">Log in</button>
                </form>
                {isError &&
                <span className="error-msg">An error occurred, please check your credentials and try again.</span>}
            </div>
        </div>
    )
}

export default Login;