import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormComponent from './../component/Form';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data: any) => {
    console.log('Registration Data:', data);
    localStorage.setItem("user", JSON.stringify(data));
    login(); 
    navigate('/dashboard');
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'profileImage', label: 'Profile Image', type: 'file' }, 
  ];

  return  <>
  <div className="container">
    <div className="loginForm">
    <h1 id='login'>register:</h1>
      <FormComponent onSubmit={onSubmit} fields={fields} />
      <p>already Registered ? <Link to={'/login'}>login</Link></p>
    </div>
  </div>
  </>
};

export default Register;