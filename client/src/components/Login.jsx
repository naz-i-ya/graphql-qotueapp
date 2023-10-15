import { useMutation } from '@apollo/client';
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../gqlOperations/mutations';

function Login() {
  const[formData, setFormData] = useState({});
  const [ signinUser, {data, loading, error}] = useMutation(LOGIN_USER, {onCompleted(data){
    localStorage.setItem("token", data.user.token)
    navigate('/');
  }
});
  const navigate = useNavigate();

  if(loading) return <h1>Loading..!!</h1>

  // if(data){
  //   localStorage.setItem("token", data.user.token);
  //   navigate('/');
  // }

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    signinUser({
      variables: {
        signInUser: formData
      }
    })
  }
  return (
    <div className="container my-container">
      {
        error &&
        <div className='red card-panel'>{error.message}</div>
      }
      
    <h5>Login</h5>
    <form onSubmit={handleSubmit}>
      <input type='email'
      placeholder='email'
      required
      name="email"
      onChange={handleChange}
      />
      <input type='password'
      placeholder='Password'
      required
      name='password'
      onChange={handleChange}
      />
      <Link to='/signup'>
        <p>Dont have an account?</p>
      </Link>
      <button className='btn #673ab7 deep-purple' type='submit'>Login</button>
    </form>
  </div>
  );
}

export default Login;
