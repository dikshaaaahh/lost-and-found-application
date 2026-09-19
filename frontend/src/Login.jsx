import { useState } from 'react';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:8080/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log('LOGIN RESPONSE:', data);

      if (response.ok) {

        // Store JWT token
        localStorage.setItem('token', data.token);

        // Store complete login information
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify(data)
        );

        console.log(
          'TOKEN SAVED:',
          localStorage.getItem('token')
        );

        console.log(
          'USER SAVED:',
          localStorage.getItem('loggedInUser')
        );

        setMessage('Login successful! 🎉');

        setTimeout(() => {
          window.location.href = '/';
        }, 500);

      } else {
        setMessage(data);
      }

    } catch (error) {
      console.error(error);
      setMessage('Could not connect to server.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>Welcome Back</h1>

        <p>Login to Lost & Found</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && <p>{message}</p>}

      </div>
    </div>
  );
}

export default Login;