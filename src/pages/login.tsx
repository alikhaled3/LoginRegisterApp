import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormComponent from './../component/Form';
import { Alert } from 'antd';

const Login: React.FC = () => {
  const [usesrAlert, setusesrAlert] = useState('')
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const onSubmit = (data: any) => {
    console.log('Login Data:', data);
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      const user = JSON.parse(storedUser)
      if (user.email === data.email && user.password === data.password){
        login(); // Set user as authenticated
        navigate('/dashboard');
      }else{ 
        setusesrAlert('invalid credentials')
      }
    }
    return data
  };

  
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },

  ];

  return <>
  <div className="container">
    <div className="loginForm">

    <h1 id='login'>Login:</h1>
      <FormComponent onSubmit={onSubmit} fields={fields} />
      {usesrAlert=== 'invalid credentials'?  
      <Alert message="invalid credentials" type="error" />
           :''
      }
      <p>don't have account ? <Link to={'/register'}>register</Link></p>
    </div>
  </div>
  </>
};

export default Login;